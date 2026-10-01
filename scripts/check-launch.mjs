const required = [
  "NEXT_PUBLIC_SITE_URL",
  "BUSINESS_LEGAL_NAME",
  "BUSINESS_CONTACT_EMAIL",
  "BUSINESS_POSTAL_ADDRESS",
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length)
  console.error(`Missing launch configuration: ${missing.join(", ")}`);
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
console.error(
  "Launch review required: implement and test the delivery adapter, add abuse controls, confirm provider privacy arrangements, and finalise draft legal policies.",
);
process.exitCode = 1;
