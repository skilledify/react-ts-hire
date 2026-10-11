import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { properties } from '../data/site'
import type { Property } from '../data/site'
import { AreaIcon, BathIcon, BedIcon } from './icons'
import Reveal from './Reveal'
import { AppRoutes } from '../constants/global.constants'

const cardWidth = 'w-[86vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]'

interface PropertyCardProps {
  property: Property
  index: number
}

function PropertyCard({ property, index }: PropertyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`${cardWidth} group flex shrink-0 snap-start flex-col gap-6`}
    >
      <div className="overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-[280px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 md:h-[340px]"
        />
      </div>
      <div>
        <h3 className="text-[26px] font-semibold capitalize leading-[1.26] tracking-[0.01em] transition-colors duration-300 group-hover:text-accent">
          {property.title}
        </h3>
        <p className="mt-1 text-lg leading-[1.7] text-mist">{property.address}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-mist">
        <span className="flex items-center gap-1.5 text-base">
          <BedIcon className="h-[22px] w-[22px] text-accent" />
          {property.beds} Beds
        </span>
        <span className="flex items-center gap-1.5 text-base">
          <BathIcon className="h-[22px] w-[22px] text-accent" />
          {property.baths} Bath
        </span>
        <span className="flex items-center gap-1.5 text-base">
          <AreaIcon className="h-[22px] w-[22px] text-accent" />
          {property.area} Sqft.
        </span>
      </div>
    </motion.article>
  )
}

interface ArrowButtonProps {
  direction: 'prev' | 'next'
  onClick: () => void
}

function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous properties' : 'Next properties'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-white/80 bg-transparent transition-colors duration-200 hover:border-accent hover:bg-accent md:h-[78px] md:w-[78px]"
    >
      <img
        src="/img/icons/arrow-slider.svg"
        alt=""
        className={`h-[22px] w-[14px] ${direction === 'next' ? 'rotate-180' : ''}`}
      />
    </motion.button>
  )
}

export default function Popular() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('article')
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section
      id="popular"
      className="bg-ink-soft bg-cover bg-center py-16 md:py-28"
      style={{ backgroundImage: "url('/img/slider-bg.png')" }}
    >
      <div className="mx-auto max-w-[1450px] px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
              Popular Residence
            </h2>
          </Reveal>
          <div className="hidden items-center gap-7 md:flex">
            <ArrowButton direction="prev" onClick={() => scrollByCard(-1)} />
            <ArrowButton direction="next" onClick={() => scrollByCard(1)} />
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {properties.map((property, i) => (
            <PropertyCard key={`${property.id}-${i}`} property={property} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link
              to={AppRoutes.BUYING_PAGE}
              className="inline-block bg-accent px-10 py-5 text-xl font-medium capitalize text-white transition-colors duration-200 hover:bg-accent-dark md:px-[42px] md:py-[22px] md:text-2xl"
            >
              View all properties
            </Link>
          </motion.span>
        </div>
      </div>
    </section>
  )
}
