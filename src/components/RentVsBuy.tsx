import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'
const RENT_GROWTH = 0.03
const HOME_APPRECIATION = 0.03
const MAINTENANCE_RATE = 0.01
const MORTGAGE_RATE = 0.065
const DOWN_PCT = 0.2
const CLOSING_RATE = 0.02
const TERM_MONTHS = 360
const currency = (value: number) =>
  Math.max(Math.round(value), 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
interface CalcResult {
  rentTotal: number
  buyTotal: number
  monthly: number
}
export default function RentVsBuy() {
  const [price, setPrice] = useState(400000)
  const [rent, setRent] = useState(1800)
  const [years, setYears] = useState(10)
  const result = useMemo<CalcResult>(() => {
    let rentTotal = 0
    for (let y = 0; y < years; y++) {
      rentTotal += rent * Math.pow(1 + RENT_GROWTH, y) * 12
    }
    const down = price * DOWN_PCT
    const loan = price - down
    const r = MORTGAGE_RATE / 12
    const k = Math.min(years * 12, TERM_MONTHS)
    const monthly = (loan * r) / (1 - Math.pow(1 + r, -TERM_MONTHS))
    const paid = monthly * k
    const balance =
      k >= TERM_MONTHS
        ? 0
        : (loan * (Math.pow(1 + r, TERM_MONTHS) - Math.pow(1 + r, k))) /
          (Math.pow(1 + r, TERM_MONTHS) - 1)
    const maintenance = price * MAINTENANCE_RATE * years
    const closing = price * CLOSING_RATE
    const homeValue = price * Math.pow(1 + HOME_APPRECIATION, years)
    const saleProceeds = homeValue - balance
    const buyTotal = down + paid + maintenance + closing - saleProceeds
    return { rentTotal, buyTotal, monthly }
  }, [price, rent, years])
  const rentWins = result.rentTotal < result.buyTotal
  const diff = Math.abs(result.rentTotal - result.buyTotal)
  const max = Math.max(result.rentTotal, result.buyTotal, 1)
  const rentBarWidth = Math.max((Math.max(result.rentTotal, 0) / max) * 100, 2)
  const buyBarWidth = Math.max((Math.max(result.buyTotal, 0) / max) * 100, 2)
  return (
    <div className="bg-ink p-6 md:p-10 border border-line">
      {}
      <div className="gap-6 grid sm:grid-cols-3">
        <div>
          <div className="flex justify-between items-center text-base">
            <span className="text-mist">Home price</span>
            <span className="font-semibold text-cream">{currency(price)}</span>
          </div>
          <input
            type="range"
            min={100000}
            max={1000000}
            step={10000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            aria-label="Home price"
            className="mt-3 w-full accent-accent"
          />
        </div>
        <div>
          <div className="flex justify-between items-center text-base">
            <span className="text-mist">Monthly rent</span>
            <span className="font-semibold text-cream">{currency(rent)}</span>
          </div>
          <input
            type="range"
            min={500}
            max={5000}
            step={50}
            value={rent}
            onChange={(e) => setRent(Number(e.target.value))}
            aria-label="Monthly rent"
            className="mt-3 w-full accent-accent"
          />
        </div>
        <div>
          <div className="flex justify-between items-center text-base">
            <span className="text-mist">Horizon</span>
            <span className="font-semibold text-cream">{years} yrs</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            aria-label="Years"
            className="mt-3 w-full accent-accent"
          />
        </div>
      </div>
      {}
      <div className="space-y-6 mt-10">
        <div>
          <div className="flex justify-between text-base">
            <span className="text-mist">Renting — total spent</span>
            <span className="font-semibold text-cream">
              <AnimatedNumber value={result.rentTotal} format={(v) => currency(v)} />
            </span>
          </div>
          <div className="bg-ink-soft mt-2 w-full h-3">
            <motion.div
              animate={{ width: `${rentBarWidth}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-accent h-full"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-base">
            <span className="text-mist">Buying — net cost of ownership</span>
            <span className="font-semibold text-cream">
              <AnimatedNumber value={result.buyTotal} format={(v) => currency(v)} />
            </span>
          </div>
          <div className="bg-ink-soft mt-2 w-full h-3">
            <motion.div
              animate={{ width: `${buyBarWidth}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-accent-dark"
            />
          </div>
        </div>
      </div>
      {}
      <motion.div
        key={rentWins ? 'rent' : 'buy'}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-ink-soft mt-10 p-6 border border-accent/40 text-center"
      >
        <p className="text-lg md:text-xl leading-[1.7]">
          Over {years} years,{' '}
          <span className="font-semibold text-accent">
            {rentWins ? 'renting' : 'buying'}
          </span>{' '}
          could cost you about{' '}
          <span className="font-semibold text-cream">
            <AnimatedNumber value={diff} format={(v) => currency(v)} />
          </span>{' '}
          less.
        </p>
        <p className="mt-3 text-mist text-sm leading-[1.7]">
          Assumptions: rent +3%/yr · home price +3%/yr · 20% down · 6.5% mortgage ·
          1%/yr maintenance · 2% closing costs · ownership net of sale proceeds.
        </p>
      </motion.div>
    </div>
  )
}
