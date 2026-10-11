import { logos } from '../data/site'
import Reveal from './Reveal'
export default function FeaturedIn() {
  const row = [...logos, ...logos]
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] text-center capitalize">
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
        <div className="flex items-center gap-14 md:gap-24 w-max animate-marquee">
          {row.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden={i >= logos.length}
              className="opacity-70 hover:opacity-100 w-auto h-9 md:h-11 transition-opacity duration-300 shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
