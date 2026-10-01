import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Privacy Policy — Draft",
    "Draft privacy information for the CampusLync website and its currently unavailable enquiry delivery.",
    "/privacy",
  ),
  robots: { index: false, follow: true },
};
export default function Page() {
  return <LegalPage kind="privacy" />;
}
