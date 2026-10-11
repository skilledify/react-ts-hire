import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Accordion from '../components/Accordion'
import RentVsBuy from '../components/RentVsBuy'
import AnimatedNumber from '../components/AnimatedNumber'
import { rentals, rentingFaqs, rentalTypes } from '../data/site'
import type { Rental, RentalType } from '../data/site'
import { AppRoutes } from '../constants/global.constants'

const priceFormat = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

const MAX_PRICE = 4500

const included = [
  'Verified landlord and legal documents',
  'Viewings 7 days a week, evenings included',
  'Digital lease signing',
  'Deposit protection',
  'Maintenance request tracking',
]

/* ---------------------------------- Секции ---------------------------------- */

interface Filters {
  type: RentalType | 'all'
  beds: number | 'all'
  maxPrice: number
  query: string
}

function ListingsSection() {
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    beds: 'all',
    maxPrice: MAX_PRICE,
    query: '',
  })

  const filtered = useMemo(
    () =>
      rentals.filter((rental) => {
        if (filters.type !== 'all' && rental.type !== filters.type) return false
        if (filters.beds !== 'all' && rental.beds < filters.beds) return false
        if (rental.price > filters.maxPrice) return false
        if (
          filters.query.trim() &&
          !`${rental.title} ${rental.address}`
            .toLowerCase()
            .includes(filters.query.trim().toLowerCase())
        )
          return false
        return true
      }),
    [filters],
  )

  const selectClass =
    'w-full border border-line bg-ink px-4 py-3 text-lg text-cream outline-none transition-colors focus:border-accent [&>option]:bg-ink'

  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Available to rent now
          </h2>
        </Reveal>

        {/* Фильтры */}
        <div className="mt-10 grid gap-4 border border-line bg-ink p-6 md:grid-cols-4">
          <label className="flex flex-col gap-2">
            <span className="text-base text-mist">Search</span>
            <input
              type="search"
              value={filters.query}
              onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
              placeholder="Street or title"
              className={selectClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-base text-mist">Property type</span>
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters((f) => ({ ...f, type: e.target.value as Filters['type'] }))
              }
              className={selectClass}
            >
              <option value="all">Any type</option>
              {rentalTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-base text-mist">Minimum bedrooms</span>
            <select
              value={filters.beds}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  beds: e.target.value === 'all' ? 'all' : Number(e.target.value),
                }))
              }
              className={selectClass}
            >
              <option value="all">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-base">
              <span className="text-mist">Max budget</span>
              <span className="font-semibold text-cream">
                {priceFormat(filters.maxPrice)} / mo
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={MAX_PRICE}
              step={50}
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
              }
              aria-label="Maximum monthly budget"
              className="mt-3 w-full accent-accent"
            />
            <span className="text-base text-mist">
              {filtered.length} of {rentals.length} matches
            </span>
          </div>
        </div>

        {/* Результаты */}
        {filtered.length > 0 ? (
          <motion.div layout className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((rental: Rental, i: number) => (
              <motion.article
                layout
                key={rental.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group flex flex-col border border-line bg-ink transition-colors duration-300 hover:border-accent"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={rental.image}
                    alt={rental.title}
                    className="h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-0 top-0 bg-accent px-4 py-2 text-base font-medium text-white">
                    {rental.type}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-semibold capitalize transition-colors duration-300 group-hover:text-accent">
                    {rental.title}
                  </h3>
                  <p className="mt-2 text-lg text-mist">{rental.address}</p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base text-mist">
                    <span>{rental.beds} beds</span>
                    <span>{rental.baths} baths</span>
                    <span>{rental.area} sqft</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-semibold text-accent">
                      {priceFormat(rental.price)}
                      <span className="text-base text-mist"> / mo</span>
                    </span>
                    <Link
                      to={AppRoutes.CONTACT_PAGE}
                      className="border border-line px-5 py-2.5 text-base text-cream transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      Book a viewing
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 border border-line bg-ink p-12 text-center"
          >
            <p className="text-xl">No homes match these filters yet.</p>
            <p className="mt-3 text-lg text-mist">
              Send us your criteria — we search our off-market database too.
            </p>
            <Link
              to={AppRoutes.CONTACT_PAGE}
              className="mt-6 inline-block bg-accent px-8 py-4 text-lg font-medium capitalize text-white transition-colors duration-200 hover:bg-accent-dark"
            >
              Set up a search
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function IncludedSection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto grid max-w-[1450px] items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="text-lg text-accent">Tenant service</span>
            <h2 className="mt-2 text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize leading-[1.26]">
              Everything included in our rental service
            </h2>
            <p className="mt-6 text-lg leading-[1.7] text-mist">
              We sign the lease, protect your deposit and stay your contact after
              move-in. One manager handles the whole tenancy.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-4">
            {included.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-center gap-4 text-lg leading-[1.7]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  ✓
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <Reveal>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-line bg-ink-soft p-7">
              <div className="text-[clamp(2rem,1.5rem+2.2vw,3rem)] font-semibold leading-none text-accent">
                <AnimatedNumber value={48} suffix="h" />
              </div>
              <p className="mt-3 text-lg text-mist">Average application review</p>
            </div>
            <div className="border border-line bg-ink-soft p-7">
              <div className="text-[clamp(2rem,1.5rem+2.2vw,3rem)] font-semibold leading-none text-accent">
                <AnimatedNumber value={100} suffix="%" />
              </div>
              <p className="mt-3 text-lg text-mist">Landlords legally verified</p>
            </div>
            <div className="border border-line bg-ink-soft p-7">
              <div className="text-[clamp(2rem,1.5rem+2.2vw,3rem)] font-semibold leading-none text-accent">
                <AnimatedNumber value={7} />
              </div>
              <p className="mt-3 text-lg text-mist">Viewing days per week</p>
            </div>
            <div className="border border-line bg-ink-soft p-7">
              <div className="text-[clamp(2rem,1.5rem+2.2vw,3rem)] font-semibold leading-none text-accent">
                <AnimatedNumber value={0} prefix="$" />
              </div>
              <p className="mt-3 text-lg text-mist">Tenant agency fee</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CompareSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <span className="text-lg text-accent">Rent or buy?</span>
          <h2 className="mt-2 text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Rent vs buy calculator
          </h2>
          <p className="mt-4 max-w-[680px] text-lg leading-[1.7] text-mist">
            See which option really costs less over your time horizon — with rent
            growth, maintenance, closing costs and home appreciation included.
          </p>
        </Reveal>
        <div className="mt-12">
          <RentVsBuy />
        </div>
      </div>
    </section>
  )
}

function RentingFaqSection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Renting questions
          </h2>
        </Reveal>
        <div className="mt-12">
          <Accordion items={rentingFaqs} />
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Страница ---------------------------------- */

export default function RentingPage() {
  return (
    <>
      <PageHero
        title="Renting"
        subtitle="Short-term and long-term rentals with verified landlords, flexible viewings and a lease you can sign from your phone."
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Link
            to={AppRoutes.CONTACT_PAGE}
            className="inline-block bg-accent px-8 py-4 text-lg font-medium capitalize text-white transition-colors duration-200 hover:bg-accent-dark"
          >
            Tell us what you need
          </Link>
        </motion.div>
      </PageHero>
      <ListingsSection />
      <IncludedSection />
      <CompareSection />
      <RentingFaqSection />
    </>
  )
}
