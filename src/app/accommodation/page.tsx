import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Student Accommodation Help in London",
  "Explore London student accommodation through providers CampusLync works with, compare areas, understand requirements and plan your move.",
  "/accommodation",
);
export default function Page() {
  return <ServicePage kind="accommodation" />;
}
