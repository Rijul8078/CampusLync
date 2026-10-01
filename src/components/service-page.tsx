import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import {
  Hero,
  Button,
  SectionHeading,
  CTA,
  CheckList,
  serviceIcons,
  ArtworkPanel,
} from "./ui";
import { services, type ServiceKey } from "@/lib/content";
import { serviceFaqs } from "@/lib/content";
import { FAQ } from "./faq";
const intros = {
  study: {
    title: "Study with clarity and confidence.",
    text: "Understand the ideas. Strengthen your skills. Get academic guidance that helps you move forward with work that is truly your own.",
  },
  career: {
    title: "Turn university into opportunity.",
    text: "Worldwide career guidance for university students and graduates. Start with your experience, explore your options and build a practical plan for what comes next.",
  },
  accommodation: {
    title: "Find somewhere that feels like home.",
    text: "Moving to London for university? Get help understanding your options, comparing areas and organising your accommodation search.",
  },
};
const heroImages = {
  study: {
    src: "/images/study.webp",
    alt: "University student working on a laptop with books in a library",
    position: "center",
  },
  career: {
    src: "/images/career.webp",
    alt: "Young professional discussing documents during a career conversation",
    position: "center 35%",
  },
  accommodation: {
    src: "/images/accommodation.webp",
    alt: "Bright furnished studio accommodation with a bed, desk and seating area",
    position: "center",
  },
};
export function ServicePage({ kind }: { kind: ServiceKey }) {
  const service = services.find((s) => s.key === kind)!;
  const intro = intros[kind];
  const heroImage = heroImages[kind];
  const Icon = serviceIcons[kind];
  const href = `/contact?service=${encodeURIComponent(service.enquiry)}`;
  return (
    <>
      <Hero
        current={
          kind === "accommodation"
            ? "Accommodation"
            : `${service.label} Support`
        }
        eyebrow={service.eyebrow}
        title={intro.title}
        text={intro.text}
        image={heroImage.src}
        imageAlt={heroImage.alt}
        imagePosition={heroImage.position}
      >
        <Button href={href}>
          Request {kind === "accommodation" ? "Accommodation" : service.label}{" "}
          Support
        </Button>
      </Hero>
      <section className="section container">
        <SectionHeading
          eyebrow={`${service.label} / built around you`}
          title={
            kind === "career"
              ? "From your first CV to your next conversation."
              : "A clearer search, from the first question."
          }
          text="Start with what you need now. We can discuss the right support and agree on the next steps together."
        />
        <div className="detail-grid">
          {service.items.map((item, index) => (
            <article className="detail-card" key={item.title}>
              <div className="detail-card-top">
                <Icon size={25} strokeWidth={1.5} />
                <span>0{index + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        {kind === "career" && (
          <ArtworkPanel
            image="/artwork/career-progression.webp"
            alt="Abstract career pathway connecting a CV, professional profile, interview and opportunity"
            eyebrow="A practical route forward"
            title="Prepare for each step—not just the application."
            text="Bring your CV, profile, interview preparation and wider career plan into one connected process."
          />
        )}
        {kind === "accommodation" && (
          <ArtworkPanel
            image="/artwork/london-living.webp"
            alt="Abstract London relocation journey connecting accommodation, luggage and the city"
            eyebrow="Your London move"
            title="From searching to settling in."
            text="Organise accommodation priorities, compare areas and prepare for the practical steps around your arrival."
          />
        )}
      </section>
      {kind === "study" ? (
        <section className="section soft-section">
          <div className="container">
            <SectionHeading
              eyebrow="Guidance, with integrity"
              title="Your learning. Your ideas. Your work."
            />
            <div className="two-column">
              <div className="white-panel">
                <h3>What we can help with</h3>
                <CheckList
                  items={[
                    "Explaining concepts and practising academic skills",
                    "Feedback on your own drafts and research plans",
                    "Proofreading and editing where your institution permits it",
                    "Planning your workload and understanding referencing",
                  ]}
                />
              </div>
              <div className="white-panel">
                <h3>Your role in the process</h3>
                <p>
                  Stay involved in the research, development and review process.
                  You retain authorship, decide which recommendations to use and
                  remain responsible for the accuracy and final version of your
                  submitted work.
                </p>
                <p>
                  Support follows your university’s academic-integrity rules and
                  does not guarantee a particular grade or outcome.
                </p>
              </div>
            </div>
            <div className="notice">
              <ShieldCheck size={24} />
              <p>
                You remain responsible for every piece of work you submit. Check
                your university’s rules before requesting support, and disclose
                assistance where required.{" "}
                <Link href="/academic-integrity">
                  Read our academic integrity statement.
                </Link>
              </p>
            </div>
          </div>
        </section>
      ) : kind === "accommodation" ? (
        <section className="section soft-section">
          <div className="container two-column">
            <div>
              <p className="eyebrow">London, on your terms</p>
              <h2>The right questions make a better starting point.</h2>
              <p className="section-description">
                A shorter commute or a little more space? Bills included or a
                shared household? We help you weigh up your priorities.
              </p>
              <Link className="text-link" href="/moving-to-london">
                Plan your move to London
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="white-panel">
              <h3>Clear about our role</h3>
              <p>
                Academic and Career support is available internationally.
                Accommodation assistance is currently available in London only.
              </p>
              <p>
                CampusLync provides accommodation search assistance and
                practical guidance. We do not own properties, act as a letting
                agent, guarantee accommodation or claim partnerships with
                accommodation providers.
              </p>
              <p>
                You make your own decisions and agreements with the provider. We
                do not provide regulated legal, financial or immigration advice.
                Refer legal questions to an appropriately qualified adviser.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="section soft-section">
          <div className="container two-column">
            <div>
              <p className="eyebrow">Build on what you already have</p>
              <h2>You have a starting point. Let’s find it.</h2>
            </div>
            <div>
              <p className="large-copy">
                Course projects, part-time work, volunteering and everyday
                responsibilities can all help you understand your skills. We’ll
                help you describe your experience clearly and honestly.
              </p>
              <p>
                Career guidance helps you prepare; it does not guarantee an
                interview, placement or job. We are not a recruitment agency and
                do not provide immigration advice.
              </p>
            </div>
          </div>
        </section>
      )}
      <FAQ
        items={serviceFaqs[kind]}
        eyebrow={`${service.label} support FAQs`}
        title={`Questions about ${service.label.toLowerCase()} support.`}
        id={`${kind}-faqs`}
      />
      <CTA
        title={
          kind === "study"
            ? "A clearer understanding starts with a question."
            : kind === "career"
              ? "Let’s talk about what comes next."
              : "Make your London accommodation search more manageable."
        }
        text="Tell us a little about your situation and the support you’re looking for."
        label={`Request ${kind === "accommodation" ? "Accommodation" : service.label} Support`}
        href={href}
      />
    </>
  );
}
