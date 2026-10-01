import { Hero, CheckList, CTA } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Academic Integrity",
  "Our commitment to ethical tutoring, mentoring and academic guidance. Students retain authorship and responsibility for all submitted work.",
  "/academic-integrity",
);
export default function Page() {
  return (
    <>
      <Hero
        current="Academic Integrity"
        eyebrow="Learning comes first"
        title="Support for your learning. Ownership of your work."
        text="CampusLync provides legitimate academic guidance. We help you understand, practise and improve—not outsource your education."
        image="/images/study.webp"
        imageAlt="University student developing her own work in a library"
      />
      <section className="section container prose">
        <h2>Our commitment</h2>
        <p>
          Our academic services are designed to develop your skills and
          understanding. You remain the author of your work and are responsible
          for everything you submit, including its accuracy, sources and
          compliance with your institution’s rules.
        </p>
        <h2>Support we can provide</h2>
        <CheckList
          items={[
            "Tutoring and explanations that build understanding",
            "Feedback on structure, clarity and academic skills",
            "Guidance on finding and evaluating research sources",
            "Proofreading, editing and formatting within institutional rules",
            "Mentoring on planning and managing your own project",
          ]}
        />
        <h2>Work we will not undertake</h2>
        <p>
          We do not write assignments, dissertations or assessed coursework for
          submission on a student’s behalf. We do not sit exams, impersonate
          students, fabricate research or references, complete assessed tasks,
          or help conceal unauthorised assistance. We do not offer
          contract-cheating services or promise grades.
        </p>
        <h2>Check the rules before seeking support</h2>
        <p>
          Different universities, courses and assessments permit different
          levels of assistance. Check your assessment brief and institutional
          policy, and ask your tutor or supervisor if you are unsure. Share
          relevant restrictions before any support is agreed. If a request
          conflicts with those rules, it must be declined or limited to
          permitted guidance.
        </p>
        <h2>Proofreading and editing</h2>
        <p>
          Some assessments restrict proofreading or editing. Where assistance is
          permitted, its scope must be agreed in advance. Feedback must preserve
          your ideas and authorship. You decide which suggestions to use and
          acknowledge assistance if your institution requires it.
        </p>
        <h2>Your responsibility</h2>
        <p>
          Keep records of feedback where appropriate, check every change and
          citation, and submit only work you understand and can explain. Our
          guidance does not replace the requirements of your university.
        </p>
      </section>
      <CTA
        title="Build your skills with the right support."
        label="Explore Study Support"
        href="/study"
      />
    </>
  );
}
