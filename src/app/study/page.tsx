import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import {
  ArtworkPanel,
  Button,
  CTA,
  CheckList,
  Hero,
  SectionHeading,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { FAQ } from "@/components/faq";
import { serviceFaqs } from "@/lib/content";

export const metadata = pageMetadata(
  "Academic, Assignment & Dissertation Support",
  "Worldwide end-to-end assignment development and academic writing support, including research, dissertation mentoring, tutoring, detailed feedback, proofreading and editing.",
  "/study",
);

const groups = [
  {
    icon: BookOpen,
    title: "Academic Support",
    text: "Practical guidance to develop and improve your own university work.",
    items: [
      "End-to-end assignment development",
      "Coursework planning and support",
      "Academic writing support",
      "Structure and argument development",
      "Detailed draft feedback",
      "Proofreading & editing",
      "Referencing & formatting",
      "Originality and citation review",
    ],
  },
  {
    icon: GraduationCap,
    title: "Research & Dissertation Support",
    text: "Structured mentoring from the first research question through presentation.",
    items: [
      "Research topic development",
      "Literature review guidance",
      "Research methodology",
      "Dissertation planning",
      "Structure and argument development",
      "Supervisor-feedback interpretation",
      "Editing and proofreading",
      "Presentation or viva preparation where appropriate",
    ],
  },
  {
    icon: BookOpen,
    title: "Tutoring & Mentoring",
    text: "One-to-one support built around your subject, skills and study goals.",
    items: [
      "Subject tutoring",
      "1-to-1 guidance",
      "Study planning",
      "Academic skills",
      "Project mentoring",
    ],
  },
  {
    icon: FlaskConical,
    title: "Research Support",
    text: "Academic consultancy for planning, methods and communicating research.",
    items: [
      "Research planning",
      "Source-finding strategies",
      "Methodology guidance",
      "Data-analysis guidance where appropriate",
      "Academic presentation guidance",
    ],
  },
];

export default function Page() {
  return (
    <>
      <Hero
        current="Study Support"
        eyebrow="Academic support / available worldwide"
        title="Study with clarity and confidence."
        text="Academic consultancy, tutoring and mentoring for university students around the world. Develop your ideas, strengthen your skills and improve work that remains your own."
        image="/images/study.webp"
        imageAlt="University student working on a laptop with books in a library"
      >
        <Button href="/contact?service=Academic%20Support">
          Request Academic Support
        </Button>
      </Hero>
      <section className="section container">
        <SectionHeading
          eyebrow="Study support / built around you"
          title="Comprehensive support throughout your assignment."
          text="Work through the complete development process—from understanding the brief and planning research to improving structure, reviewing drafts, editing, referencing and final preparation."
        />
        <div className="study-group-grid">
          {groups.map((group, index) => (
            <article className="study-group-card" key={group.title}>
              <div className="detail-card-top">
                <group.icon size={27} strokeWidth={1.5} />
                <span>0{index + 1}</span>
              </div>
              <h2>{group.title}</h2>
              <p>{group.text}</p>
              <CheckList items={group.items} />
            </article>
          ))}
        </div>
        <ArtworkPanel
          image="/artwork/academic-development.webp"
          alt="Abstract academic workflow progressing from initial notes through research to a refined document"
          eyebrow="From first brief to final review"
          title="Build the work, step by step."
          text="Bring planning, research, structure, feedback, editing and presentation into one clear development process."
          reverse
        />
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading
            eyebrow="Academic integrity"
            title="Detailed support from first brief to final review."
            text="CampusLync can provide substantial academic consultancy, tutoring, editing, feedback, research guidance and mentoring."
          />
          <div className="two-column">
            <div className="white-panel">
              <h3>How we support you</h3>
              <CheckList
                items={[
                  "Explain concepts and help you develop academic skills",
                  "Support assignments, coursework, research and dissertations from planning through final review",
                  "Give detailed section-by-section feedback on drafts and plans",
                  "Proofread and edit within your institution’s rules",
                  "Help you interpret feedback and plan improvements",
                  "Review originality, source use, citations and referencing",
                ]}
              />
            </div>
            <div className="white-panel">
              <h3>Your role in the process</h3>
              <p>
                You stay involved throughout the process and remain responsible
                for the ideas, decisions, accuracy, authorship and final version
                of the work you submit.
              </p>
              <p>
                Support must follow your institution’s rules, including any
                requirements to disclose assistance.
              </p>
            </div>
          </div>
          <div className="notice">
            <ShieldCheck size={24} />
            <p>
              Read the full{" "}
              <Link href="/academic-integrity">
                Academic Integrity statement
              </Link>{" "}
              before requesting support.
            </p>
          </div>
        </div>
      </section>
      <FAQ
        items={serviceFaqs.study}
        eyebrow="Study support FAQs"
        title="Questions about academic support."
        id="study-faqs"
      />
      <CTA
        title="Tell us what you’re studying and where you need guidance."
        text="Academic support is available internationally."
        label="Request Academic Support"
        href="/contact?service=Academic%20Support"
      />
    </>
  );
}
