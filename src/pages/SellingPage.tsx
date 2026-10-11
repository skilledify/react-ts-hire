import { motion } from 'framer-motion'
import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Accordion from '../components/Accordion'
import ValueEstimator from '../components/ValueEstimator'
import AnimatedNumber from '../components/AnimatedNumber'
import { sellingFaqs, sellingPlans, sellingSteps } from '../data/site'
import type { SellingPlan, Step } from '../data/site'
import { AppRoutes } from '../constants/global.constants'

const metrics = [
  { value: 21, suffix: ' days', label: 'Average time to sale' },
  { value: 98.6, suffix: '%', label: 'Of asking price achieved' },
  { value: 4800, suffix: '+', label: 'Pre-qualified buyers' },
  { value: 0, prefix: '$', label: 'Fees if we do not sell' },
]

/* ---------------------------------- Секции ---------------------------------- */

function MetricsSection() {
  return (
    <section className="bg-ink-soft py-14 md:py-20">
      <div className="mx-auto grid max-w-[1450px] grid-cols-2 gap-8 px-4 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="border-l-2 border-accent/40 pl-5"
          >
            <div className="text-[clamp(1.85rem,1.4rem+2vw,2.75rem)] font-semibold leading-none text-accent">
              <AnimatedNumber
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                format={(v) => (Number.isInteger(v) ? v.toLocaleString('en-US') : v.toFixed(1))}
              />
            </div>
            <p className="mt-3 text-lg leading-[1.7] text-mist">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function StepsSection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <span className="text-lg text-accent">The process</span>
          <h2 className="mt-2 text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            How we sell your home
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {sellingSteps.map((step: Step, i: number) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group border border-line bg-ink-soft p-7 transition-colors duration-300 hover:border-accent"
            >
              <span className="text-[clamp(1.85rem,1.5rem+1.6vw,2.5rem)] font-semibold text-accent/40 transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl font-semibold capitalize">{step.title}</h3>
              <p className="mt-3 text-base leading-[1.7] text-mist">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlansSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <span className="text-lg text-accent">Fees</span>
          <h2 className="mt-2 text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Choose your plan
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-center text-lg leading-[1.7] text-mist">
            All plans are paid only on a successful sale. No upfront listing fees,
            ever.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {sellingPlans.map((plan: SellingPlan, i: number) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative flex flex-col border p-8 transition-colors duration-300 ${
                plan.featured
                  ? 'border-accent bg-ink lg:-translate-y-4 lg:shadow-[0_24px_60px_-24px_rgba(99,181,159,0.45)]'
                  : 'border-line bg-ink hover:border-accent'
              }`}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 bg-accent px-3 py-1.5 text-sm font-medium uppercase tracking-wide text-white">
                  {plan.note}
                </span>
              )}
              <h3 className="text-2xl font-semibold capitalize">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-[clamp(2.25rem,1.7rem+2.4vw,3.25rem)] font-semibold leading-none text-accent">
                  {plan.price}
                </span>
                <span className="text-base text-mist">of sale price</span>
              </div>
              {!plan.featured && (
                <p className="mt-2 text-base text-mist">{plan.note}</p>
              )}
              <ul className="mt-8 grid flex-1 gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-base leading-[1.7]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={AppRoutes.CONTACT_PAGE}
                className={`mt-8 inline-block px-6 py-4 text-center text-lg font-medium capitalize transition-colors duration-200 ${
                  plan.featured
                    ? 'bg-accent text-white hover:bg-accent-dark'
                    : 'border border-line text-cream hover:border-accent hover:text-accent'
                }`}
              >
                Choose {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EstimatorSection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <span className="text-lg text-accent">Instant estimate</span>
          <h2 className="mt-2 text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            What is your home worth?
          </h2>
          <p className="mt-4 max-w-[680px] text-lg leading-[1.7] text-mist">
            Four inputs, a live estimate. It takes our full comparative analysis
            to get the exact number — and that one is free.
          </p>
        </Reveal>
        <div className="mt-12">
          <ValueEstimator />
        </div>
      </div>
    </section>
  )
}

function SellingFaqSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Selling questions
          </h2>
        </Reveal>
        <div className="mt-12">
          <Accordion items={sellingFaqs} />
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Страница ---------------------------------- */

export default function SellingPage() {
  return (
    <>
      <PageHero
        title="Selling"
        subtitle="A realistic price, professional presentation and a negotiator in your corner — we sell homes in 21 days on average for 98.6% of the asking price."
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
            Book a free valuation
          </Link>
        </motion.div>
      </PageHero>
      <MetricsSection />
      <StepsSection />
      <PlansSection />
      <EstimatorSection />
      <SellingFaqSection />
    </>
  )
}
