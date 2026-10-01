import DeveloperWorld from "@/components/DeveloperWorldLoader";

export default function Home() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
      <section className="min-h-[calc(100vh-90px)] flex flex-col items-center pt-16 sm:pt-20">
        
        {/* Hero text */}
        <div className="text-center max-w-[700px]">

          <h1 className="font-serif text-[clamp(42px,7vw,72px)] leading-[0.95] tracking-[-0.03em]">
            Hi, I&apos;m Jia Jing.
          </h1>

          <p className="mt-6 text-[15px] sm:text-[16px] leading-relaxed text-ink-soft max-w-[500px] mx-auto">
            I build software, solve problems, and have a questionable relationship with hot Milo.
          </p>

        </div>

        {/* 3D developer world */}
        <div className="w-full mt-8 sm:mt-4">
          <DeveloperWorld />
        </div>
      </section>
    </main>
  );
}
