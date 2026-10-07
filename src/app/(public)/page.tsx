import { AICarousel } from "@/components/public/AICarousel";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
        {/* Subtle background glow */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 opacity-50 blur-[100px]" />
        
        <div className="max-w-4xl space-y-8">
          <h1 className="font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Your Wellness. <br />
            <span className="text-primary">Powered by Intelligence.</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            SVH Nutrition Club is a premium digital ecosystem that transforms your 
            body metrics into a highly personalized, guided wellness journey.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Start Your Wellness Journey
            </Link>
            <Link
              href="#explore"
              className="rounded-full border border-border bg-transparent px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              Explore SVH
            </Link>
          </div>
        </div>
      </section>

      {/* AI CAROUSEL SECTION */}
      <section className="w-full border-y border-border/50">
        <AICarousel />
      </section>

      {/* HOW SVH WORKS */}
      <section id="explore" className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How SVH Works
          </h2>
          <p className="mt-4 text-muted-foreground">One continuous, intelligent journey.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            { step: "01", title: "Scan", desc: "Upload or enter your body metrics into your digital profile." },
            { step: "02", title: "Understand", desc: "Our AI breaks down what your numbers actually mean for your health." },
            { step: "03", title: "Personalize", desc: "Receive automated, structured wellness and meal plans tailored to you." },
            { step: "04", title: "Improve", desc: "Log your nutrition, scan your food, and adjust your habits seamlessly." },
            { step: "05", title: "Track", desc: "Watch your 3D body profile and timeline evolve over time." },
            { step: "06", title: "Transform", desc: "Achieve your goals with continuous, intelligent guidance." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/50">
              <span className="font-mono text-4xl font-black text-primary/20">{item.step}</span>
              <h3 className="font-heading text-xl font-bold text-card-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-primary/5 py-32 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Ready to completely transform?
          </h2>
          <p className="mt-6 text-xl text-muted-foreground">
            Join SVH today and step into the future of personal wellness and nutrition.
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-block rounded-full bg-primary px-10 py-5 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Begin Your SVH Wellness Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
