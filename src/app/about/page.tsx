import { Hero, Button, SectionHeading, CheckList, CTA } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About CampusLync",
  "CampusLync brings worldwide academic and career support together with specialist London accommodation assistance for university students.",
  "/about",
);
export default function Page() {
  return (
    <>
      <Hero
        current="About"
        eyebrow="Made for the whole student experience"
        title="Student life doesn’t stop at the classroom."
        text="University can involve academic challenges, research decisions, career questions and the practical work of settling into a new place. CampusLync brings these forms of support together."
        image="/images/student-life.webp"
        imageAlt="A diverse group of university students collaborating in a library"
      >
        <Button href="/contact">Meet Your Next Step</Button>
      </Hero>
      <section className="section container two-column story">
        <div>
          <p className="eyebrow">Why we’re here</p>
          <h2>Different challenges. One place to find support.</h2>
        </div>
        <div>
          <p className="large-copy">
            University students and international students around the world can
            face academic, research and career decisions at the same time.
          </p>
          <p>
            CampusLync brings practical support into one place, so students can
            ask questions, improve their work, consider their options and take a
            manageable next step.
          </p>
          <p>
            Study and Career services are designed for students internationally.
            Accommodation and relocation support is currently focused on London.
          </p>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading
            eyebrow="Study. Settle. Succeed."
            title="Support that meets you where you are."
          />
          <div className="two-column">
            <div className="white-panel">
              <h3>Who we’re here for</h3>
              <CheckList
                items={[
                  "University students and international students worldwide",
                  "Students seeking academic or research guidance",
                  "Undergraduate and postgraduate students",
                  "Graduates considering their next career step",
                  "Students moving to London who need accommodation guidance",
                  "Parents exploring support for a student",
                ]}
              />
            </div>
            <div className="white-panel">
              <h3>What matters to us</h3>
              <CheckList
                items={[
                  "Clear, practical guidance without inflated promises",
                  "Academic integrity and independent learning",
                  "Respect for your choices and circumstances",
                  "Honesty about what our support can and cannot do",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section container association">
        <p className="eyebrow">A connected outlook</p>
        <h2>A CoreLync initiative.</h2>
        <p>
          CampusLync is a student-focused brand associated with CoreLync
          Technologies. Our focus here is simple: practical support for student
          life.
        </p>
        <a
          className="text-link"
          href="https://www.corelync.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore CoreLync Technologies
          <span className="sr-only"> (opens in a new tab)</span> ↗
        </a>
      </section>
      <CTA />
    </>
  );
}
