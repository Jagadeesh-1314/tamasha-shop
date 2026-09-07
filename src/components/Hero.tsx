import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#201d1a] text-[#f7f4ef]">
      <div className="absolute right-[-8%] top-[-35%] h-140 w-140 rounded-full border-70 border-[#e96b4c]/80" />
      <div className="absolute bottom-[-45%] left-[40%] h-105 w-105 rounded-full border-45 border-[#f3c969]/70" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:px-8 lg:py-24">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f7f4ef]/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#f3c969]">
            <Sparkles size={14} />
            Curated products, made simple
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-[0.98] tracking-tight text-[#f7f4ef] sm:text-6xl lg:text-8xl">
            Good things,
            <span className="block text-[#e96b4c]">
              well chosen.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-[#f7f4ef]/65 sm:text-lg">
            A considered edit of everyday objects, made for the way you live now.
          </p>

          {/* CTA */}
          <a
            href="#products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#f7f4ef] px-5 py-3 text-sm font-bold text-[#201d1a] transition hover:bg-[#f3c969]"
          >
            Explore products
            <ArrowRight size={17} />
          </a>

        </div>
        <div className="relative hidden min-h-48 items-end justify-end lg:flex">
          <div className="max-w-xs border-l border-[#f7f4ef]/30 pl-6 text-right">
            <p className="text-5xl font-bold text-[#f3c969]">01</p>
            <p className="mt-3 text-sm leading-6 text-[#f7f4ef]/60">Small discoveries with a little more character.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;