"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/content";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(
          panel.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
        );
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          trigger.current?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          trigger.current?.focus();
        } else if (document.activeElement === trigger.current) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        }
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1100) setOpen(false);
    };
    window.addEventListener("keydown", keydown);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link
          href="/"
          aria-label="CampusLync home"
          className="brand"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/campuslync.png"
            alt="CampusLync"
            width={2172}
            height={724}
            loading="eager"
            fetchPriority="high"
            sizes="190px"
          />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button nav-cta">
          Get Support
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          ref={trigger}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-panel" id="mobile-navigation" ref={panel}>
          <nav aria-label="Mobile navigation">
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
            <Link
              href="/contact"
              className="button"
              onClick={() => setOpen(false)}
            >
              Get Support
              <ArrowUpRight size={18} />
            </Link>
          </nav>
          <p>Study. Settle. Succeed.</p>
        </div>
      )}
    </header>
  );
}
