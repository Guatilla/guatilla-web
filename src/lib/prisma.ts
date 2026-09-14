import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Connector, IpAddressTypes, GoogleAuth } from '@google-cloud/cloud-sql-connector'
import { Pool } from 'pg'

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

  if (!instanceConnectionName || !encodedKey) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    return new PrismaClient({ adapter })
  }

  const credentials = JSON.parse(Buffer.from(encodedKey, 'base64').toString('utf-8'))
  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  })
  const connector = new Connector({ auth })
  const clientOpts = await connector.getOptions({
    instanceConnectionName,
    ipType: IpAddressTypes.PUBLIC,
  })

  const pool = new Pool({
    ...clientOpts,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 5,
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
    globalThis.prismaGlobal = createPrismaClient()
  }
  return globalThis.prismaGlobal
}
