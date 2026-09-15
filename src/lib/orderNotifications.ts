import "server-only";

import { Resend } from "resend";
import { buildOrderNotificationEmail } from "@/lib/orderNotificationContent";
import { getPrisma } from "@/lib/prisma";

const PUBLIC_SITE_URL = "https://www.guatilla.no";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type OrderNotificationStatus = "sent" | "not-configured" | "order-not-found";

export async function notifyOwnerOfOrder(orderId: string): Promise<OrderNotificationStatus> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.ORDER_NOTIFICATION_EMAIL?.trim();
  const sender = process.env.ORDER_NOTIFICATION_FROM?.trim();
  if (
    !apiKey ||
    !recipient ||
    !sender ||
    !EMAIL_PATTERN.test(recipient) ||
    !sender.includes("@")
  ) {
    return "not-configured";
  }

  const prisma = await getPrisma();
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      customerEmail: true,
      customerPhoneE164: true,
      addressLine1: true,
      addressLine2: true,
      postalCode: true,
      city: true,
      countryCode: true,
      totalOre: true,
      currency: true,
      customerNote: true,
      items: {
        orderBy: { createdAt: "asc" },
        select: {
          productName: true,
          variantName: true,
          sku: true,
          quantity: true,
          lineTotalOre: true,
        },
      },
    },
  });
  if (!order) return "order-not-found";

  const adminUrl = `${PUBLIC_SITE_URL}/admin/pedidos/${encodeURIComponent(order.id)}`;
  const email = buildOrderNotificationEmail(order, adminUrl);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    {
      from: sender,
      to: recipient,
      replyTo: order.customerEmail,
      subject: email.subject,
      text: email.text,
      html: email.html,
    },
    { idempotencyKey: `new-order/${order.id}` },
  );
  if (error) throw new Error("The order notification provider rejected the email.");
  return "sent";
}
