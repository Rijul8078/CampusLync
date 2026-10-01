import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  House,
  Compass,
  Plane,
  GraduationCap,
  Check,
  MoveUpRight,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  services,
  resources,
  journey,
  type Service,
  type Resource,
} from "@/lib/content";

export function Button({
  href,
  children,
  secondary = false,
  light = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""} ${light ? "button-light" : ""} ${className}`}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {text && <p className="section-description">{text}</p>}
      </div>
      {children}
    </div>
  );
}
export function ArtworkPanel({
  image,
  alt,
  eyebrow,
  title,
  text,
  reverse = false,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  reverse?: boolean;
}) {
  return (
    <section className={`artwork-panel ${reverse ? "reverse" : ""}`}>
      <div className="artwork-image">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 800px) calc(100vw - 72px), 560px"
        />
      </div>
      <div className="artwork-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  );
}
export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <Link href="/">Home</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
export function Hero({
  eyebrow,
  title,
  text,
  current,
  children,
  image,
  imageAlt,
  imagePosition = "center",
}: {
  eyebrow: string;
  title: string;
  text: string;
  current: string;
  children?: ReactNode;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs current={current} />
        <div className="page-hero-inner">
          <div>
            <p className="eyebrow">
              <span className="small-dot" />
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <p className="hero-description">{text}</p>
            {children}
          </div>
          <div className="page-hero-image">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 800px) calc(100vw - 40px), 360px"
              style={{ objectPosition: imagePosition }}
              loading={current === "Study Support" ? "eager" : "lazy"}
              fetchPriority={current === "Study Support" ? "high" : "auto"}
            />
            <span>{current}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export const serviceIcons = {
  study: BookOpen,
  career: BriefcaseBusiness,
  accommodation: House,
};
export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = serviceIcons[service.key];
  return (
    <article className={`service-card ${service.key}`}>
      <div className="card-top">
        <span className="icon-tile">
          <Icon size={26} strokeWidth={1.6} />
        </span>
        <span className="card-number">0{index + 1}</span>
      </div>
      <div className="service-label-row">
        <p className="eyebrow">{service.label}</p>
        <span className="availability-badge">
          {service.key === "accommodation" ? "London" : "Worldwide"}
        </span>
      </div>
      <h3>{service.headline}</h3>
      <p>{service.description}</p>
      <Link className="text-link" href={service.href}>
        {service.cta}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}
export function Services() {
  return (
    <section className="section container" id="services">
      <SectionHeading
        eyebrow="A little support goes a long way"
        title="Support for every part of student life."
        text="One place to turn. Wherever you are in your university experience."
      />
      <div className="service-grid">
        {services.map((service, index) => (
          <ServiceCard key={service.key} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
export function CTA({
  title = "Whatever stage of student life you’re at, you don’t have to navigate it alone.",
  text = "Let’s work out your next step, together.",
  label = "Talk to CampusLync",
  href = "/contact",
}: {
  title?: string;
  text?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="container cta-wrap">
      <div className="cta">
        <div>
          <p className="eyebrow">Your next step starts here</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Button href={href} light>
          {label}
        </Button>
        <div className="cta-rings" aria-hidden="true" />
      </div>
    </section>
  );
}
export function ProcessSteps() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="Simple from the start"
        title="A conversation. A plan. A way forward."
        text="Getting support shouldn’t be another thing to figure out."
      />
      <div className="process-grid">
        {[
          {
            title: "Tell us what you need",
            text: "A question, a challenge or a plan for what comes next. Start wherever you are.",
          },
          {
            title: "Speak with CampusLync",
            text: "We’ll discuss your situation and the kind of guidance that could help.",
          },
          {
            title: "Get personalised support",
            text: "Agree on practical next steps, with support built around your needs.",
          },
        ].map((step, i) => (
          <article key={step.title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <div className="center-action">
        <Button href="/contact" secondary>
          Get Started
        </Button>
      </div>
    </section>
  );
}
const journeyIcons = [
  Compass,
  Plane,
  House,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
];
export function StudentJourney() {
  return (
    <section className="section journey-section">
      <div className="container">
        <SectionHeading
          eyebrow="Support throughout your student journey"
          title="From choosing your path to what comes next."
          text="Study and Career support can meet you wherever you are in your university experience."
        />
        <ol className="journey">
          {journey.map((step, i) => {
            const Icon = journeyIcons[i];
            return (
              <li key={step.title}>
                <span className="journey-icon">
                  <Icon size={23} strokeWidth={1.6} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
export function ResourceCard({
  resource,
  index,
}: {
  resource: Resource;
  index: number;
}) {
  const artwork =
    resource.category === "Career"
      ? "/artwork/career-progression.webp"
      : resource.category === "Accommodation" ||
          resource.category === "Moving Abroad"
        ? "/artwork/london-living.webp"
        : resource.category === "Student Life"
          ? "/artwork/global-support.webp"
          : "/artwork/academic-development.webp";
  return (
    <article className="resource-card">
      <div className={`resource-art resource-art-${index % 4}`}>
        <Image
          src={artwork}
          alt=""
          fill
          sizes="(max-width: 580px) 50vw, 300px"
        />
        <div className="resource-art-shade" aria-hidden="true" />
        <span>THE CAMPUSLYNC GUIDES</span>
      </div>
      <div className="resource-copy">
        <p className="eyebrow">{resource.category}</p>
        <h3>{resource.title}</h3>
        {resource.status === "published" ? (
          <Link className="text-link" href={`/resources/${resource.slug}`}>
            Read guide
            <ArrowRight size={16} />
          </Link>
        ) : (
          <span className="coming-soon">
            Guide coming soon
            <MoveUpRight size={14} aria-hidden="true" />
          </span>
        )}
      </div>
    </article>
  );
}
export function ResourcePreview() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="Good questions. Useful guidance."
        title="A little reading for the road ahead."
      >
        <Link className="text-link" href="/resources">
          All resources
          <ArrowUpRight size={18} />
        </Link>
      </SectionHeading>
      <div className="resource-grid">
        {resources.slice(0, 4).map((resource, index) => (
          <ResourceCard key={resource.slug} resource={resource} index={index} />
        ))}
      </div>
    </section>
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={18} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
