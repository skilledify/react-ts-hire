import { motion } from 'framer-motion'
import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import AnimatedNumber from '../components/AnimatedNumber'
import { stats, team, timeline, values } from '../data/site'
import type { Stat, TeamMember, TimelineItem, ValueItem } from '../data/site'
import { AppRoutes, asset } from '../constants/global.constants'

/* ---------------------------------- Секции ---------------------------------- */

function StatsSection() {
  return (
    <section className="bg-ink-soft py-14 md:py-20">
      <div className="mx-auto grid max-w-[1450px] grid-cols-2 gap-8 px-4 lg:grid-cols-4">
        {stats.map((stat: Stat, i: number) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="border-b-2 border-accent/40 pb-6"
          >
            <div className="text-[clamp(2.25rem,1.6rem+2.9vw,3.75rem)] font-semibold leading-none text-accent">
              <AnimatedNumber value={stat.value} />
              {stat.suffix}
            </div>
            <p className="mt-3 text-lg leading-[1.7] text-mist">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto grid max-w-[1450px] items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <img
            src={asset('/img/gallery/1.jpg')}
            alt="Hire office team at work"
            className="w-full object-cover"
          />
        </Reveal>
        <div>
          <Reveal>
            <span className="text-lg text-accent">Since 2014</span>
            <h2 className="mt-2 text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize leading-[1.26]">
              We are an agency built on trust
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-lg leading-[1.7] text-mist">
              Hire started as three agents with one conviction: people deserve
              clearer advice than a listing portal can give. Today we are a
              full-cycle agency covering buying, renting and selling across
              three countries — still led by that same principle.
            </p>
            <p className="mt-4 text-lg leading-[1.7] text-mist">
              Every client gets one dedicated manager, a transparent cost sheet
              and direct access to fresh neighbourhood data. No call centre, no
              upsell, no surprises at closing.
            </p>
          </Reveal>
          <Link
            to={AppRoutes.CONTACT_PAGE}
            className="mt-8 inline-block bg-accent px-8 py-4 text-lg font-medium capitalize text-white transition-colors duration-200 hover:bg-accent-dark"
          >
            Talk to an advisor
          </Link>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Our values
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value: ValueItem, i: number) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              className="group border border-line p-7 transition-colors duration-300 hover:border-accent"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-2xl font-semibold capitalize">
                {value.title}
              </h3>
              <p className="mt-3 text-lg leading-[1.7] text-mist">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            How we grew
          </h2>
        </Reveal>
        <ol className="relative mt-12 border-l border-line pl-8 md:pl-12">
          {timeline.map((item: TimelineItem, i: number) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-ink md:-left-[57px]" />
              <span className="text-lg font-medium text-accent">{item.year}</span>
              <h3 className="mt-1 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 max-w-[640px] text-lg leading-[1.7] text-mist">
                {item.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Meet the team
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member: TeamMember, i: number) => (
            <motion.figure
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              className="group border border-line bg-ink p-8 text-center transition-colors duration-300 hover:border-accent"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-2xl font-semibold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {member.initials}
              </div>
              <figcaption className="mt-6">
                <span className="block text-xl font-semibold">{member.name}</span>
                <span className="mt-1 block text-lg text-mist">{member.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Страница ---------------------------------- */

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About us"
        subtitle="Hire is a full-cycle real estate agency that helps people buy, rent and sell homes with clear advice, verified listings and one dedicated advisor from the first call to the keys."
      />
      <StatsSection />
      <StorySection />
      <ValuesSection />
      <TimelineSection />
      <TeamSection />
    </>
  )
}
