import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { properties } from '../data/site'
import type { Property } from '../data/site'
import { AreaIcon, BathIcon, BedIcon } from './icons'
import Reveal from './Reveal'
import { AppRoutes, asset } from '../constants/global.constants'
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
          className="w-full h-[280px] md:h-[340px] object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>
      <div>
        <h3 className="font-semibold text-[26px] group-hover:text-accent capitalize leading-[1.26] tracking-[0.01em] transition-colors duration-300">
          {property.title}
        </h3>
        <p className="mt-1 text-mist text-lg leading-[1.7]">{property.address}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-mist">
        <span className="flex items-center gap-1.5 text-base">
          <BedIcon className="w-[22px] h-[22px] text-accent" />
          {property.beds} Beds
        </span>
        <span className="flex items-center gap-1.5 text-base">
          <BathIcon className="w-[22px] h-[22px] text-accent" />
          {property.baths} Bath
        </span>
        <span className="flex items-center gap-1.5 text-base">
          <AreaIcon className="w-[22px] h-[22px] text-accent" />
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
      className="flex justify-center items-center bg-transparent hover:bg-accent border border-white/80 hover:border-accent rounded-full w-16 md:w-[78px] h-16 md:h-[78px] transition-colors duration-200 cursor-pointer"
    >
      <img
        src={asset('/img/icons/arrow-slider.svg')}
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
      style={{ backgroundImage: `url("${asset('/img/slider-bg.png')}")` }}
    >
      <div className="mx-auto px-4 max-w-[1450px]">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <Reveal>
            <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
              Popular Residence
            </h2>
          </Reveal>
          <div className="hidden md:flex items-center gap-7">
            <ArrowButton direction="prev" onClick={() => scrollByCard(-1)} />
            <ArrowButton direction="next" onClick={() => scrollByCard(1)} />
          </div>
        </div>
        <div
          ref={trackRef}
          className="flex gap-5 mt-10 pb-2 overflow-x-auto scroll-smooth snap-mandatory snap-x no-scrollbar"
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
              className="inline-block bg-accent px-10 md:px-[42px] py-5 md:py-[22px] font-medium text-white text-xl md:text-2xl capitalize transition-colors duration-200 hover:bg-accent-dark"
            >
              View all properties
            </Link>
          </motion.span>
        </div>
      </div>
    </section>
  )
}
