import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import AnimatedNumber from './AnimatedNumber'
import { AppRoutes } from '../constants/global.constants'

const CITY_RATES: Record<string, number> = {
  'Toronto, Canada': 320,
  'Paris, France': 410,
  'Moscow, Russia': 260,
}

const TYPE_MULTIPLIERS: Record<string, number> = {
  Apartment: 1,
  Townhouse: 1.06,
  House: 1.18,
  Villa: 1.35,
}

const CONDITIONS: Record<string, number> = {
  'Like new': 1.1,
  Renovated: 1.03,
  Good: 1,
  'Needs work': 0.88,
}

const currency = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

/**
 * Home value estimator: instant valuation range based on
 * city, property type, condition and size (like a mini CMA).
 */
export default function ValueEstimator() {
  const [city, setCity] = useState<string>(Object.keys(CITY_RATES)[0])
  const [type, setType] = useState<string>(Object.keys(TYPE_MULTIPLIERS)[0])
  const [condition, setCondition] = useState<string>(Object.keys(CONDITIONS)[2])
  const [size, setSize] = useState(75)

  const estimate = useMemo(() => {
    const base =
      CITY_RATES[city] *
      size *
      TYPE_MULTIPLIERS[type] *
      CONDITIONS[condition]
    return Math.round(base)
  }, [city, type, condition, size])

  const selectClass =
    'w-full border border-line bg-ink px-4 py-3 text-lg text-cream outline-none transition-colors focus:border-accent [&>option]:bg-ink'

  return (
    <div className="grid items-start gap-8 border border-line bg-ink p-6 md:grid-cols-2 md:p-10 lg:gap-12">
      {/* Inputs */}
      <div className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-base text-mist">City</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={selectClass}
          >
            {Object.keys(CITY_RATES).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-base text-mist">Property type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={selectClass}
          >
            {Object.keys(TYPE_MULTIPLIERS).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-base text-mist">Condition</span>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className={selectClass}
          >
            {Object.keys(CONDITIONS).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <div>
          <div className="flex items-center justify-between text-base">
            <span className="text-mist">Size</span>
            <span className="font-semibold text-cream">{size} m²</span>
          </div>
          <input
            type="range"
            min={25}
            max={300}
            step={5}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            aria-label="Property size"
            className="mt-3 w-full accent-accent"
          />
        </div>
      </div>

      {/* Result */}
      <div className="bg-ink-soft p-6 md:p-8">
        <span className="text-base text-mist">Estimated value</span>
        <motion.div
          key={`${city}-${type}-${condition}-${size}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-2 text-[clamp(2rem,1.4rem+2.7vw,3.25rem)] font-semibold text-accent"
        >
          <AnimatedNumber value={estimate} format={(v) => currency(v)} />
        </motion.div>
        <p className="mt-3 text-base text-mist">
          Likely range: {currency(estimate * 0.95)} – {currency(estimate * 1.05)}
        </p>
        <p className="mt-8 border-t border-line pt-6 text-sm leading-[1.7] text-mist">
          Estimate based on our internal price-per-m² index for{' '}
          {city.toLowerCase()}. A full valuation of 20+ comparable sales
          takes 48 hours and is completely free.
        </p>
        <Link
          to={AppRoutes.CONTACT_PAGE}
          className="mt-6 inline-block bg-accent px-8 py-4 text-lg font-medium capitalize text-white transition-colors duration-200 hover:bg-accent-dark"
        >
          Get a precise appraisal
        </Link>
      </div>
    </div>
  )
}
