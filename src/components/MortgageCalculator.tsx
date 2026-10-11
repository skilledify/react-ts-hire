import { useMemo, useState } from 'react'
import AnimatedNumber from './AnimatedNumber'

const currency = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

/**
 * Interactive mortgage calculator: monthly payment, total interest, totals.
 */
export default function MortgageCalculator() {
  const [price, setPrice] = useState(350000)
  const [downPct, setDownPct] = useState(20)
  const [years, setYears] = useState(20)
  const [rate, setRate] = useState(6.5)

  const { down, loan, monthly, totalInterest, totalPaid } = useMemo(() => {
    const downPayment = (price * downPct) / 100
    const loanAmount = Math.max(price - downPayment, 0)
    const r = rate / 100 / 12
    const n = years * 12
    const m =
      r === 0
        ? loanAmount / n
        : (loanAmount * r) / (1 - Math.pow(1 + r, -n))
    const total = m * n
    return {
      down: downPayment,
      loan: loanAmount,
      monthly: m,
      totalInterest: total - loanAmount,
      totalPaid: total + downPayment,
    }
  }, [price, downPct, years, rate])

  return (
    <div className="grid items-start gap-8 border border-line bg-ink p-6 md:grid-cols-2 md:p-10 lg:gap-12">
      {/* Controls */}
      <div className="flex flex-col gap-7">
        <div>
          <div className="flex items-center justify-between text-base">
            <span className="text-mist">Home price</span>
            <span className="font-semibold text-cream">{currency(price)}</span>
          </div>
          <input
            type="range"
            min={50000}
            max={1500000}
            step={5000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            aria-label="Home price"
            className="mt-3 w-full accent-accent"
          />
        </div>
        <div>
          <div className="flex items-center justify-between text-base">
            <span className="text-mist">Down payment</span>
            <span className="font-semibold text-cream">
              {downPct}% · {currency(down)}
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            aria-label="Down payment"
            className="mt-3 w-full accent-accent"
          />
        </div>
        <div>
          <div className="flex items-center justify-between text-base">
            <span className="text-mist">Interest rate</span>
            <span className="font-semibold text-cream">{rate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={2}
            max={10}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            aria-label="Interest rate"
            className="mt-3 w-full accent-accent"
          />
        </div>
        <div>
          <span className="text-base text-mist">Term</span>
          <div className="mt-3 flex gap-2">
            {[10, 15, 20, 30].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setYears(t)}
                className={`flex-1 cursor-pointer border px-3 py-2 text-base transition-colors duration-200 ${
                  years === t
                    ? 'border-accent bg-accent text-white'
                    : 'border-line text-mist hover:border-accent hover:text-cream'
                }`}
              >
                {t} yrs
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-ink-soft p-6 md:p-8">
        <span className="text-base text-mist">Monthly payment</span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[clamp(2rem,1.4rem+2.7vw,3.25rem)] font-semibold text-accent">
            <AnimatedNumber value={monthly} format={(v) => currency(v)} />
          </span>
          <span className="text-lg text-mist">/ month</span>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-6 text-base">
          <div>
            <dt className="text-mist">Loan amount</dt>
            <dd className="mt-1 font-semibold text-cream">{currency(loan)}</dd>
          </div>
          <div>
            <dt className="text-mist">Down payment</dt>
            <dd className="mt-1 font-semibold text-cream">{currency(down)}</dd>
          </div>
          <div>
            <dt className="text-mist">Total interest</dt>
            <dd className="mt-1 font-semibold text-cream">{currency(totalInterest)}</dd>
          </div>
          <div>
            <dt className="text-mist">Total of payments</dt>
            <dd className="mt-1 font-semibold text-cream">{currency(totalPaid)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
