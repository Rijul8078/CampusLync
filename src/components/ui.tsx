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

export function SketchMotif({
  variant,
}: {
  variant: "hero" | "journey" | "study" | "london";
}) {
  return (
    <svg
      className={`sketch-motif sketch-motif-${variant}`}
      viewBox="0 0 320 220"
      aria-hidden="true"
      focusable="false"
    >
      {variant === "hero" && (
        <>
          <path d="M31 156c50-70 91-15 130-62 30-36 71-31 116-4" />
          <path className="sketch-dash" d="M28 166c60-67 102-7 144-56 31-36 68-28 109-5" />
          <path d="m242 52 47 18-39 12-8 32-10-28-24-13 34-21Z" />
          <path d="m44 55 5 11 12 2-9 8 2 12-10-6-11 6 3-12-9-8 12-2 5-11Z" />
          <path d="m91 31 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1 3-7Z" />
        </>
      )}
      {variant === "journey" && (
        <>
          <circle cx="220" cy="95" r="56" />
          <circle cx="220" cy="95" r="42" />
          <path d="m220 48 13 34 34 13-34 13-13 34-13-34-34-13 34-13 13-34Z" />
          <path className="sketch-dash" d="M22 178c58-42 94 15 139-24 29-26 56-27 112-7" />
          <path d="m42 155 18 2-8 16" />
        </>
      )}
      {variant === "study" && (
        <>
          <path d="M42 55c43-18 82-13 116 13v111c-36-24-75-29-116-12V55Z" />
          <path d="M278 55c-43-18-82-13-116 13v111c36-24 75-29 116-12V55Z" />
          <path d="M162 68v111" />
          <path d="m73 88 56 4M73 111l62 5M73 135l48 4M193 91l52-5M191 116l59-6M194 140l42-5" />
          <path d="m242 33 18 9-57 111-24 17 3-29 60-108Z" />
        </>
      )}
      {variant === "london" && (
        <>
          <path className="sketch-dash" d="M35 174c46-74 86-5 132-62 34-42 64-38 112-6" />
          <path d="M36 62 91 26l55 36v88H36V62Z" />
          <path d="M63 150V94h54v56M50 71h82" />
          <path d="M249 61c0 25-31 54-31 54s-31-29-31-54a31 31 0 1 1 62 0Z" />
          <circle cx="218" cy="61" r="11" />
          <path d="m267 157 20 7-16 7-7 18-6-16-15-7 17-5 7-4Z" />
        </>
      )}
    </svg>
  );
}

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
  imageFit = "contain",
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  reverse?: boolean;
  imageFit?: "contain" | "cover";
}) {
  return (
    <section className={`artwork-panel ${reverse ? "reverse" : ""}`}>
      <div className={`artwork-image artwork-image-${imageFit}`}>
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
              loading="eager"
              fetchPriority="high"
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
      <SketchMotif variant="journey" />
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
  return (
    <article className="resource-card">
      <div className={`resource-art resource-art-${index % 4}`}>
        <Image
          src={resource.image}
          alt={resource.imageAlt}
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
