# Migración Supabase → Google Cloud

Sustituye Supabase Postgres por **Cloud SQL for PostgreSQL** y Supabase Storage
por **Google Cloud Storage**. El código ya está migrado (Prisma + `@google-cloud/storage`);
esta guía es la parte de infraestructura que hay que ejecutar una sola vez.

Proyecto GCP: **`kaffe-guatilla`** (bajo la organización `ing-wilkins-org`). Todos los
comandos abajo asumen que ya lo seleccionaste:

```bash
gcloud config set project kaffe-guatilla
```

## 1. Cloud SQL (Postgres)

```bash
gcloud sql instances create kaffe-guatilla-db \
  --database-version=POSTGRES_16 \
  --edition=ENTERPRISE \
  --tier=db-f1-micro \
  --region=europe-north1 \
  --root-password="<contraseña-fuerte>"

gcloud sql databases create kaffe_guatilla --instance=kaffe-guatilla-db

gcloud sql users create kaffe_app \
  --instance=kaffe-guatilla-db \
  --password="<otra-contraseña-fuerte>"

# Habilita IP pública + exige conexión cifrada (SIN exigir certificado de
# cliente — --require-ssl es el flag legado y en realidad activa mTLS, lo que
# rompe la conexión desde psql/Prisma sin certificados configurados)
gcloud sql instances patch kaffe-guatilla-db --assign-ip --ssl-mode=ENCRYPTED_ONLY

# Autoriza el acceso: por defecto Cloud SQL con IP pública no acepta NINGUNA
# conexión hasta que se autorice una red. Como ni Cloud Shell ni Vercel tienen
# una IP de salida fija que se pueda poner en una lista blanca, se abre a
# cualquier IP y se confía en --require-ssl + la contraseña (mismo modelo que
# ya tenían con Supabase).
gcloud sql instances patch kaffe-guatilla-db --authorized-networks=0.0.0.0/0
```

`DATABASE_URL` resultante (usar la IP pública que devuelve `gcloud sql instances describe`):

```
DATABASE_URL="postgresql://kaffe_app:<password>@<IP_PUBLICA>:5432/kaffe_guatilla?sslmode=require&uselibpqcompat=true"
```

Ejecuta el script de creación de tablas una vez:

```bash
psql "$DATABASE_URL" -f gcp/sql/001_init_coffee_lots_and_waitlist.sql
```

Luego, baseline de Prisma (ya no volverá a correr `prisma migrate dev` a ciegas contra esta tabla):

```bash
npx prisma migrate diff \
  --from-empty --to-schema-datamodel prisma/schema.prisma \
  --script > /dev/null  # solo para validar que el esquema compila

npx prisma db pull   # opcional: confirma que Prisma ve las mismas columnas
```

## 2. Cloud Storage (imágenes de los lotes)

```bash
gsutil mb -l europe-north1 gs://kaffe-guatilla-sporbarhet

# Bucket público de solo-lectura (equivalente al bucket público de Supabase)
gsutil iam ch allUsers:objectViewer gs://kaffe-guatilla-sporbarhet
```

## 3. Service account para subir imágenes desde la app

```bash
gcloud iam service-accounts create kaffe-guatilla-storage \
  --display-name="Kaffe Guatilla - Storage uploads"

gsutil iam ch \
  serviceAccount:kaffe-guatilla-storage@kaffe-guatilla.iam.gserviceaccount.com:objectAdmin \
  gs://kaffe-guatilla-sporbarhet

gcloud iam service-accounts keys create key.json \
  --iam-account=kaffe-guatilla-storage@kaffe-guatilla.iam.gserviceaccount.com

# Variable de entorno: el JSON de la key, en base64, en una sola línea
base64 -w0 key.json   # copia la salida a GCS_SERVICE_ACCOUNT_KEY
rm key.json           # no dejar la key en disco
```

## 3b. Cloud SQL Connector (conexión segura de la app en runtime)

En vez de que la app conecte a la IP pública con solo usuario+contraseña (accesible
desde cualquier IP porque el paso 1 dejó `--authorized-networks=0.0.0.0/0`), usa el
[Cloud SQL Connector](https://cloud.google.com/sql/docs/postgres/connect-connectors):
la misma service account de Storage pide, por cada conexión, un certificado TLS
efímero (dura ~1h) firmado por Google — sin ese certificado la contraseña sola no
alcanza para entrar por esta vía. Reutiliza la service account `kaffe-guatilla-storage`
en vez de crear otra, dándole además el rol de cliente de Cloud SQL:

```bash
gcloud projects add-iam-policy-binding kaffe-guatilla \
  --member="serviceAccount:kaffe-guatilla-storage@kaffe-guatilla.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"
```

El `GCS_SERVICE_ACCOUNT_KEY` que ya tienes en `.env`/Vercel sirve para esto también —
no hace falta una key nueva. Solo necesitas el "Nombre de la conexión con la instancia"
(se ve en la página de la instancia en la consola, formato `proyecto:región:instancia`):

```
kaffe-guatilla:europe-north1:kaffe-guatilla-db
```

`DATABASE_URL` (con la IP pública) se sigue necesitando, pero **solo para la CLI de
Prisma** (`prisma migrate`, `prisma db pull`) — la app en runtime ya no la usa, usa el
connector. Herramientas como `psql`/DataGrip también siguen usando `DATABASE_URL`
directo, no el connector.

## 4. Variables de entorno

Añade en `.env` (local) y en el proyecto de Vercel (Settings → Environment Variables):

```
DATABASE_URL=postgresql://kaffe_app:...@<IP_PUBLICA>:5432/kaffe_guatilla?sslmode=require&uselibpqcompat=true
GCP_PROJECT_ID=kaffe-guatilla
GCS_BUCKET_NAME=kaffe-guatilla-sporbarhet
GCS_SERVICE_ACCOUNT_KEY=<base64 del key.json, una sola línea>
GCP_SQL_INSTANCE_CONNECTION_NAME=kaffe-guatilla:europe-north1:kaffe-guatilla-db
DATABASE_USER=kaffe_app
DATABASE_PASSWORD=<la contraseña de kaffe_app>
DATABASE_NAME=kaffe_guatilla
```

`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` se mantienen **temporalmente** — el
script de migración de datos (paso 5) los necesita para leer desde Supabase.
Bórralos del `.env` y de Vercel una vez confirmen que todo funciona en Cloud SQL/GCS.

## 5. Migrar los datos existentes

Con `DATABASE_URL`, `GCP_PROJECT_ID`, `GCS_BUCKET_NAME`, `GCS_SERVICE_ACCOUNT_KEY`,
`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` puestos en `.env`:

```bash
npx prisma generate
node gcp/scripts/migrate-to-gcp.mjs
```

El script copia cada fila de `coffee_lots` y `waitlist`, descarga cada imagen del
bucket viejo de Supabase y la vuelve a subir a Cloud Storage, reescribiendo las URLs.
Es idempotente — se puede volver a correr sin duplicar nada.

## 6. Verificar y apagar Supabase

- Prueba `/sporbarhet` (búsqueda pública) y `/admin/sporbarhet` (CRUD + subida de imágenes) contra el entorno con las nuevas variables.
- Cuando todo esté confirmado: quita `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` de `.env`/Vercel, y pausa o elimina el proyecto de Supabase.
