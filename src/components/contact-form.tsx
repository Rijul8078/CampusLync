"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle, Info, CheckCircle2 } from "lucide-react";
import {
  enquirySchema,
  validationErrors,
  serviceOptions,
  contactMethods,
  type EnquiryErrors,
  type SubmissionResult,
} from "@/lib/enquiries";
export function ContactForm({
  initialService,
  initialMessage,
  available,
}: {
  initialService?: string;
  initialMessage?: string;
  available: boolean;
}) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [method, setMethod] = useState("Email");
  const summary = useRef<HTMLDivElement>(null);
  const focusSummary = () =>
    requestAnimationFrame(() => summary.current?.focus());
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    const input = Object.fromEntries(data.entries());
    const parsed = enquirySchema.safeParse({
      ...input,
      consent: data.get("consent") === "on",
    });
    setResult(null);
    if (!parsed.success) {
      setErrors(validationErrors(parsed.error));
      focusSummary();
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(15000),
      });
      const payload: SubmissionResult = await response.json();
      if (payload.status === "sent" && !response.ok)
        throw new Error("Invalid success response");
      setResult(payload);
      if (payload.status === "invalid") setErrors(payload.errors);
      focusSummary();
    } catch {
      setResult({
        status: "error",
        message:
          "We could not confirm delivery. Check your connection and try again later.",
      });
      focusSummary();
    } finally {
      setPending(false);
    }
  }
  const field = (
    name:
      "name" | "email" | "phone" | "university" | "country" | "studyCountry",
    label: string,
    placeholder: string,
    autoComplete: string,
    required = false,
  ) => (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
        {!required && <span> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        maxLength={
          name === "email"
            ? 254
            : name === "phone"
              ? 40
              : name === "university"
                ? 200
                : 100
        }
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span id={`${name}-error`} className="field-error">
          {errors[name]}
        </span>
      )}
    </div>
  );
  if (result?.status === "sent")
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={summary}>
        <CheckCircle2 size={42} />
        <h2>Thank you for reaching out.</h2>
        <p>{result.message}</p>
        <Link href="/" className="text-link">
          Back to CampusLync
          <ArrowUpRight size={17} />
        </Link>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <h2>Tell us what you need.</h2>
        <p>A little context helps us understand where to start.</p>
      </div>
      {!available && (
        <div className="form-notice">
          <Info size={20} />
          <p>
            <strong>Online enquiries are not open yet.</strong> You can explore
            this form, but your request will not be sent or saved while delivery
            is unavailable.
          </p>
        </div>
      )}
      <div
        ref={summary}
        tabIndex={-1}
        className={
          Object.keys(errors).length || result ? "form-feedback" : "sr-only"
        }
        role="status"
        aria-live="polite"
      >
        {Object.keys(errors).length > 0 ? (
          <>
            <strong>Please check the following fields:</strong>
            <ul>
              {Object.entries(errors).map(([key, message]) => (
                <li key={key}>
                  <a href={`#${key}`}>{message}</a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          result?.message
        )}
      </div>
      <div className="form-grid">
        {field("name", "Name", "Your full name", "name", true)}
        {field("email", "Email", "you@example.com", "email", true)}
        {field(
          "phone",
          "Phone / WhatsApp",
          "Include your country code",
          "tel",
          method !== "Email",
        )}
        {field(
          "university",
          "University",
          "Your university or institution",
          "organization",
        )}
        {field(
          "country",
          "Current country",
          "Where are you based?",
          "country-name",
          true,
        )}
        {field(
          "studyCountry",
          "Country of study",
          "Where do you study?",
          "country-name",
          true,
        )}
        <div className="form-field">
          <label htmlFor="service">Service needed</label>
          <select
            id="service"
            name="service"
            defaultValue={
              serviceOptions.includes(
                initialService as (typeof serviceOptions)[number],
              )
                ? initialService
                : ""
            }
            required
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.service && (
            <span id="service-error" className="field-error">
              {errors.service}
            </span>
          )}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          defaultValue={initialMessage}
          rows={5}
          placeholder="Tell us a little about your situation and the support you’re looking for…"
          maxLength={5000}
          required
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "message-help message-error" : "message-help"
          }
        />
        <span className="field-help" id="message-help">
          Please don’t include passwords, payment details or sensitive
          documents.
        </span>
        {errors.message && (
          <span id="message-error" className="field-error">
            {errors.message}
          </span>
        )}
      </div>
      <fieldset className="contact-method">
        <legend>Preferred contact method</legend>
        <div>
          {contactMethods.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="contactMethod"
                value={option}
                checked={method === option}
                onChange={() => setMethod(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="consent">
        <label htmlFor="consent">
          <input
            id="consent"
            type="checkbox"
            name="consent"
            required
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree to the <Link href="/privacy">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && (
          <span className="field-error" id="consent-error">
            {errors.consent}
          </span>
        )}
      </div>
      <button className="button submit-button" type="submit" disabled={pending}>
        {pending ? "Checking your request…" : "Request Support"}
        {pending ? (
          <LoaderCircle className="spinner" size={17} />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </button>
      <p className="form-footnote">
        Your details stay in this form unless you submit it. Delivery is
        currently unavailable.
      </p>
    </form>
  );
}
