import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Connector, IpAddressTypes, GoogleAuth } from '@google-cloud/cloud-sql-connector'
import { Pool } from 'pg'

const REDACTED_ENV_VALUE = '[SENSITIVE]'

function configured(value: string | undefined): value is string {
  return Boolean(value && value !== REDACTED_ENV_VALUE)
}

/**
 * Cloud SQL Auth Proxy connection: the app authenticates to Cloud SQL with the
 * GCS_SERVICE_ACCOUNT_KEY service account (granted roles/cloudsql.client) and gets a
 * short-lived, mutually-authenticated TLS tunnel per connection — no static DB password
 * sitting in a connection string is enough on its own to reach the database this way.
 * DATABASE_URL is kept only for the Prisma CLI (migrate/db pull), which can't use this.
 */
async function createPrismaClient(): Promise<PrismaClient> {
  const instanceConnectionName = process.env.GCP_SQL_INSTANCE_CONNECTION_NAME
  const encodedKey = process.env.GCS_SERVICE_ACCOUNT_KEY

  if (!configured(instanceConnectionName)) {
    if (!configured(process.env.DATABASE_URL)) {
      throw new Error('Cloud SQL connection is not configured.')
    }
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    return new PrismaClient({ adapter })
  }

  const scopes = ['https://www.googleapis.com/auth/cloud-platform']
  const auth = configured(encodedKey)
    ? new GoogleAuth({
        credentials: JSON.parse(Buffer.from(encodedKey, 'base64').toString('utf-8')),
        scopes,
      })
    : new GoogleAuth({ scopes })

  if (!configured(encodedKey)) {
    const authClient = await auth.getClient()
    authClient.quotaProjectId = instanceConnectionName.split(':', 1)[0]
  }

  const databaseUser = process.env.DATABASE_USER
  const databasePassword = process.env.DATABASE_PASSWORD
  const databaseName = process.env.DATABASE_NAME
  const databasePoolMax = Number.parseInt(process.env.DATABASE_POOL_MAX ?? '5', 10)
  if (
    !configured(databaseUser) ||
    !configured(databasePassword) ||
    !configured(databaseName) ||
    !Number.isInteger(databasePoolMax) ||
    databasePoolMax < 1 ||
    databasePoolMax > 20
  ) {
    throw new Error('Cloud SQL database credentials are not configured.')
  }

  const connector = new Connector({ auth })
  const clientOpts = await connector.getOptions({
    instanceConnectionName,
    ipType: IpAddressTypes.PUBLIC,
  })

  const pool = new Pool({
    ...clientOpts,
    user: databaseUser,
    password: databasePassword,
    database: databaseName,
    max: databasePoolMax,
  })

  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal?: Promise<PrismaClient>
} & typeof global

/** Lazily creates (once) and returns the shared PrismaClient. Always await — the first call sets up the Cloud SQL Connector tunnel. */
export function getPrisma(): Promise<PrismaClient> {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = createPrismaClient().catch((error) => {
      // Do not permanently cache a transient connector/authentication failure.
      // A later request must be able to establish a fresh Cloud SQL tunnel.
      globalThis.prismaGlobal = undefined
      throw error
    })
  }
  return globalThis.prismaGlobal
}
