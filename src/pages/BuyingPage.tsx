import { motion } from 'framer-motion'
import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Accordion from '../components/Accordion'
import MortgageCalculator from '../components/MortgageCalculator'
import AnimatedNumber from '../components/AnimatedNumber'
import { buyingFaqs, buyingSteps, properties } from '../data/site'
import type { Property, Step } from '../data/site'
import { AppRoutes } from '../constants/global.constants'

const currency = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

const benefits = [
  {
    title: 'Verified listings only',
    text: 'Every home is visited by our agent before it goes public — photos, documents and prices are checked.',
  },
  {
    title: 'Off-market access',
    text: 'About 30% of our deals never reach the portals. Pre-qualified buyers see them first.',
  },
  {
    title: 'Mortgage support',
    text: 'We compare 12+ lenders and negotiate the rate for you, free of charge through partner banks.',
  },
]

/* ---------------------------------- Секции ---------------------------------- */

function StepsSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Five steps to your new home
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {buyingSteps.map((step: Step, i: number) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group border border-line bg-ink p-8 transition-colors duration-300 hover:border-accent"
            >
              <span className="text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] font-semibold text-accent/40 transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-2xl font-semibold capitalize">{step.title}</h3>
              <p className="mt-3 text-lg leading-[1.7] text-mist">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ListingsSection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Homes available to buy
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property: Property, i: number) => (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group flex flex-col overflow-hidden border border-line bg-ink-soft transition-colors duration-300 hover:border-accent"
            >
              <div className="overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-[260px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-semibold capitalize transition-colors duration-300 group-hover:text-accent">
                  {property.title}
                </h3>
                <p className="mt-2 text-lg text-mist">{property.address}</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base text-mist">
                  <span>{property.beds} beds</span>
                  <span>{property.baths} baths</span>
                  <span>{property.area} sqft</span>
                </div>
                <span className="mt-6 text-2xl font-semibold text-accent">
                  {currency(property.area * 390)}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto grid max-w-[1450px] items-start gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <span className="text-lg text-accent">Why buy with us</span>
          <h2 className="mt-2 text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize leading-[1.26]">
            Fewer risks, better price
          </h2>
          <p className="mt-6 text-lg leading-[1.7] text-mist">
            The average buyer we work with saves 4.2% on the asking price and
            closes 11 days faster than the market average — because every number
            is checked before it reaches your inbox.
          </p>
          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <div className="text-[clamp(2rem,1.5rem+2.2vw,3rem)] font-semibold leading-none text-accent">
                <AnimatedNumber value={4.2} format={(v) => v.toFixed(1)} suffix="%" />
              </div>
              <p className="mt-2 text-lg text-mist">Average price saved</p>
            </div>
            <div>
              <div className="text-[clamp(2rem,1.5rem+2.2vw,3rem)] font-semibold leading-none text-accent">
                <AnimatedNumber value={30} suffix="%" />
              </div>
              <p className="mt-2 text-lg text-mist">Off-market deals</p>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-5 border border-line bg-ink p-7"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                ✓
              </span>
              <div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-lg leading-[1.7] text-mist">{benefit.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CalculatorSection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <span className="text-lg text-accent">Plan your budget</span>
          <h2 className="mt-2 text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Mortgage calculator
          </h2>
          <p className="mt-4 max-w-[680px] text-lg leading-[1.7] text-mist">
            Move the sliders to see the real monthly payment, the total interest
            and the amount you will pay back over the whole term.
          </p>
        </Reveal>
        <div className="mt-12">
          <MortgageCalculator />
        </div>
      </div>
    </section>
  )
}

function BuyingFaqSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Buying questions
          </h2>
        </Reveal>
        <div className="mt-12">
          <Accordion items={buyingFaqs} />
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Страница ---------------------------------- */

export default function BuyingPage() {
  return (
    <>
      <PageHero
        title="Buying"
        subtitle="Verified listings, off-market access and one advisor who runs the whole purchase — from the first shortlist to the day you turn the key."
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
            Request a shortlist
          </Link>
        </motion.div>
      </PageHero>
      <StepsSection />
      <ListingsSection />
      <BenefitsSection />
      <CalculatorSection />
      <BuyingFaqSection />
    </>
  )
}
