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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
            Available to rent now
          </h2>
        </Reveal>
        {}
        <div className="gap-4 grid md:grid-cols-4 bg-ink mt-10 p-6 border border-line">
          <label className="flex flex-col gap-2">
            <span className="text-mist text-base">Search</span>
            <input
              type="search"
              value={filters.query}
              onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
              placeholder="Street or title"
              className={selectClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-mist text-base">Property type</span>
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
            <span className="text-mist text-base">Minimum bedrooms</span>
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
            <div className="flex justify-between items-center text-base">
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
            <span className="text-mist text-base">
              {filtered.length} of {rentals.length} matches
            </span>
          </div>
        </div>
        {}
        {filtered.length > 0 ? (
          <motion.div layout className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {filtered.map((rental: Rental, i: number) => (
              <motion.article
                layout
                key={rental.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group flex flex-col bg-ink border border-line hover:border-accent transition-colors duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={rental.image}
                    alt={rental.title}
                    className="w-full h-[240px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="top-0 left-0 absolute bg-accent px-4 py-2 font-medium text-white text-base">
                    {rental.type}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="font-semibold group-hover:text-accent text-2xl capitalize transition-colors duration-300">
                    {rental.title}
                  </h3>
                  <p className="mt-2 text-mist text-lg">{rental.address}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-mist text-base">
                    <span>{rental.beds} beds</span>
                    <span>{rental.baths} baths</span>
                    <span>{rental.area} sqft</span>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="font-semibold text-accent text-2xl">
                      {priceFormat(rental.price)}
                      <span className="text-mist text-base"> / mo</span>
                    </span>
                    <Link
                      to={AppRoutes.CONTACT_PAGE}
                      className="px-5 py-2.5 border border-line hover:border-accent text-cream hover:text-accent text-base transition-colors duration-200"
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
            className="bg-ink mt-10 p-12 border border-line text-center"
          >
            <p className="text-xl">No homes match these filters yet.</p>
            <p className="mt-3 text-mist text-lg">
              Send us your criteria — we search our off-market database too.
            </p>
            <Link
              to={AppRoutes.CONTACT_PAGE}
              className="inline-block bg-accent mt-6 px-8 py-4 font-medium text-white text-lg capitalize transition-colors duration-200 hover:bg-accent-dark"
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
      <div className="items-center gap-12 lg:gap-16 grid lg:grid-cols-2 mx-auto px-4 max-w-[1450px]">
        <div>
          <Reveal>
            <span className="text-accent text-lg">Tenant service</span>
            <h2 className="mt-2 font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize leading-[1.26]">
              Everything included in our rental service
            </h2>
            <p className="mt-6 text-mist text-lg leading-[1.7]">
              We sign the lease, protect your deposit and stay your contact after
              move-in. One manager handles the whole tenancy.
            </p>
          </Reveal>
          <ul className="gap-4 grid mt-8">
            {included.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-center gap-4 text-lg leading-[1.7]"
              >
                <span className="flex justify-center items-center bg-accent rounded-full w-8 h-8 text-white shrink-0">
                  ✓
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <Reveal>
          <div className="gap-6 grid grid-cols-2">
            <div className="bg-ink-soft p-7 border border-line">
              <div className="font-semibold text-[clamp(2rem,1.5rem+2.2vw,3rem)] text-accent leading-none">
                <AnimatedNumber value={48} suffix="h" />
              </div>
              <p className="mt-3 text-mist text-lg">Average application review</p>
            </div>
            <div className="bg-ink-soft p-7 border border-line">
              <div className="font-semibold text-[clamp(2rem,1.5rem+2.2vw,3rem)] text-accent leading-none">
                <AnimatedNumber value={100} suffix="%" />
              </div>
              <p className="mt-3 text-mist text-lg">Landlords legally verified</p>
            </div>
            <div className="bg-ink-soft p-7 border border-line">
              <div className="font-semibold text-[clamp(2rem,1.5rem+2.2vw,3rem)] text-accent leading-none">
                <AnimatedNumber value={7} />
              </div>
              <p className="mt-3 text-mist text-lg">Viewing days per week</p>
            </div>
            <div className="bg-ink-soft p-7 border border-line">
              <div className="font-semibold text-[clamp(2rem,1.5rem+2.2vw,3rem)] text-accent leading-none">
                <AnimatedNumber value={0} prefix="$" />
              </div>
              <p className="mt-3 text-mist text-lg">Tenant agency fee</p>
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <span className="text-accent text-lg">Rent or buy?</span>
          <h2 className="mt-2 font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
            Rent vs buy calculator
          </h2>
          <p className="mt-4 max-w-[680px] text-mist text-lg leading-[1.7]">
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] text-center capitalize">
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
            className="inline-block bg-accent px-8 py-4 font-medium text-white text-lg capitalize transition-colors duration-200 hover:bg-accent-dark"
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
