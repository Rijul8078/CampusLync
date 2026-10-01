"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, MessageSquareText, X } from "lucide-react";
import { serviceOptions } from "@/lib/enquiries";

export function QuickEnquiry() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("select")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (event.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>(
        'button, a, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open]);

  function continueToForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = new URLSearchParams({
      service: String(data.get("quick-service") || "Other"),
      message: String(data.get("quick-message") || ""),
    });
    setOpen(false);
    router.push(`/contact?${query.toString()}`);
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="quick-enquiry-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageSquareText size={20} aria-hidden="true" />
        <span>Quick enquiry</span>
      </button>
      {open && (
        <div
          className="quick-enquiry-backdrop"
          onMouseDown={() => setOpen(false)}
        >
          <div
            ref={panel}
            className="quick-enquiry-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-enquiry-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="quick-enquiry-close"
              onClick={() => setOpen(false)}
              aria-label="Close quick enquiry"
            >
              <X size={20} />
            </button>
            <p className="eyebrow">Start here</p>
            <h2 id="quick-enquiry-title">What can we help with?</h2>
            <p>
              Choose a service and add a short note. We’ll carry these details
              into the complete support form.
            </p>
            <form onSubmit={continueToForm}>
              <label htmlFor="quick-service">Service</label>
              <select
                id="quick-service"
                name="quick-service"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <label htmlFor="quick-message">
                What would you like help with?
              </label>
              <textarea
                id="quick-message"
                name="quick-message"
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                placeholder="A brief description is enough…"
              />
              <button className="button" type="submit">
                Continue to form <ArrowRight size={17} />
              </button>
            </form>
            <a className="quick-book-link" href="/book">
              <CalendarDays size={17} /> Request a consultation instead
            </a>
            <small>No details are sent from this panel.</small>
          </div>
        </div>
      )}
    </>
  );
}
