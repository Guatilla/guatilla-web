export interface SporbarhetFeedbackNotificationData {
  lotNumber: string;
  roastReference: string;
  createdAt: Date;
  packagingDesign: number;
  coffeeQuality: number;
  preparationMethod: string;
  coffeeComments: string | null;
  coffeeWishes: string | null;
  packagingComments: string | null;
  pageComments: string | null;
  norwegianCorrections: string | null;
  notifyConsent: boolean;
  contactEmail: string | null;
}

export interface SporbarhetNotificationEmail {
  subject: string;
  text: string;
  html: string;
}

const PREPARATION_LABELS: Record<string, string> = {
  filter: "Filterkaffe",
  presskanne: "Presskanne",
  espresso: "Espresso",
  aeropress: "AeroPress",
  mokkakanne: "Mokkakanne",
  annet: "Annet",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Oslo",
  }).format(date);
}

function optionalTextRow(label: string, value: string | null): string | null {
  return value ? `${label}:\n${value}` : null;
}

function optionalHtmlRow(label: string, value: string | null): string {
  if (!value) return "";
  return `<h3 style="margin:22px 0 6px;font-size:16px;">${escapeHtml(label)}</h3><p style="margin:0;white-space:pre-wrap;">${escapeHtml(value)}</p>`;
}

export function buildSporbarhetVisitEmail(
  lotNumber: string,
  visitedAt: Date,
  pageUrl: string,
): SporbarhetNotificationEmail {
  const timestamp = formatTimestamp(visitedAt);

  return {
    subject: `Nueva visita a la experiencia ${lotNumber}`,
    text: [
      `Alguien abrió la experiencia de trazabilidad del lote ${lotNumber}.`,
      `Fecha: ${timestamp}`,
      `Página: ${pageUrl}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#2e2018;line-height:1.5;">
        <div style="background:#205654;color:#fff7ef;padding:24px;">
          <div style="color:#dda83a;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Nueva visita</div>
          <h1 style="margin:8px 0 0;font-size:28px;">Lote ${escapeHtml(lotNumber)}</h1>
        </div>
        <div style="border:2px solid #2e2018;border-top:0;padding:24px;background:#fff7ef;">
          <p>Alguien abrió la experiencia de trazabilidad del café.</p>
          <p><strong>Fecha:</strong> ${escapeHtml(timestamp)}</p>
          <p><a href="${escapeHtml(pageUrl)}" style="display:inline-block;background:#2e2018;color:#fff7ef;padding:12px 18px;text-decoration:none;font-weight:700;">Abrir la página</a></p>
        </div>
      </div>`,
  };
}

export function buildSporbarhetFeedbackEmail(
  feedback: SporbarhetFeedbackNotificationData,
  pageUrl: string,
): SporbarhetNotificationEmail {
  const method = PREPARATION_LABELS[feedback.preparationMethod] ?? feedback.preparationMethod;
  const timestamp = formatTimestamp(feedback.createdAt);
  const contactText = feedback.notifyConsent && feedback.contactEmail
    ? `Contacto autorizado: ${feedback.contactEmail}`
    : "No autorizó contacto por correo.";
  const comments = [
    optionalTextRow("Comentario sobre el café", feedback.coffeeComments),
    optionalTextRow("Qué le gustaría encontrar", feedback.coffeeWishes),
    optionalTextRow("Comentario sobre el empaque", feedback.packagingComments),
    optionalTextRow("Comentario sobre la página", feedback.pageComments),
    optionalTextRow("Correcciones de noruego", feedback.norwegianCorrections),
  ].filter((value): value is string => Boolean(value));

  return {
    subject: `Nueva opinión ${feedback.lotNumber}: café ${feedback.coffeeQuality}/5`,
    text: [
      `Nueva opinión sobre el lote ${feedback.lotNumber}`,
      `Tueste: ${feedback.roastReference}`,
      `Fecha: ${timestamp}`,
      `Diseño de empaque: propuesta ${feedback.packagingDesign}`,
      `Calidad del café: ${feedback.coffeeQuality}/5`,
      `Preparación: ${method}`,
      contactText,
      ...comments,
      `Página: ${pageUrl}`,
    ].join("\n\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#2e2018;line-height:1.5;">
        <div style="background:#205654;color:#fff7ef;padding:24px;">
          <div style="color:#dda83a;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Nueva opinión</div>
          <h1 style="margin:8px 0 0;font-size:28px;">Lote ${escapeHtml(feedback.lotNumber)}</h1>
        </div>
        <div style="border:2px solid #2e2018;border-top:0;padding:24px;background:#fff7ef;">
          <p><strong>Fecha:</strong> ${escapeHtml(timestamp)}<br>
          <strong>Tueste:</strong> ${escapeHtml(feedback.roastReference)}<br>
          <strong>Diseño de empaque:</strong> propuesta ${feedback.packagingDesign}<br>
          <strong>Calidad del café:</strong> ${feedback.coffeeQuality}/5<br>
          <strong>Preparación:</strong> ${escapeHtml(method)}</p>
          ${optionalHtmlRow("Comentario sobre el café", feedback.coffeeComments)}
          ${optionalHtmlRow("Qué le gustaría encontrar", feedback.coffeeWishes)}
          ${optionalHtmlRow("Comentario sobre el empaque", feedback.packagingComments)}
          ${optionalHtmlRow("Comentario sobre la página", feedback.pageComments)}
          ${optionalHtmlRow("Correcciones de noruego", feedback.norwegianCorrections)}
          <p style="margin-top:24px;"><strong>${escapeHtml(contactText)}</strong></p>
          <p><a href="${escapeHtml(pageUrl)}" style="display:inline-block;background:#2e2018;color:#fff7ef;padding:12px 18px;text-decoration:none;font-weight:700;">Abrir la experiencia</a></p>
        </div>
      </div>`,
  };
}
