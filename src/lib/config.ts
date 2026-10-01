const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
const rawBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
function siteUrl() {
  if (!rawUrl) return undefined;
  const url = new URL(rawUrl);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("SITE_URL must be an HTTP(S) URL");
  return url.origin;
}
export const site = {
  name: "CampusLync",
  tagline: "Study. Settle. Succeed.",
  url: siteUrl(),
  legalName: process.env.BUSINESS_LEGAL_NAME || null,
  email: process.env.BUSINESS_CONTACT_EMAIL || "campuslync1@gmail.com",
  phone: process.env.BUSINESS_CONTACT_PHONE || "+919119235092",
  address: process.env.BUSINESS_POSTAL_ADDRESS || null,
  bookingUrl:
    rawBookingUrl && /^https:\/\//.test(rawBookingUrl) ? rawBookingUrl : null,
};
export const routes = [
  "/",
  "/study",
  "/career",
  "/accommodation",
  "/moving-to-london",
  "/resources",
  "/about",
  "/contact",
  "/book",
  "/privacy",
  "/terms",
  "/academic-integrity",
];
