"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const dismissOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const dismissOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    desktop.addEventListener("change", dismissOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
      desktop.removeEventListener("change", dismissOnDesktop);
    };
  }, [mobileMenuOpen]);

  return (
    <header ref={headerRef} className="bg-paper border-b border-line">
      <div className="max-w-[1200px] min-h-[84px] mx-auto px-6 sm:px-10 lg:px-12 py-4 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Avatar */}
        <Link
          href="/"
          aria-label="Jia Jing — Home"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex shrink-0 items-center justify-self-start rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <span
            aria-hidden="true"
            className="block h-[52px] w-[42px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:-rotate-3 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Image
              src="/logo.png"
              alt=""
              width={973}
              height={1369}
              sizes="42px"
              priority
              className="h-full w-full object-contain [clip-path:inset(0_0_12%_0)]"
            />
          </span>
        </Link>

        {/* Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7 text-[13px] tracking-wide">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`uppercase pb-0.5 border-b ${
                  active
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-soft hover:text-ink hover:border-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4 justify-self-end">
          {/* Resume */}
          <a
            href="/resume.pdf"
            download
            className="
              hidden
              md:inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-line
              px-3
              py-1.5
              text-[11px]
              uppercase
              tracking-[0.1em]
              text-ink-soft
              transition
              hover:border-ink
              hover:text-ink
            "
          >
            Resume
            <span className="text-[12px]">↓</span>
          </a>

          {/* Social links */}
          <div className="flex items-center gap-1 md:gap-4 text-ink-soft">
            {/* GitHub */}
            <a
              href="https://github.com/JiaJing04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 md:h-auto md:w-auto items-center justify-center hover:text-ink transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.252-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 7.07c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.395.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.31.678.921.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.579.688.481A10.003 10.003 0 0 0 22 12c0-5.523-4.477-10-10-10Z"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jiajinghew/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 md:h-auto md:w-auto items-center justify-center hover:text-ink transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V8.997h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.289ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.559 8.997h3.558v11.455H3.559V8.997Z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:jiajinghew@gmail.com"
              aria-label="Email"
              className="inline-flex h-11 w-11 md:h-auto md:w-auto items-center justify-center hover:text-ink transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                />
                <path d="m3 6 9 7 9-7" />
              </svg>
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink md:hidden hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d={mobileMenuOpen ? "m6 6 12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!mobileMenuOpen}
        className="border-t border-line md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {[{ href: "/", label: "Home" }, ...links].map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex min-h-11 items-center rounded-lg px-3 py-3 text-[13px] uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  active
                    ? "bg-card text-ink"
                    : "text-ink-soft hover:bg-card hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="/resume.pdf"
            download
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-flex min-h-11 items-center justify-between rounded-lg border border-line px-3 py-3 text-[12px] uppercase tracking-[0.1em] text-ink-soft hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Download résumé
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
