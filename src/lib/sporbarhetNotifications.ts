import "server-only";

import { Resend } from "resend";
import {
  buildSporbarhetFeedbackEmail,
  buildSporbarhetVisitEmail,
  type SporbarhetFeedbackNotificationData,
  type SporbarhetNotificationEmail,
} from "@/lib/sporbarhetNotificationContent";

const PUBLIC_PAGE_URL = "https://www.guatilla.no/sporbarhet";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SporbarhetNotificationStatus = "sent" | "not-configured";

function notificationConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = (
    process.env.SPORBARHET_NOTIFICATION_EMAIL || process.env.ORDER_NOTIFICATION_EMAIL
  )?.trim();
  const sender = (
    process.env.SPORBARHET_NOTIFICATION_FROM || process.env.ORDER_NOTIFICATION_FROM
  )?.trim();

  if (
    !apiKey ||
    !recipient ||
    !sender ||
    !EMAIL_PATTERN.test(recipient) ||
    !sender.includes("@")
  ) {
    return null;
  }

  return { apiKey, recipient, sender };
}

async function sendNotification(
  email: SporbarhetNotificationEmail,
  idempotencyKey: string,
  replyTo?: string,
): Promise<SporbarhetNotificationStatus> {
  const config = notificationConfig();
  if (!config) return "not-configured";

  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send(
    {
      from: config.sender,
      to: config.recipient,
      ...(replyTo ? { replyTo } : {}),
      subject: email.subject,
      text: email.text,
      html: email.html,
    },
    { idempotencyKey },
  );
  if (error) throw new Error("The traceability notification provider rejected the email.");
  return "sent";
}

export async function notifyOwnerOfSporbarhetVisit(
  lotNumber: string,
  eventId: string,
): Promise<SporbarhetNotificationStatus> {
  const email = buildSporbarhetVisitEmail(lotNumber, new Date(), PUBLIC_PAGE_URL);
  return sendNotification(email, `sporbarhet-visit/${eventId}`);
}

export async function notifyOwnerOfSporbarhetFeedback(
  feedbackId: string,
  feedback: SporbarhetFeedbackNotificationData,
): Promise<SporbarhetNotificationStatus> {
  const email = buildSporbarhetFeedbackEmail(feedback, PUBLIC_PAGE_URL);
  const replyTo = feedback.notifyConsent && feedback.contactEmail
    ? feedback.contactEmail
    : undefined;
  return sendNotification(email, `sporbarhet-feedback/${feedbackId}`, replyTo);
}
