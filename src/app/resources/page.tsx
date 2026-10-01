import { Hero, ResourceCard, CTA, SectionHeading } from "@/components/ui";
import { downloads, resources } from "@/lib/content";
import { Download } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Student Resources",
  "Upcoming guides covering academic work, research, university careers, international student life and London accommodation.",
  "/resources",
);
export default function Page() {
  return (
    <>
      <Hero
        current="Student Resources"
        eyebrow="The CampusLync reading room"
        title="Useful guidance for what comes next."
        text="A growing international resource library covering academic work, research, careers, student life, accommodation and moving abroad."
        image="/images/resources.webp"
        imageAlt="Student working independently on a laptop in a modern library"
      />
      <section className="section container">
        <SectionHeading
          eyebrow="On our reading list"
          title="Good places to start."
          text="No articles are published yet. Explore the support pages for information about how CampusLync can help today."
        />
        <div className="resource-grid">
          {resources.map((resource, index) => (
            <ResourceCard
              resource={resource}
              index={index}
              key={resource.slug}
            />
          ))}
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading
            eyebrow="Free practical tools"
            title="Checklists you can use now."
            text="Download a concise CampusLync checklist and adapt it to your university, application or move."
          />
          <div className="download-grid">
            {downloads.map((item) => (
              <article className="download-card" key={item.href}>
                <span className="download-icon">
                  <Download size={22} />
                </span>
                <p className="eyebrow">{item.category} / PDF</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a className="text-link" href={item.href} download>
                  Download checklist <Download size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA
        title="Looking for guidance on your own situation?"
        text="Tell us what you’re trying to figure out."
      />
    </>
  );
}
