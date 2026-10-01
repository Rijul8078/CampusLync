import "server-only";
import type { Enquiry } from "./enquiries";
import { emailNotificationConfigured } from "./enquiry-repository";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function sendEnquiryNotification(id: string, enquiry: Enquiry) {
  if (!emailNotificationConfigured()) return { configured: false, sent: false };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `campuslync-enquiry-${id}`,
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL,
        to: [process.env.ENQUIRY_NOTIFICATION_TO],
        reply_to: enquiry.email,
        subject: `New CampusLync enquiry: ${enquiry.service}`,
        html: `<h1>New CampusLync enquiry</h1><p><strong>Reference:</strong> ${id}</p><p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p><p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p><p><strong>Phone:</strong> ${escapeHtml(enquiry.phone || "Not provided")}</p><p><strong>Service:</strong> ${escapeHtml(enquiry.service)}</p><p><strong>Current country:</strong> ${escapeHtml(enquiry.country)}</p><p><strong>Country of study:</strong> ${escapeHtml(enquiry.studyCountry)}</p><p><strong>University:</strong> ${escapeHtml(enquiry.university || "Not provided")}</p><p><strong>Preferred contact:</strong> ${escapeHtml(enquiry.contactMethod)}</p><h2>Message</h2><p>${escapeHtml(enquiry.message).replaceAll("\n", "<br>")}</p>`,
      }),
      signal: controller.signal,
    });
    return { configured: true, sent: response.ok };
  } catch {
    return { configured: true, sent: false };
  } finally {
    clearTimeout(timeout);
  }
}
