const roles = [
  {
    title: "Java Developer Intern (Fund Risk)",
    org: "Ant International",
    meta: "Nov 2025 – Feb 2026 · Technology",
    lines: [
      "Optimized financial risk-check rules across 1 regional tenant (Hong Kong), reducing repeated production alerts and on-call noise.",
      "Migrated 50+ legacy MaxCompute SQL-based business rules into executable Java rule checks using Spring Boot.",
      "Investigated P0–P5 production alerts by tracing Java services and validating transaction data with SQL to identify bugs, data inconsistencies, and rule defects.",
      "Designed and implemented an AI-assisted rule migration workflow using MCP and ReAct agents, with a database MCP server and 3 custom tools to validate schemas and table relationships before code generation.",
    ],
  },
];

export default function Experience() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-16">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-14">
        <h1 className="font-serif italic text-[32px] mb-3">
          Experience
        </h1>

        <p className="text-ink-soft text-[15px] leading-relaxed max-w-[58ch]">
          A few places where I&apos;ve had the chance to build,
          learn, collaborate, and figure things out along the way.
        </p>
      </div>

      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <div className="relative ml-1 sm:ml-2 pl-7 sm:pl-10 border-l border-line">
        {roles.map((role, index) => (
          <article
            key={`${role.title}-${role.org}`}
            className={`relative ${
              index !== roles.length - 1 ? "pb-14 sm:pb-16" : ""
            }`}
          >
            {/* Timeline dot */}

            <span
              className="
                absolute
                -left-[34px]
                sm:-left-[46px]
                top-[5px]
                w-[10px]
                h-[10px]
                rounded-full
                bg-pond-mid
                ring-4
                ring-[var(--paper)]
              "
            />

            {/* Date / Meta */}

            <div className="text-[12.5px] tracking-wide text-ink-soft mb-2">
              {role.meta}
            </div>

            {/* Role */}

            <h2 className="font-serif text-[20px] sm:text-[21px] leading-tight mb-1">
              {role.title}
            </h2>

            {/* Organisation */}

            <div className="text-[14px] text-ink-soft mb-5">
              {role.org}
            </div>

            {/* Description */}

            <ul className="space-y-2 text-[14.5px] leading-relaxed max-w-[72ch]">
              {role.lines.map((line) => (
                <li
                  key={line}
                  className="relative pl-5"
                >
                  <span className="absolute left-0 text-pond-mid">
                    –
                  </span>

                  {line}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div className="border-t border-line mt-20 pt-8 pb-4">
        <p className="text-[13px] text-ink-soft">
          Still learning.
        </p>
      </div>
    </main>
  );
}