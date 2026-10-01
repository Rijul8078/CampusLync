import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/config";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="CampusLync home">
              <Image
                src="/campuslync.png"
                alt="CampusLync"
                width={2172}
                height={724}
                sizes="205px"
              />
            </Link>
            <p className="footer-tagline">Study. Settle. Succeed.</p>
            <p>Supporting students, wherever they study.</p>
            <address className="footer-contact">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phone}`}>{site.phone}</a>
            </address>
          </div>
          {[
            {
              heading: "Study",
              links: [
                ["Academic Support", "/study"],
                ["Assignment Support", "/study"],
                ["Dissertation Support", "/study"],
                ["Research Support", "/study"],
                ["Proofreading & Editing", "/study"],
              ],
            },
            {
              heading: "Career",
              links: [
                ["CV / Resume", "/career"],
                ["Career Guidance", "/career"],
                ["Interview Preparation", "/career"],
                ["Job Search Support", "/career"],
              ],
            },
            {
              heading: "Living",
              links: [
                ["London Accommodation", "/accommodation"],
                ["Moving to London", "/moving-to-london"],
                ["Relocation Support", "/moving-to-london"],
              ],
            },
            {
              heading: "Company",
              links: [
                ["About", "/about"],
                ["Resources", "/resources"],
                ["Contact", "/contact"],
                ["Request a Consultation", "/book"],
                ["Academic Integrity", "/academic-integrity"],
                ["Privacy", "/privacy"],
                ["Terms", "/terms"],
              ],
            },
          ].map((column) => (
            <div className="footer-column" key={column.heading}>
              <h2>{column.heading}</h2>
              {column.links.map(([label, href]) => (
                <Link href={href} key={`${label}-${href}`}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <p className="footer-availability">
          Study and Career support available internationally. Accommodation
          support currently available in London.
        </p>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CampusLync.</p>
          <a
            href="https://www.corelync.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            A CoreLync initiative.
            <span className="sr-only"> Opens in a new tab</span>
          </a>
          <p>Made for your next chapter.</p>
        </div>
      </div>
    </footer>
  );
}
