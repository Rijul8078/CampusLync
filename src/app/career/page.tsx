import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Worldwide University & Graduate Career Support",
  "CV and resume guidance, LinkedIn support, career planning and interview preparation for university students and graduates worldwide.",
  "/career",
);
export default function Page() {
  return <ServicePage kind="career" />;
}
