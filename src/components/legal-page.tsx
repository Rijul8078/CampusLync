import { Hero } from "./ui";
import { site } from "@/lib/config";
import { databaseConfigured } from "@/lib/database";
import { emailNotificationConfigured } from "@/lib/enquiry-repository";
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <>
      <Hero
        current={kind === "privacy" ? "Privacy" : "Terms"}
        eyebrow="Clear about the details"
        title={kind === "privacy" ? "Privacy Policy" : "Terms of use"}
        text="Draft for review. This page must be completed with confirmed business and service details before the website accepts live enquiries."
        image={
          kind === "privacy"
            ? "/images/pages/privacy.webp"
            : "/images/pages/terms.webp"
        }
        imageAlt={
          kind === "privacy"
            ? "Student reviewing privacy settings on a laptop"
            : "Student carefully reviewing a service document"
        }
      />
      <section className="section container prose">
        <div className="form-notice">
          <p>
            <strong>Not a final legal policy.</strong> The business identity,
            contact arrangements and delivery provider have not yet been
            confirmed. This draft describes the current website and is not a
            substitute for a reviewed launch policy.
          </p>
        </div>
        {kind === "privacy" ? (
          <>
            <h2>Who is responsible</h2>
            <p>
              {site.legalName || "Business legal identity: not yet configured."}
              <br />
              {site.email
                ? `Privacy contact: ${site.email}`
                : "Privacy contact: not yet configured."}
              <br />
              {site.address || "Business postal address: not yet configured."}
            </p>
            <h2>The information in the enquiry form</h2>
            <p>
              The form asks for your name, email, current country, country of
              study, service needs, message and preferred contact method.
              University and telephone details are optional, except a number is
              needed if you choose Phone or WhatsApp. Do not include sensitive
              documents or unnecessary personal information.
            </p>
            <h2>How the current form works</h2>
            <p>
              Typing into the form does not transmit its contents. If you submit
              a valid form, the details are sent to this website’s server for
              validation.{" "}
              {databaseConfigured
                ? "Accepted enquiries are stored in the configured PostgreSQL database so CampusLync can respond and manage the request."
                : "Enquiry storage is currently disabled, so the application does not accept or save the request."}{" "}
              {emailNotificationConfigured()
                ? "The configured email provider also sends an internal notification to the CampusLync recipient."
                : "No email notification provider is currently configured."}{" "}
              The site does not intentionally store form drafts in browser
              storage.
            </p>
            <h2>Website operation</h2>
            <p>
              No analytics or advertising trackers have been added, and the
              application does not set tracking cookies. The eventual hosting
              provider may process technical request information such as IP
              addresses and server logs. The provider, retention and processing
              arrangements must be documented before launch.
            </p>
            <h2>Before enquiries are enabled</h2>
            <p>
              The final policy must identify the responsible business, purposes
              and legal basis for processing, delivery and hosting providers,
              international transfers if applicable, retention periods,
              applicable rights and how to exercise them. Consent wording must
              be reviewed against the actual processing arrangements.
            </p>
            <h2>Retention and security</h2>
            <p>
              The planned retention period is{" "}
              {process.env.DATA_RETENTION_DAYS || "not yet configured"} days and
              must be confirmed in the final policy. Rate limiting uses a
              one-way hash rather than storing raw IP addresses in the
              application database. Access to enquiry records is restricted to
              the authenticated administration area.
            </p>
            <h2>External websites</h2>
            <p>
              Links to other websites are provided for context. Their own
              privacy policies apply when you visit them.
            </p>
          </>
        ) : (
          <>
            <h2>About this website</h2>
            <p>
              CampusLync describes academic, career and practical student living
              support. Business legal identity:{" "}
              {site.legalName || "not yet configured"}. This website currently
              provides service information and an enquiry form{" "}
              {databaseConfigured
                ? "connected to persistent storage."
                : "with delivery disabled."}
            </p>
            <h2>Information and service agreements</h2>
            <p>
              Website information is general guidance. An enquiry does not
              create a service agreement or confirm availability. The scope,
              timing, fees, payment arrangements and any cancellation or refund
              terms must be explained and agreed before a paid service begins.
              Those commercial terms are not yet configured.
            </p>
            <h2>Academic support</h2>
            <p>
              CampusLync provides academic consultancy, tutoring, research
              guidance, feedback, editing and development support. Students stay
              involved, retain authorship and responsibility for the final work,
              and must follow their institution’s rules. CampusLync does not
              impersonate students or guarantee grades. The Academic Integrity
              page explains how responsible support works.
            </p>
            <h2>Career support</h2>
            <p>
              Career guidance supports preparation and decision-making. It does
              not guarantee employment, interviews, placements or any particular
              result.
            </p>
            <h2>Accommodation and relocation</h2>
            <p>
              CampusLync currently offers accommodation search assistance and
              relocation guidance in London and works with accommodation
              providers to help students explore options. It does not own
              accommodation, act as a letting agent or guarantee availability.
              Students must verify information and make their own agreements
              with providers. We do not provide regulated legal, financial or
              immigration advice.
            </p>
            <h2>Using the website</h2>
            <p>
              Do not misuse the website, attempt unauthorised access or submit
              information that you do not have permission to share. External
              websites are responsible for their own content and services.
            </p>
            <h2>Details still to be finalised</h2>
            <p>
              The final terms must confirm the contracting business, contact and
              complaints procedures, applicable jurisdiction, service-specific
              commercial terms and appropriate consumer rights wording. Nothing
              in this draft is intended to exclude rights that cannot lawfully
              be excluded.
            </p>
          </>
        )}
      </section>
    </>
  );
}
