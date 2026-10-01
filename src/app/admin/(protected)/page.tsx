import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  ExternalLink,
  FileText,
  Inbox,
  Settings2,
} from "lucide-react";
import { deliveryAdapter } from "@/lib/enquiry-delivery";
import { downloads, resources, serviceFaqs } from "@/lib/content";
import { site } from "@/lib/config";
import { databaseConfigured } from "@/lib/database";
import {
  emailNotificationConfigured,
  enquiryStatuses,
  listEnquiries,
  type EnquiryStatus,
} from "@/lib/enquiry-repository";
import { updateEnquiryStatusAction } from "./actions";

export const metadata = {
  title: "Admin Dashboard | CampusLync",
  robots: { index: false, follow: false },
};

const configured = (value: unknown) => Boolean(value);

const statusLabel: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  completed: "Completed",
  closed: "Closed",
};

export default async function Page() {
  let enquiries = [] as Awaited<ReturnType<typeof listEnquiries>>;
  let databaseHealthy = false;
  if (databaseConfigured)
    try {
      enquiries = await listEnquiries();
      databaseHealthy = true;
    } catch {
      databaseHealthy = false;
    }
  const published = resources.filter(
    (resource) => resource.status === "published",
  ).length;
  const checks = [
    ["Production domain", configured(site.url), "NEXT_PUBLIC_SITE_URL"],
    ["Business identity", configured(site.legalName), "BUSINESS_LEGAL_NAME"],
    ["Public email", configured(site.email), "BUSINESS_CONTACT_EMAIL"],
    [
      "Booking calendar",
      configured(site.bookingUrl),
      "NEXT_PUBLIC_BOOKING_URL",
    ],
    ["Enquiry delivery", configured(deliveryAdapter), "Delivery adapter"],
    ["PostgreSQL database", databaseHealthy, "DATABASE_URL / migration"],
    [
      "Email notifications",
      emailNotificationConfigured(),
      "Resend environment variables",
    ],
  ] as const;
  const ready = checks.filter(([, status]) => status).length;

  return (
    <main className="admin-main">
      <div className="admin-welcome">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Admin dashboard</h1>
          <p>
            Real website status, content readiness and integration requirements
            in one place.
          </p>
        </div>
        <Link href="/" className="button button-secondary" target="_blank">
          View website <ExternalLink size={16} />
        </Link>
      </div>

      <div className="admin-stat-grid" aria-label="Website summary">
        <article>
          <Inbox size={21} />
          <span>Enquiries</span>
          <strong>
            {databaseHealthy ? enquiries.length : "Not connected"}
          </strong>
          <small>
            {databaseHealthy
              ? `${enquiries.filter((item) => item.status === "new").length} awaiting review.`
              : "Database connection or migration required."}
          </small>
        </article>
        <article>
          <CalendarDays size={21} />
          <span>Scheduling</span>
          <strong>{site.bookingUrl ? "Connected" : "Not connected"}</strong>
          <small>
            {site.bookingUrl
              ? "External booking link enabled."
              : "Calendar configuration required."}
          </small>
        </article>
        <article>
          <BookOpen size={21} />
          <span>Resource articles</span>
          <strong>{published} published</strong>
          <small>{resources.length - published} marked coming soon.</small>
        </article>
        <article>
          <FileText size={21} />
          <span>Downloads</span>
          <strong>{downloads.length} available</strong>
          <small>PDF student checklists published.</small>
        </article>
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel" id="enquiries">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Support requests</p>
              <h2>Enquiry inbox</h2>
            </div>
            <span
              className={`admin-status ${databaseHealthy ? "ready" : "warning"}`}
            >
              {databaseHealthy ? (
                <CheckCircle2 size={14} />
              ) : (
                <CircleDashed size={14} />
              )}
              {databaseHealthy ? "Live inbox" : "Integration required"}
            </span>
          </div>
          {!databaseHealthy ? (
            <div className="admin-empty">
              <div className="admin-empty-art">
                <Image
                  src="/artwork/global-support.webp"
                  alt=""
                  fill
                  sizes="230px"
                />
              </div>
              <h3>Database setup is incomplete</h3>
              <p>
                Add a PostgreSQL connection and run the supplied migration
                before accepting live enquiries.
              </p>
              <Link href="/contact" className="text-link">
                Open public form <ExternalLink size={15} />
              </Link>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="admin-empty">
              <Inbox size={34} />
              <h3>No enquiries yet</h3>
              <p>
                New support requests will appear here after the public form
                confirms database storage.
              </p>
            </div>
          ) : (
            <div className="admin-enquiry-list">
              {enquiries.map((enquiry) => (
                <article className="admin-enquiry" key={enquiry.id}>
                  <div className="admin-enquiry-top">
                    <div>
                      <span className={`enquiry-status ${enquiry.status}`}>
                        {statusLabel[enquiry.status]}
                      </span>
                      <h3>{enquiry.name}</h3>
                      <p>
                        {enquiry.service} · {enquiry.country} →{" "}
                        {enquiry.studyCountry}
                      </p>
                    </div>
                    <time dateTime={enquiry.createdAt.toISOString()}>
                      {new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Kolkata",
                      }).format(enquiry.createdAt)}{" "}
                      IST
                    </time>
                  </div>
                  <div className="admin-enquiry-details">
                    <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                    {enquiry.phone && (
                      <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
                    )}
                    {enquiry.university && <span>{enquiry.university}</span>}
                    <span>Preferred: {enquiry.contactMethod}</span>
                  </div>
                  <p className="admin-enquiry-message">{enquiry.message}</p>
                  <div className="admin-enquiry-actions">
                    <small>
                      Email notification:{" "}
                      {enquiry.notificationStatus.replaceAll("_", " ")}
                    </small>
                    <form action={updateEnquiryStatusAction}>
                      <input type="hidden" name="id" value={enquiry.id} />
                      <label htmlFor={`status-${enquiry.id}`}>Status</label>
                      <select
                        id={`status-${enquiry.id}`}
                        name="status"
                        defaultValue={enquiry.status}
                      >
                        {enquiryStatuses.map((status) => (
                          <option value={status} key={status}>
                            {statusLabel[status]}
                          </option>
                        ))}
                      </select>
                      <button type="submit">Update</button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="admin-panel admin-readiness" id="configuration">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Launch health</p>
              <h2>
                {ready} of {checks.length} configured
              </h2>
            </div>
            <Settings2 size={22} />
          </div>
          <ul>
            {checks.map(([label, status, key]) => (
              <li key={label}>
                {status ? (
                  <CheckCircle2 className="ready" size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <span>
                  <strong>{label}</strong>
                  <small>{status ? "Configured" : key}</small>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="admin-panel" id="content">
        <div className="admin-panel-heading">
          <div>
            <p className="eyebrow">Website content</p>
            <h2>Content inventory</h2>
          </div>
        </div>
        <div className="admin-content-grid">
          <div>
            <strong>{resources.length}</strong>
            <span>Planned resource articles</span>
            <small>{published} currently published</small>
          </div>
          <div>
            <strong>{downloads.length}</strong>
            <span>Downloadable checklists</span>
            <small>Available on Resources</small>
          </div>
          <div>
            <strong>{Object.values(serviceFaqs).flat().length}</strong>
            <span>Service FAQs</span>
            <small>Across Study, Career and Accommodation</small>
          </div>
          <div>
            <strong>3</strong>
            <span>Core service pillars</span>
            <small>Study, Career and Accommodation</small>
          </div>
        </div>
      </section>

      <section className="admin-panel admin-next-steps">
        <div>
          <p className="eyebrow">Recommended setup order</p>
          <h2>Make the dashboard operational.</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <p>
              <strong>Confirm business settings</strong>Add the legal identity,
              domain and public contact details.
            </p>
          </li>
          <li>
            <span>02</span>
            <p>
              <strong>Connect enquiry delivery</strong>Choose an approved CRM or
              email provider and define retention rules.
            </p>
          </li>
          <li>
            <span>03</span>
            <p>
              <strong>Connect scheduling</strong>Add a confirmed booking URL and
              availability.
            </p>
          </li>
          <li>
            <span>04</span>
            <p>
              <strong>Add a persistent data source</strong>Only then expose
              enquiry records, statuses and assignments here.
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}
