export interface OrderNotificationLine {
  productName: string;
  variantName: string | null;
  sku: string | null;
  quantity: number;
  lineTotalOre: number;
}

export interface OrderNotificationData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhoneE164: string;
  addressLine1: string;
  addressLine2: string | null;
  postalCode: string;
  city: string;
  countryCode: string;
  totalOre: number;
  currency: string;
  customerNote: string | null;
  items: OrderNotificationLine[];
}

export interface OrderNotificationEmail {
  subject: string;
  text: string;
  html: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatNok(priceOre: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceOre / 100);
}

function itemLabel(item: OrderNotificationLine): string {
  return [item.productName, item.variantName, item.sku ? `SKU ${item.sku}` : null]
    .filter(Boolean)
    .join(" · ");
}

export function buildOrderNotificationEmail(
  order: OrderNotificationData,
  adminUrl: string,
): OrderNotificationEmail {
  const address = [
    order.addressLine1,
    order.addressLine2,
    `${order.postalCode} ${order.city}`,
    order.countryCode,
  ].filter(Boolean) as string[];
  const itemText = order.items.map(
    (item) =>
      `- ${item.quantity} × ${itemLabel(item)} — ${formatNok(item.lineTotalOre)}`,
  );
  const noteText = order.customerNote ? `\nNota del cliente: ${order.customerNote}` : "";
  const text = [
    `Nueva venta ${order.orderNumber}`,
    "",
    "Envía una solicitud de pago Vipps con estos datos:",
    `Teléfono: ${order.customerPhoneE164}`,
    `Importe: ${formatNok(order.totalOre)}`,
    `Referencia: ${order.orderNumber}`,
    "",
    `Cliente: ${order.customerName}`,
    `Correo: ${order.customerEmail}`,
    `Dirección: ${address.join(", ")}`,
    "",
    "Productos:",
    ...itemText,
    noteText,
    "",
    `Abrir pedido: ${adminUrl}`,
  ].join("\n");

  const itemHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #d8c8b6;">${item.quantity} &times; ${escapeHtml(itemLabel(item))}</td>
          <td style="padding:8px;border-bottom:1px solid #d8c8b6;text-align:right;white-space:nowrap;">${escapeHtml(formatNok(item.lineTotalOre))}</td>
        </tr>`,
    )
    .join("");
  const noteHtml = order.customerNote
    ? `<p><strong>Nota del cliente:</strong><br>${escapeHtml(order.customerNote).replaceAll("\n", "<br>")}</p>`
    : "";

  return {
    subject: `Nueva venta ${order.orderNumber} — enviar solicitud Vipps`,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#2e2018;line-height:1.5;">
        <div style="background:#205654;color:#fff7ef;padding:24px;">
          <div style="color:#dda83a;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Nueva venta</div>
          <h1 style="margin:8px 0 0;font-size:30px;">${escapeHtml(order.orderNumber)}</h1>
        </div>
        <div style="border:2px solid #2e2018;border-top:0;padding:24px;background:#fff7ef;">
          <div style="background:#f2e6d8;border:2px solid #2e2018;padding:18px;margin-bottom:22px;">
            <h2 style="margin:0 0 12px;font-size:20px;">Enviar solicitud de pago Vipps</h2>
            <p style="margin:4px 0;"><strong>Teléfono:</strong> ${escapeHtml(order.customerPhoneE164)}</p>
            <p style="margin:4px 0;"><strong>Importe:</strong> ${escapeHtml(formatNok(order.totalOre))}</p>
            <p style="margin:4px 0;"><strong>Referencia:</strong> ${escapeHtml(order.orderNumber)}</p>
          </div>
          <h2 style="font-size:20px;">Cliente y entrega</h2>
          <p>
            <strong>${escapeHtml(order.customerName)}</strong><br>
            <a href="mailto:${escapeHtml(order.customerEmail)}">${escapeHtml(order.customerEmail)}</a><br>
            ${escapeHtml(address.join(", "))}
          </p>
          <h2 style="font-size:20px;">Productos</h2>
          <table style="width:100%;border-collapse:collapse;">${itemHtml}</table>
          <p style="font-size:22px;text-align:right;"><strong>Total: ${escapeHtml(formatNok(order.totalOre))}</strong></p>
          ${noteHtml}
          <p style="margin-top:24px;"><a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#2e2018;color:#fff7ef;padding:12px 18px;text-decoration:none;font-weight:700;">Abrir pedido en administración</a></p>
        </div>
      </div>`,
  };
}
