"use client";

import type { ComponentProps, ComponentType } from "react";

import JavaOriginalIcon from "react-devicons/java/original";
import PythonOriginalIcon from "react-devicons/python/original";
import JavascriptOriginalIcon from "react-devicons/javascript/original";
import SpringOriginalIcon from "react-devicons/spring/original";
import ReactOriginalIcon from "react-devicons/react/original";
import NextjsOriginalIcon from "react-devicons/nextjs/original";
import MysqlOriginalIcon from "react-devicons/mysql/original";
import FirebaseOriginalIcon from "react-devicons/firebase/original";
import GitOriginalIcon from "react-devicons/git/original";
import GithubOriginalIcon from "react-devicons/github/original";
import JiraOriginalIcon from "react-devicons/jira/original";
import PostmanOriginalIcon from "react-devicons/postman/original";
import Html5OriginalIcon from "react-devicons/html5/original";
import Css3OriginalIcon from "react-devicons/css3/original";
import MongodbOriginalIcon from "react-devicons/mongodb/original";
import PostgresqlOriginalIcon from "react-devicons/postgresql/original";

/* =========================================================
   GENERIC ICON TYPES
   Used only for concepts that don't have a specific logo.
========================================================= */

type GenericIconType =
  | "sql"
  | "microservices"
  | "api"
  | "cicd"
  | "agile";

/*
  FIX: `aria-hidden` is typed as Booleanish (boolean | "true" | "false")
  by the library. Borrowing the type from React's own SVG props keeps
  it in sync, so the icon components are assignable.
*/
type BrandIcon = ComponentType<{
  size?: string | number;
  className?: string;
  "aria-hidden"?: ComponentProps<"svg">["aria-hidden"];
}>;

type Skill = readonly [
  string,
  BrandIcon | GenericIconType
];

/* =========================================================
   GENERIC ICONS
========================================================= */

function GenericIcon({
  type,
}: {
  type: GenericIconType;
}) {
  const common = {
    width: 27,
    height: 27,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "sql") {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </svg>
    );
  }

  if (type === "microservices") {
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="6" height="6" rx="1" />
        <rect x="14.5" y="4" width="6" height="6" rx="1" />
        <rect x="3.5" y="14" width="6" height="6" rx="1" />
        <rect x="14.5" y="14" width="6" height="6" rx="1" />
        <path d="M9.5 7h5" />
        <path d="M9.5 17h5" />
        <path d="M6.5 10v4" />
        <path d="M17.5 10v4" />
      </svg>
    );
  }

  if (type === "api") {
    return (
      <svg {...common}>
        <path d="M8 8l-4 4 4 4" />
        <path d="M16 8l4 4-4 4" />
        <path d="M14 4l-4 16" />
      </svg>
    );
  }

  if (type === "cicd") {
    return (
      <svg {...common}>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />

        <path d="M8 6h6a4 4 0 0 1 4 4" />
        <path d="M6 8v6a4 4 0 0 0 4 4h6" />

        <path d="M15 16l3 2-3 2" />
      </svg>
    );
  }

  if (type === "agile") {
    return (
      <svg {...common}>
        <path d="M5 7h9" />
        <path d="M5 12h14" />
        <path d="M5 17h9" />

        <path d="M17 5l2 2-2 2" />
        <path d="M7 15l-2 2 2 2" />
      </svg>
    );
  }

  return null;
}

/* =========================================================
   SKILL ICON
========================================================= */

function SkillIcon({
  icon,
}: {
  icon: BrandIcon | GenericIconType;
}) {
  if (typeof icon === "function") {
    const Icon = icon;

    return (
      <Icon
        size={27}
        className="skill-icon"
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className="skill-icon-wrapper"
      aria-hidden="true"
    >
      <GenericIcon type={icon} />
    </span>
  );
}

/* =========================================================
   SKILLS
========================================================= */

const skillsRow1: Skill[] = [
  ["Java", JavaOriginalIcon],
  ["Python", PythonOriginalIcon],
  ["JavaScript", JavascriptOriginalIcon],
  ["Spring Boot", SpringOriginalIcon],
  ["React.js", ReactOriginalIcon],
  ["Next.js", NextjsOriginalIcon],
  ["MySQL", MysqlOriginalIcon],
];

const skillsRow2: Skill[] = [
  ["SQL", "sql"],
  ["Microservices", "microservices"],
  ["REST APIs", "api"],
  ["Firebase", FirebaseOriginalIcon],
  ["Git", GitOriginalIcon],
  ["Jira", JiraOriginalIcon],
];

const skillsRow3: Skill[] = [
  ["Postman", PostmanOriginalIcon],
  ["HTML", Html5OriginalIcon],
  ["CSS", Css3OriginalIcon],
  ["GitHub", GithubOriginalIcon],
  ["MongoDB", MongodbOriginalIcon],
  ["CI/CD", "cicd"],
  ["Agile", "agile"],
];

/* =========================================================
   SKILL MARQUEE
========================================================= */

function SkillMarquee({
  skills,
  direction = "left",
  speed = "normal",
}: {
  skills: Skill[];
  direction?: "left" | "right";
  speed?: "normal" | "slow";
}) {
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div
      className={`skill-marquee ${
        direction === "right"
          ? "skill-marquee-right"
          : speed === "slow"
            ? "skill-marquee-left-slow"
            : "skill-marquee-left"
      }`}
    >
      <div className="skill-marquee-track">
        {duplicatedSkills.map(([skill, icon], index) => (
          <div
            className="skill-item"
            key={`${skill}-${index}`}
          >
            <SkillIcon icon={icon} />

            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function About() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-16">

      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section>
        <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-start">

          {/* About text */}

          <div className="pt-1">
            <h1 className="font-serif italic text-[32px] mb-8">
              About
            </h1>

            <div className="space-y-4 text-[15px] leading-relaxed max-w-[58ch]">
              <p>
                I&apos;m a Computer Science graduate from
                Monash University Malaysia, interested in
                building software that is practical, reliable,
                and thoughtfully designed.
              </p>

              <p>
                I enjoy working across the stack, but I&apos;m
                particularly drawn to what happens behind the
                scenes — backend services, distributed systems,
                APIs, and the little details that make everything
                work together.
              </p>

              <p>
                I&apos;m always curious about how things work,
                and I like turning that curiosity into something
                I can actually build.
              </p>
            </div>
          </div>

          {/* =================================================
              INSTAX PHOTO
          ================================================== */}

          <div className="md:pt-4 flex justify-center md:justify-end">
            <div className="relative rotate-[3deg] hover:rotate-0 transition-transform duration-300">

              {/* Tape */}

              <div
                className="
                  absolute
                  -top-3
                  left-1/2
                  -translate-x-1/2
                  w-[62px]
                  h-[18px]
                  bg-white/70
                  rotate-[-4deg]
                  shadow-sm
                  z-10
                "
              />

              {/* Instax frame */}

              <div
                className="
                  relative
                  bg-[#f8f7f3]
                  p-[12px]
                  pb-[52px]
                  w-[250px]
                  shadow-[0_6px_18px_rgba(0,0,0,0.15)]
                "
              >

                {/* Photo */}

                <div className="aspect-[3/4] overflow-hidden bg-neutral-200">
                  <img
                    src="/me.jpg"
                    alt="A photo of Jia Jing"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}

                <div className="absolute bottom-[14px] left-0 right-0 text-center">
                  <span className="font-serif italic text-[14px] text-neutral-600">
                    
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATION
      ====================================================== */}

      <section className="border-t border-line mt-20 pt-10">

        <h2 className="font-serif text-[22px] mb-9">
          Education
        </h2>

        <div className="space-y-10">

          {/* University */}

          <article className="grid sm:grid-cols-[180px_1fr] gap-6 sm:gap-10">

            <div>
              <p className="text-[13px] text-ink-soft">
                2023 — 2026
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">

                <h3 className="text-[16px] font-medium">
                  Monash University Malaysia
                </h3>

                <span className="text-[13px] text-ink-soft">
                  CGPA 3.95 / 4.00
                </span>

              </div>

              <p className="text-[14px] text-ink-soft mt-1">
                Bachelor of Computer Science (Advanced)
              </p>

              <p className="text-[14px] leading-relaxed max-w-[58ch] mt-3">
                First Class · Full Scholarship
              </p>
            </div>

          </article>

          {/* College */}

          <article className="grid sm:grid-cols-[180px_1fr] gap-6 sm:gap-10">

            <div>
              <p className="text-[13px] text-ink-soft">
                2022 — 2023
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">

                <h3 className="text-[16px] font-medium">
                  Sunway College
                </h3>

                <span className="text-[13px] text-ink-soft">
                  CGPA 4.00 / 4.00
                </span>

              </div>

              <p className="text-[14px] text-ink-soft mt-1">
                Monash University Foundation Year
                (Math, ICT, Physics, English)
              </p>

              <p className="text-[14px] leading-relaxed max-w-[58ch] mt-3">
                Full Scholarship
              </p>
            </div>

          </article>

          {/* High School */}

          <article className="grid sm:grid-cols-[180px_1fr] gap-6 sm:gap-10">

            <div>
              <p className="text-[13px] text-ink-soft">
                2017 — 2021
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">

                <h3 className="text-[16px] font-medium">
                  SMK Sultan Omar
                </h3>

                <span className="text-[13px] text-ink-soft">
                  SPM 10A+
                </span>

              </div>

              <p className="text-[14px] text-ink-soft mt-1">
                Malaysian High School (Science Stream)
              </p>
            </div>

          </article>

        </div>
      </section>

      {/* =====================================================
          SKILLS
      ====================================================== */}

      <section className="border-t border-line mt-20 pt-10">

        <div className="mb-10">
          <h2 className="font-serif text-[22px]">
            Skills
          </h2>

          <p className="text-[13px] text-ink-soft mt-2">
            A few things I&apos;ve worked with along the way.
          </p>
        </div>

        {/* =================================================
            MOVING SKILLS
        ================================================== */}

        <div className="relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">

          {/* Left fade */}

          <div
            className="
              absolute
              left-0
              top-0
              bottom-0
              w-16
              sm:w-24
              bg-gradient-to-r
              from-[var(--paper)]
              to-transparent
              z-10
              pointer-events-none
            "
          />

          {/* Right fade */}

          <div
            className="
              absolute
              right-0
              top-0
              bottom-0
              w-16
              sm:w-24
              bg-gradient-to-l
              from-[var(--paper)]
              to-transparent
              z-10
              pointer-events-none
            "
          />

          {/* Row 1 */}

          <SkillMarquee
            skills={skillsRow1}
            direction="left"
          />

          {/* Row 2 */}

          <SkillMarquee
            skills={skillsRow2}
            direction="right"
          />

          {/* Row 3 */}

          <SkillMarquee
            skills={skillsRow3}
            direction="left"
            speed="slow"
          />

        </div>

        {/* =================================================
            SKILLS CSS
        ================================================== */}

        <style>{`

          /* -----------------------------------------------
             MARQUEE
          ------------------------------------------------ */

          .skill-marquee {
            width: 100%;
            overflow: hidden;
          }

          .skill-marquee + .skill-marquee {
            margin-top: 34px;
          }

          .skill-marquee-track {
            display: flex;
            width: max-content;
            gap: 64px;
            align-items: flex-start;
            will-change: transform;
          }

          .skill-marquee-left .skill-marquee-track {
            animation: skills-left 28s linear infinite;
          }

          .skill-marquee-right .skill-marquee-track {
            animation: skills-right 34s linear infinite;
          }

          .skill-marquee-left-slow .skill-marquee-track {
            animation: skills-left 39s linear infinite;
          }

          /* -----------------------------------------------
             INDIVIDUAL SKILL
          ------------------------------------------------ */

          .skill-item {
            width: 88px;
            min-width: 88px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            gap: 9px;

            color: var(--ink-soft);

            transition:
              transform 220ms ease,
              color 220ms ease;
          }

          .skill-item span {
            font-family: var(--font-sans);
            font-size: 11px;
            line-height: 1.2;
            text-align: center;
            white-space: nowrap;
          }

          /* -----------------------------------------------
             BRAND ICONS

             IMPORTANT:
             Do NOT set color here.

             Devicon ORIGINAL icons contain their
             own SVG colours.
          ------------------------------------------------ */

          .skill-icon {
            width: 27px;
            height: 27px;

            flex-shrink: 0;

            display: block;

            transition:
              transform 220ms ease;
          }

          .skill-icon-wrapper {
            width: 27px;
            height: 27px;

            display: flex;
            align-items: center;
            justify-content: center;

            flex-shrink: 0;
          }

          .skill-icon-wrapper svg {
            width: 27px;
            height: 27px;
          }

          /* -----------------------------------------------
             HOVER
          ------------------------------------------------ */

          .skill-item:hover {
            color: var(--ink);
            transform: translateY(-4px);
          }

          .skill-item:hover .skill-icon,
          .skill-item:hover .skill-icon-wrapper {
            transform: scale(1.12);
          }

          /* -----------------------------------------------
             ANIMATION
          ------------------------------------------------ */

          @keyframes skills-left {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          @keyframes skills-right {
            from {
              transform: translateX(-50%);
            }

            to {
              transform: translateX(0);
            }
          }

          /* -----------------------------------------------
             PAUSE WHEN HOVERING
          ------------------------------------------------ */

          .skill-marquee:hover .skill-marquee-track {
            animation-play-state: paused;
          }

          /* -----------------------------------------------
             MOBILE
          ------------------------------------------------ */

          @media (max-width: 640px) {

            .skill-marquee-track {
              gap: 40px;
            }

            .skill-item {
              width: 72px;
              min-width: 72px;
            }

            .skill-item span {
              font-size: 10px;
            }

            .skill-icon {
              width: 24px;
              height: 24px;
            }

            .skill-icon-wrapper {
              width: 24px;
              height: 24px;
            }

            .skill-icon-wrapper svg {
              width: 24px;
              height: 24px;
            }
          }

          /* -----------------------------------------------
             REDUCED MOTION
          ------------------------------------------------ */

          @media (prefers-reduced-motion: reduce) {

            .skill-marquee-left .skill-marquee-track,
            .skill-marquee-right .skill-marquee-track,
            .skill-marquee-left-slow .skill-marquee-track {
              animation: none;
            }
          }

        `}</style>

      </section>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div className="border-t border-line mt-20 pt-8 pb-4">

        <p className="text-[13px] text-ink-soft">
          Thanks for stopping by.
        </p>

      </div>

    </main>
  );
}