const projects: {
  name: string;
  desc: string;
  tags: string[];
  image: string;
  imageAlt: string;
  links: { label: string; href: string }[];
}[] = [
  {
    name: "Academic Dashboard Website",
    desc: "A classroom analytics platform that transforms lecturer-uploaded datasets into interactive dashboards and reports, covering attendance, engagement, and at-risk student analysis.",
    tags: [
      "Java",
      "Spring Boot",
      "React.js",
      "Tailwind CSS",
      "Firebase",
    ],
    image: "/smart-classroom.png",
    imageAlt: "Academic Dashboard Website project",
    links: [],
  },

  {
    name: "Ticket to Ride – Java Application",
    desc: "A Java-based implementation of the Ticket to Ride board game, featuring object-oriented architecture, SOLID principles, and extensible game logic developed across 3 Agile sprints.",
    tags: [
      "Java",
      "OOP",
      "SOLID",
      "Design Patterns",
    ],
    image: "/ticket-to-ride.png", 
    imageAlt: "Ticket to Ride Java Application project",
    links: [],
  },

  {
    name: "Guitar Hero",
    desc: "An interactive rhythm game built with TypeScript using Functional Reactive Programming and the MVC design pattern. RxJS Observable streams manage animations, user interactions, and event timing for responsive gameplay.",
    tags: [
      "TypeScript",
      "RxJS",
      "Functional Programming",
      "MVC",
    ],
    image: "/guitar-hero.png",
    imageAlt: "Guitar Hero rhythm game project",
    links: [
      // { label: "Demo", href: "#" },
    ],
  },

  {
    name: "Elden Thing",
    desc: "A Java-based roguelike set in a dark-fantasy world, featuring NPC interactions, magical item collection, trading, and an extensible game world built around SOLID object-oriented principles.",
    tags: [
      "Java",
      "OOP",
      "SOLID",
    ],
    image: "/elden-thing.png",
    imageAlt: "Elden Thing roguelike game project",
    links: [],
  },

  {
    name: "Kanban Task Manager",
    desc: "A web-based task management platform, featuring drag-and-drop task management, team assignments, deadlines, and visual project tracking. Developed iteratively using Agile methodology and sprint-based feedback.",
    tags: [
      "Web Development",
      "JavaScript",
      "HTML/CSS",
      "Agile",
    ],
    image: "/kanban.png",
    imageAlt: "Kanban Task Manager project",
    links: [],
  },
];

export default function Projects() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-16">
      {/* Header */}
      <div className="mb-14">
        <h1 className="font-serif italic text-[32px] mb-3">
          Projects
        </h1>

        <p className="text-ink-soft text-[15px] leading-relaxed max-w-[58ch]">
          A few things I&apos;ve built to explore software, systems, and
          the parts of computing I enjoy understanding from the inside out.
        </p>
      </div>

      {/* Projects */}
      <div className="space-y-12">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className={`
              grid
              md:grid-cols-[minmax(0,1fr)_360px]
              lg:grid-cols-[minmax(0,1fr)_420px]
              gap-8
              lg:gap-14
              items-center
              pb-12
              ${
                index !== projects.length - 1
                  ? "border-b border-line"
                  : ""
              }
            `}
          >
            {/* Project information */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                  0{index + 1}
                </span>

                <span className="h-px w-8 bg-line" />
              </div>

              <h2 className="font-serif text-[23px] sm:text-[25px] leading-tight mb-3">
                {project.name}
              </h2>

              <p className="text-ink-soft text-[14.5px] leading-relaxed max-w-[62ch] mb-5">
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      text-[11.5px]
                      px-2.5
                      py-1
                      rounded-full
                      border
                      border-line
                      text-ink-soft
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="text-[13px] flex gap-5">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="
                      text-ink
                      border-b
                      border-ink-soft/40
                      hover:border-ink
                      transition-colors
                    "
                  >
                    {link.label}
                    <span className="ml-1">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Project visual */}
            <div className="order-first md:order-none">
              <div
                className="
      group
      relative
      overflow-hidden
      rounded-[20px]
      border
      border-line
      bg-card
      p-3
                "
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="
          block
          w-full
          h-auto
          object-contain
          transition-transform
          duration-500
          group-hover:scale-[1.015]
                  "
                />

                {/* subtle overlay */}
                <div
                  className="
        pointer-events-none
        absolute
        inset-0
        bg-gradient-to-t
        from-black/5
        via-transparent
        to-transparent
        opacity-0
        group-hover:opacity-100
        transition-opacity
                  "
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-line mt-16 pt-8 pb-4">
        <p className="text-[13px] text-ink-soft">
          More experiments and side projects to come.
        </p>
      </div>
    </main>
  );
}
