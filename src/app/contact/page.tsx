import {
  BookOpen,
  BriefcaseBusiness,
  House,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { Breadcrumbs, Button } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { deliveryAdapter } from "@/lib/enquiry-delivery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Get Support",
  "Request worldwide academic or career support, or specialist London accommodation and relocation guidance from CampusLync.",
  "/contact",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    service?: string | string[];
    message?: string | string[];
  }>;
}) {
  const params = await searchParams;
  return (
    <section className="contact-page container">
      <Breadcrumbs current="Get Support" />
      <div className="contact-layout">
        <aside className="contact-intro">
          <p className="eyebrow">
            <span className="small-dot" /> LET’S START WITH YOU
          </p>
          <h1>
            A question. <br />A plan. <br />
            <span>A next step.</span>
          </h1>
          <p className="hero-description">
            Whatever you’re figuring out, you don’t have to do it alone. Tell us
            where you are and what would help.
          </p>
          <div className="contact-booking-link">
            <Button href="/book" secondary>
              Request a consultation
            </Button>
          </div>
          <div className="contact-services">
            {[
              {
                icon: BookOpen,
                title: "Study with confidence",
                text: "Academic guidance that builds your skills.",
              },
              {
                icon: BriefcaseBusiness,
                title: "Think about what’s next",
                text: "Practical support for your career plans.",
              },
              {
                icon: House,
                title: "Support wherever you study",
                text: "Worldwide Study and Career services, plus London accommodation guidance.",
              },
            ].map((item) => (
              <div key={item.title}>
                <item.icon size={22} />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-photo">
            <Image
              src="/images/student-life.webp"
              alt="University students discussing their work together in a library"
              fill
              sizes="(max-width: 800px) calc(100vw - 40px), 430px"
            />
          </div>
          <div className="contact-aside-note">
            <MessageCircle size={22} />
            <p>
              No need to have all the answers.
              <br />A starting point is enough.
            </p>
          </div>
        </aside>
        <ContactForm
          initialService={
            typeof params.service === "string" ? params.service : undefined
          }
          initialMessage={
            typeof params.message === "string"
              ? params.message.slice(0, 5000)
              : undefined
          }
          available={deliveryAdapter !== null}
        />
      </div>
    </section>
  );
}
