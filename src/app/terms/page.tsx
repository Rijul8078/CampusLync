import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Terms of Use — Draft",
    "Draft terms describing CampusLync website use and the boundaries of academic, career and accommodation guidance.",
    "/terms",
  ),
  robots: { index: false, follow: true },
};
export default function Page() {
  return <LegalPage kind="terms" />;
}
