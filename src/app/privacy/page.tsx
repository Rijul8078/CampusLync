import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Privacy Policy — Draft",
    "Draft privacy information for the CampusLync website and enquiry service.",
    "/privacy",
  ),
  robots: { index: false, follow: true },
};
export default function Page() {
  return <LegalPage kind="privacy" />;
}
