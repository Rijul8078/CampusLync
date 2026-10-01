import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { QuickEnquiry } from "@/components/quick-enquiry";
import { site } from "@/lib/config";
export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: {
    default: "CampusLync | Study. Settle. Succeed.",
    template: "%s | CampusLync",
  },
  description:
    "Worldwide academic and career support for university students, with accommodation assistance currently available in London.",
  robots: { index: Boolean(site.url), follow: Boolean(site.url) },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <WhatsAppButton />
        <QuickEnquiry />
        <Footer />
      </body>
    </html>
  );
}
