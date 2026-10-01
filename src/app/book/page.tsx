import { CalendarDays, Check, ExternalLink } from "lucide-react";
import { Breadcrumbs, Button } from "@/components/ui";
import { site } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Request a Student Support Consultation",
  "Request a conversation about CampusLync academic, career or London accommodation support.",
  "/book",
);

export default function Page() {
  return (
    <section className="booking-page container">
      <Breadcrumbs current="Consultation" />
      <div className="booking-card">
        <div className="booking-icon">
          <CalendarDays size={31} />
        </div>
        <p className="eyebrow">A useful first conversation</p>
        <h1>Request a consultation.</h1>
        <p className="hero-description">
          Tell us what you are working through and the kind of support you need.
          We can then identify an appropriate next step.
        </p>
        <ul className="booking-points">
          <li>
            <Check size={17} /> Academic and Career support worldwide
          </li>
          <li>
            <Check size={17} /> Accommodation support currently in London
          </li>
          <li>
            <Check size={17} /> No obligation or invented booking confirmation
          </li>
        </ul>
        {site.bookingUrl ? (
          <a
            className="button"
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View available times <ExternalLink size={17} />
          </a>
        ) : (
          <>
            <div className="booking-status" role="status">
              Online calendar scheduling is not connected yet. Send a support
              request and ask for a consultation; your request is only sent when
              enquiry delivery has also been configured.
            </div>
            <Button href="/contact?service=Other&message=I%20would%20like%20to%20request%20a%20consultation.">
              Request through support form
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
