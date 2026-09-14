import { Storage } from "@google-cloud/storage";

let cachedStorage: Storage | null | undefined;

function getCredentials(): { client_email: string; private_key: string } | null {
  const encoded = process.env.GCS_SERVICE_ACCOUNT_KEY;
  if (!encoded) return null;
  try {
    return JSON.parse(Buffer.from(encoded, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

/** Retornerer GCS-bucketen for /sporbarhet-bildene, eller null hvis ikke konfigurert. */
export function getGcsBucket() {
  if (cachedStorage === undefined) {
    const projectId = process.env.GCP_PROJECT_ID;
    const credentials = getCredentials();
    cachedStorage = projectId && credentials ? new Storage({ projectId, credentials }) : null;
  }

  const bucketName = process.env.GCS_BUCKET_NAME;
  if (!cachedStorage || !bucketName) return null;

  return cachedStorage.bucket(bucketName);
}
