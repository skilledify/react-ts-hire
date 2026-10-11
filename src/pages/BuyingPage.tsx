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
function StepsSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] text-center capitalize">
            Five steps to your new home
          </h2>
        </Reveal>
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mt-12">
          {buyingSteps.map((step: Step, i: number) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group bg-ink p-8 border border-line hover:border-accent transition-colors duration-300"
            >
              <span className="font-semibold text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] text-accent/40 group-hover:text-accent transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-semibold text-2xl capitalize">{step.title}</h3>
              <p className="mt-3 text-mist text-lg leading-[1.7]">{step.text}</p>
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
            Homes available to buy
          </h2>
        </Reveal>
        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {properties.map((property: Property, i: number) => (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group flex flex-col bg-ink-soft border border-line hover:border-accent overflow-hidden transition-colors duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex flex-col flex-1 p-7">
                <h3 className="font-semibold group-hover:text-accent text-2xl capitalize transition-colors duration-300">
                  {property.title}
                </h3>
                <p className="mt-2 text-mist text-lg">{property.address}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-mist text-base">
                  <span>{property.beds} beds</span>
                  <span>{property.baths} baths</span>
                  <span>{property.area} sqft</span>
                </div>
                <span className="mt-6 font-semibold text-accent text-2xl">
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
      <div className="items-start gap-12 lg:gap-16 grid lg:grid-cols-[0.9fr_1.1fr] mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <span className="text-accent text-lg">Why buy with us</span>
          <h2 className="mt-2 font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize leading-[1.26]">
            Fewer risks, better price
          </h2>
          <p className="mt-6 text-mist text-lg leading-[1.7]">
            The average buyer we work with saves 4.2% on the asking price and
            closes 11 days faster than the market average — because every number
            is checked before it reaches your inbox.
          </p>
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="font-semibold text-[clamp(2rem,1.5rem+2.2vw,3rem)] text-accent leading-none">
                <AnimatedNumber value={4.2} format={(v) => v.toFixed(1)} suffix="%" />
              </div>
              <p className="mt-2 text-mist text-lg">Average price saved</p>
            </div>
            <div>
              <div className="font-semibold text-[clamp(2rem,1.5rem+2.2vw,3rem)] text-accent leading-none">
                <AnimatedNumber value={30} suffix="%" />
              </div>
              <p className="mt-2 text-mist text-lg">Off-market deals</p>
            </div>
          </div>
        </Reveal>
        <div className="gap-6 grid">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-5 bg-ink p-7 border border-line"
            >
              <span className="flex justify-center items-center bg-accent rounded-full w-10 h-10 text-white shrink-0">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-xl">{benefit.title}</h3>
                <p className="mt-2 text-mist text-lg leading-[1.7]">{benefit.text}</p>
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <span className="text-accent text-lg">Plan your budget</span>
          <h2 className="mt-2 font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
            Mortgage calculator
          </h2>
          <p className="mt-4 max-w-[680px] text-mist text-lg leading-[1.7]">
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] text-center capitalize">
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
            className="inline-block bg-accent px-8 py-4 font-medium text-white text-lg capitalize transition-colors duration-200 hover:bg-accent-dark"
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
