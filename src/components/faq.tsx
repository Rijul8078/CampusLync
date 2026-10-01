import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
type FAQItem = { question: string; answer: string };
export function FAQ({
  items = faqs,
  title = "Good questions. Straight answers.",
  eyebrow = "A few things you might be wondering",
  id = "faqs",
}: {
  items?: FAQItem[];
  title?: string;
  eyebrow?: string;
  id?: string;
}) {
  return (
    <section className="section container faq-section" id={id}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-description">
          A little clarity before you take the next step.
        </p>
      </div>
      <div className="faq-list">
        {items.map((faq) => (
          <details key={faq.question}>
            <summary>
              {faq.question}
              <Plus size={19} aria-hidden="true" />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
