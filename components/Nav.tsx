"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line">
      <style>{`
        /* -----------------------------------------------
           JJ LOGO
           A filled circle with the letters cut out
           (the page shows through the letters).

           Hover: the fill becomes a slowly moving, muted
           colour shine. The letters stay cut out.
        ------------------------------------------------ */

        .monogram {
          display: block;
          width: 42px;
          height: 42px;
          overflow: visible;
          transition: filter 300ms ease;
        }

        .monogram-base {
          fill: var(--ink);
        }

        .monogram-shine {
          opacity: 0;
          transition: opacity 250ms ease;
          transform-box: fill-box;
          transform-origin: center;
        }

        .group:hover .monogram {
          filter: drop-shadow(0 0 8px rgba(184, 147, 90, 0.35));
        }

        .group:hover .monogram-shine {
          opacity: 1;
          animation: monogram-spin 4s linear infinite;
        }

        @keyframes monogram-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .group:hover .monogram-shine {
            animation: none;
          }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Jia Jing — Home"
          className="group flex items-center"
        >
          <svg
            className="monogram"
            viewBox="0 0 42 42"
            aria-hidden="true"
          >
            <defs>
              {/* Cut-out: white = visible, black = removed */}
              <mask id="jj-cutout">
                <rect
                  width="42"
                  height="42"
                  fill="white"
                />
                <text
                  x="21"
                  y="21.5"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  fontSize="19"
                  fontWeight="800"
                  letterSpacing="-1.2"
                  style={{
                    fontFamily:
                      'var(--font-sans, system-ui, -apple-system, "Segoe UI", Arial, sans-serif)',
                  }}
                >
                  JJ
                </text>
              </mask>

              <clipPath id="jj-circle">
                <circle cx="21" cy="21" r="21" />
              </clipPath>

              {/* Muted colours that suit the paper / ink theme */}
              <linearGradient
                id="jj-shine"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#b8935a" />
                <stop offset="30%" stopColor="#c9826b" />
                <stop offset="60%" stopColor="#a98aa5" />
                <stop offset="85%" stopColor="#7f9a94" />
                <stop offset="100%" stopColor="#b8935a" />
              </linearGradient>
            </defs>

            <g mask="url(#jj-cutout)">
              {/* Solid ink circle (resting state) */}
              <circle
                className="monogram-base"
                cx="21"
                cy="21"
                r="21"
              />

              {/* Colour shine (fades in on hover) */}
              <g clipPath="url(#jj-circle)">
                <rect
                  className="monogram-shine"
                  x="-11"
                  y="-11"
                  width="64"
                  height="64"
                  fill="url(#jj-shine)"
                />
              </g>
            </g>
          </svg>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-7 text-[13px] tracking-wide">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
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
        <div className="flex items-center gap-4">
          {/* Resume */}
          <a
            href="/resume.pdf"
            download
            className="
              hidden
              sm:inline-flex
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
          <div className="flex items-center gap-4 text-ink-soft">
            {/* GitHub */}
            <a
              href="https://github.com/JiaJing04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-ink transition-colors"
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
              className="hover:text-ink transition-colors"
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
              className="hover:text-ink transition-colors"
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
        </div>
      </div>
    </header>
  );
}