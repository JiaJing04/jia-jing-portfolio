import { FaGithub } from "react-icons/fa";

const projects: {
  name: string;
  desc: string;
  date?: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  // Set a video path to show a player; image becomes its optional poster.
  video?: string;
  links: { label: string; href: string }[];
}[] = [
  {
    name: "Academic Dashboard Website",
    desc: "A classroom analytics dashboard for tracking attendance, engagement, and at-risk students.",
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
    name: "Ticket To Ride",
    desc: "A Java adaptation of the board game with extensible, object-oriented game logic.",
    tags: [
      "Java",
      "Java Swing",
      "OOP",
      "SOLID",
      "Design Patterns",
    ],
    image: "/ticket-to-ride.png", 
    imageAlt: "Ticket to Ride Java Application project",
    links: [
      { label: "Code", href: "https://github.com/JiaJing04/Ticket-To-Ride" },
    ],
  },

  {
    name: "Run Monash Database System",
    desc: "An Oracle and MongoDB database project covering business rules, data integrity, and complex queries.",
    tags: ["Oracle SQL", "MongoDB", "PL/SQL"],
    image: "/run-monash.png", 
    imageAlt: "Run Monash Database System",
    links: [
      { label: "Code", href: "https://github.com/JiaJing04/Run-Monash-Database-System" },
    ],
  },

  {
    name: "Guitar Hero",
    desc: "A TypeScript rhythm game powered by RxJS and functional reactive programming.",
    tags: [
      "TypeScript",
      "RxJS",
      "Functional Programming",
    ],
    image: "/guitar-hero.png",
    imageAlt: "Guitar Hero rhythm game project",
    links: [
      // { label: "Demo", href: "#" },
    ],
  },

  {
    name: "Elden Thing",
    desc: "A Java roguelike featuring NPC interactions, item collection, and trading.",
    tags: [
      "Java",
      "OOP",
      "SOLID",
    ],
    image: "/elden-thing.png",
    imageAlt: "Elden Thing roguelike game project",
    links: [
      { label: "Code", href: "https://github.com/JiaJing04/Elden-Thing" },
    ],
  },

];

export default function Projects() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-16">
      <div className="mb-10 sm:mb-12">
        <h1 className="font-heading font-medium text-[32px] mb-3">
          Projects
        </h1>
        <p className="text-ink-soft text-[15px] leading-relaxed max-w-[58ch]">
          A few things I&apos;ve built while exploring software and systems.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="group flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-line bg-card transition-[transform,box-shadow,border-color] duration-200 ease-out hover:border-ink-soft/40 hover:shadow-[0_12px_28px_rgba(51,81,106,0.10)] focus-within:border-ink-soft/40 focus-within:shadow-[0_12px_28px_rgba(51,81,106,0.10)] motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1 motion-reduce:transition-none"
          >
            {(project.video || project.image) && (
              <div className="flex h-56 items-center justify-center overflow-hidden border-b border-line p-4">
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.image}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${project.name} demonstration`}
                    className="h-full w-full object-contain"
                  >
                    <a href={project.video}>Watch the {project.name} video</a>
                  </video>
                ) : (
                  <img
                    src={project.image}
                    alt={project.imageAlt || project.name}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-contain transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.025] motion-safe:group-focus-within:scale-[1.025] motion-reduce:transition-none"
                  />
                )}
              </div>
            )}

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="min-w-0 font-heading font-medium text-[21px] sm:text-[23px] leading-tight">
                  {project.name}
                </h2>
                {project.links.length > 0 && (
                  <div className="-mt-1.5 -mr-2 flex shrink-0 items-center gap-2 text-[13px]">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-label={link.label === "Code" ? `View ${project.name} on GitHub` : `${link.label} for ${project.name}`}
                        title={link.label === "Code" ? "View code on GitHub" : link.label}
                        className={link.label === "Code"
                          ? "inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                          : "rounded-sm border-b border-ink-soft/40 text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"}
                      >
                        {link.label === "Code" ? (
                          <FaGithub size={22} aria-hidden="true" />
                        ) : (
                          <>{link.label}<span aria-hidden="true" className="ml-1">↗</span></>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {project.date && (
                <p className="mb-3 text-[12px] text-ink-soft">{project.date}</p>
              )}
              <p className="text-[14px] leading-relaxed text-ink-soft">
                {project.desc}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
