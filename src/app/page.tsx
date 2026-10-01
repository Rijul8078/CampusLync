import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Globe2,
  Layers3,
  MessagesSquare,
  SlidersHorizontal,
} from "lucide-react";
import {
  Button,
  Services,
  CTA,
  ProcessSteps,
  StudentJourney,
  ResourcePreview,
  SectionHeading,
  ArtworkPanel,
} from "@/components/ui";
import { HomeVisual } from "@/components/home-visual";
import { FAQ } from "@/components/faq";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Student life, made easier",
  "Worldwide academic support and university career guidance, with student accommodation assistance currently available in London.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="small-dot" /> FOR STUDENT LIFE. AND EVERYTHING
              AROUND IT.
            </p>
            <h1>
              Student life,
              <br />
              made{" "}
              <span className="hero-word">
                easier
                <svg viewBox="0 0 280 18" aria-hidden="true">
                  <path d="M3 13 Q130 -3 275 8" />
                </svg>
              </span>
              .
            </h1>
            <p className="hero-description">
              From academic support and career guidance to practical
              student-life assistance, CampusLync helps students navigate
              university with confidence — wherever they study.
            </p>
            <div className="hero-actions">
              <Button href="/contact">Get Support</Button>
              <Button href="#services" secondary>
                Explore Services
              </Button>
            </div>
            <div className="hero-signoff">
              <span className="signoff-line" />
              <p>Study. Settle. Succeed.</p>
            </div>
          </div>
          <HomeVisual />
        </div>
        <div className="hero-bottom container">
          <p>YOUR AMBITIONS. YOUR PACE. OUR SUPPORT.</p>
          <div>
            <span>
              <BookIcon />
              Study
            </span>
            <i />
            <span>Career</span>
            <i />
            <span>Accommodation · London</span>
          </div>
          <a href="#services" aria-label="Explore student support services">
            Discover your next step <ArrowRight size={15} />
          </a>
        </div>
      </section>
      <Services />
      <StudentJourney />
      <section className="container london-promo">
        <div>
          <p className="eyebrow">
            <MapPin size={15} /> SPECIALIST LONDON SUPPORT
          </p>
          <h2>Moving to London?</h2>
          <p>
            CampusLync also provides accommodation and relocation assistance for
            students moving to London.
          </p>
        </div>
        <Button href="/moving-to-london" light>
          Explore London Support
        </Button>
      </section>
      <ProcessSteps />
      <section className="why-section">
        <div className="container">
          <SectionHeading
            eyebrow="Why CampusLync"
            title="Student life isn’t one thing. Neither are we."
            text="Connected support for the things that matter, from a tricky research question to a new postcode."
          />
          <div className="why-grid">
            {[
              {
                icon: Layers3,
                title: "One place to turn",
                text: "Worldwide Study and Career support, with specialist London accommodation guidance.",
              },
              {
                icon: Globe2,
                title: "An international outlook",
                text: "Designed for university students and international students around the world.",
              },
              {
                icon: SlidersHorizontal,
                title: "Personal to you",
                text: "Guidance shaped around your needs, priorities and next steps.",
              },
              {
                icon: MessagesSquare,
                title: "A human conversation",
                text: "Space to ask questions and talk through what comes next.",
              },
            ].map((item) => (
              <article key={item.title}>
                <item.icon size={27} strokeWidth={1.5} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <ArtworkPanel
            image="/artwork/global-support.webp"
            alt="Abstract connected globe linking study, career and student living support"
            eyebrow="One connected support system"
            title="Support that travels with you."
            text="Academic and Career support can meet students wherever they study, while specialist Living services begin with London."
          />
        </div>
      </section>
      <ResourcePreview />
      <FAQ />
      <CTA />
      <div className="integrity-note container">
        <p>Support that helps you learn. Work that stays your own.</p>
        <Link href="/academic-integrity">
          Our academic integrity commitment
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </>
  );
}
function BookIcon() {
  return <span className="tiny-square" aria-hidden="true" />;
}
