import { MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  ArtworkPanel,
  Hero,
  Button,
  SectionHeading,
  CTA,
  ResourceCard,
} from "@/components/ui";
import { londonSteps, resources } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Moving to London for University",
  "Plan your student move to London, from comparing areas and preparing accommodation to settling in, academic support and career preparation.",
  "/moving-to-london",
);
export default function Page() {
  return (
    <>
      <Hero
        current="Moving to London"
        eyebrow="London living / a considered start"
        title="New city. New chapter. A little support."
        text="Moving to London for university brings a lot of firsts. Bring the practical pieces together with guidance for before you leave, when you arrive and as you settle in."
        image="/images/london.webp"
        imageAlt="The Houses of Parliament and Big Ben beside the River Thames in London"
      >
        <Button href="/contact?service=Moving%20to%20London">
          Plan Your Move
        </Button>
      </Hero>
      <section className="section container">
        <SectionHeading
          eyebrow="From planning to belonging"
          title="Take London one step at a time."
          text="You don’t have to solve everything at once. Start with the essentials and build from there."
        />
        <div className="london-guide-grid">
          <aside className="guide-sidebar">
            <MapPin size={34} strokeWidth={1.4} />
            <h3>Your London checklist</h3>
            <nav aria-label="Moving guide sections">
              {londonSteps.map((step, i) => (
                <a href={`#london-step-${i + 1}`} key={step.title}>
                  <span>0{i + 1}</span>
                  {step.title}
                </a>
              ))}
            </nav>
          </aside>
          <div className="london-guide-steps">
            {londonSteps.map((step, i) => (
              <article id={`london-step-${i + 1}`} key={step.title}>
                <span className="step-number">0{i + 1}</span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.description}</p>
                  {i === 3 && (
                    <Link className="text-link" href="/accommodation">
                      Explore accommodation assistance
                      <ArrowUpRight size={16} />
                    </Link>
                  )}
                  {i === 7 && (
                    <Link className="text-link" href="/study">
                      Explore study support
                      <ArrowUpRight size={16} />
                    </Link>
                  )}
                  {i === 8 && (
                    <Link className="text-link" href="/career">
                      Explore career support
                      <ArrowUpRight size={16} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
        <ArtworkPanel
          image="/artwork/london-living.webp"
          alt="Abstract student relocation scene with a home, luggage, route and London skyline"
          eyebrow="Plan the practical journey"
          title="Arrive with fewer unknowns."
          text="A clear plan can connect your accommodation search, travel, first-week essentials and university start."
          reverse
        />
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading
            eyebrow="The London reading list"
            title="More local guidance is on its way."
            text="These guides are being planned. They’ll appear here when they’re ready to read."
          />
          <div className="resource-grid two-resources">
            {resources
              .filter(
                (resource) =>
                  resource.category === "Accommodation" ||
                  resource.category === "Moving Abroad",
              )
              .map((resource, index) => (
                <ResourceCard
                  key={resource.slug}
                  resource={resource}
                  index={index}
                />
              ))}
          </div>
          <p className="fine-print">
            Practical planning support only. CampusLync does not provide
            immigration or regulated legal advice. Check official sources and
            your university for requirements that apply to you.
          </p>
        </div>
      </section>
      <CTA
        title="A new city can start with a simple conversation."
        label="Request Moving Support"
        href="/contact?service=Moving%20to%20London"
      />
    </>
  );
}
