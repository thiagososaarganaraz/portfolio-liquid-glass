import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="glass mx-auto w-full max-w-2xl rounded-3xl p-8 text-center md:p-14">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          Design Engineer
        </p>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
          {"Hello, I'm Thiago."}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Bridging the gap between technical mastery and intuitive design.
        </p>
        <div className="mt-10">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_24px_rgba(0,200,200,0.15)]"
          >
            View My Work
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
