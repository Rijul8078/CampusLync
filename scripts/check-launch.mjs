const required = [
  "NEXT_PUBLIC_SITE_URL",
  "BUSINESS_LEGAL_NAME",
  "BUSINESS_CONTACT_EMAIL",
  "BUSINESS_POSTAL_ADDRESS",
  "DATABASE_URL",
  "RATE_LIMIT_SECRET",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "ADMIN_SESSION_SECRET",
  "DATA_RETENTION_DAYS",
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing launch configuration: ${missing.join(", ")}`);
  process.exitCode = 1;
}
if (process.env.NEXT_PUBLIC_SITE_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL);
    if (url.protocol !== "https:" || /localhost|example\./.test(url.hostname))
      throw new Error();
  } catch {
    console.error("Set a confirmed public HTTPS domain.");
    process.exitCode = 1;
  }
}
if ((process.env.ADMIN_SESSION_SECRET || "").length < 32) {
  console.error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  process.exitCode = 1;
}
if ((process.env.RATE_LIMIT_SECRET || "").length < 32) {
  console.error("RATE_LIMIT_SECRET must be at least 32 characters.");
  process.exitCode = 1;
}
const retention = Number(process.env.DATA_RETENTION_DAYS);
if (!Number.isInteger(retention) || retention < 1 || retention > 3650) {
  console.error("DATA_RETENTION_DAYS must be between 1 and 3650.");
  process.exitCode = 1;
}
const emailKeys = [
  "RESEND_API_KEY",
  "ENQUIRY_NOTIFICATION_TO",
  "ENQUIRY_FROM_EMAIL",
];
const emailConfigured = emailKeys.filter((key) => process.env[key]);
if (emailConfigured.length > 0 && emailConfigured.length < emailKeys.length) {
  console.error(
    "Configure all Resend email variables or leave all three empty.",
  );
  process.exitCode = 1;
}
if (process.env.LEGAL_REVIEW_COMPLETE !== "true") {
  console.error(
    "Launch review required: finalise the legal policies and set LEGAL_REVIEW_COMPLETE=true only after approval.",
  );
  process.exitCode = 1;
}
