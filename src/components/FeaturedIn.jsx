import { logos } from '../data/site'
import Reveal from './Reveal'

export default function FeaturedIn() {
  const row = [...logos, ...logos]

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Featured In
          </h2>
        </Reveal>
      </div>

      <div
        className="relative mt-10 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-14 md:gap-24">
          {row.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden={i >= logos.length}
              className="h-9 w-auto shrink-0 opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-11"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
