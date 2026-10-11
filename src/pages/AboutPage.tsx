import { motion } from 'framer-motion'
import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import AnimatedNumber from '../components/AnimatedNumber'
import { stats, team, timeline, values } from '../data/site'
import type { Stat, TeamMember, TimelineItem, ValueItem } from '../data/site'
import { AppRoutes, asset } from '../constants/global.constants'
function StatsSection() {
  return (
    <section className="bg-ink-soft py-14 md:py-20">
      <div className="gap-8 grid grid-cols-2 lg:grid-cols-4 mx-auto px-4 max-w-[1450px]">
        {stats.map((stat: Stat, i: number) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="pb-6 border-accent/40 border-b-2"
          >
            <div className="font-semibold text-[clamp(2.25rem,1.6rem+2.9vw,3.75rem)] text-accent leading-none">
              <AnimatedNumber value={stat.value} />
              {stat.suffix}
            </div>
            <p className="mt-3 text-mist text-lg leading-[1.7]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
function StorySection() {
  return (
    <section className="py-16 md:py-28">
      <div className="items-center gap-12 lg:gap-16 grid lg:grid-cols-2 mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <img
            src={asset('/img/gallery/1.jpg')}
            alt="Hire office team at work"
            className="w-full object-cover"
          />
        </Reveal>
        <div>
          <Reveal>
            <span className="text-accent text-lg">Since 2014</span>
            <h2 className="mt-2 font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize leading-[1.26]">
              We are an agency built on trust
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-mist text-lg leading-[1.7]">
              Hire started as three agents with one conviction: people deserve
              clearer advice than a listing portal can give. Today we are a
              full-cycle agency covering buying, renting and selling across
              three countries — still led by that same principle.
            </p>
            <p className="mt-4 text-mist text-lg leading-[1.7]">
              Every client gets one dedicated manager, a transparent cost sheet
              and direct access to fresh neighbourhood data. No call centre, no
              upsell, no surprises at closing.
            </p>
          </Reveal>
          <Link
            to={AppRoutes.CONTACT_PAGE}
            className="inline-block bg-accent mt-8 px-8 py-4 font-medium text-white text-lg capitalize transition-colors duration-200 hover:bg-accent-dark"
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] text-center capitalize">
            Our values
          </h2>
        </Reveal>
        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {values.map((value: ValueItem, i: number) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              className="group p-7 border border-line hover:border-accent transition-colors duration-300"
            >
              <span className="flex justify-center items-center bg-accent/15 group-hover:bg-accent rounded-full w-11 h-11 text-accent group-hover:text-white transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-semibold text-2xl capitalize">
                {value.title}
              </h3>
              <p className="mt-3 text-mist text-lg leading-[1.7]">{value.text}</p>
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
            How we grew
          </h2>
        </Reveal>
        <ol className="relative mt-12 pl-8 md:pl-12 border-line border-l">
          {timeline.map((item: TimelineItem, i: number) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative pb-10 last:pb-0"
            >
              <span className="top-1.5 -left-[41px] md:-left-[57px] absolute bg-ink border-2 border-accent rounded-full w-4 h-4" />
              <span className="font-medium text-accent text-lg">{item.year}</span>
              <h3 className="mt-1 font-semibold text-2xl">{item.title}</h3>
              <p className="mt-2 max-w-[640px] text-mist text-lg leading-[1.7]">
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] text-center capitalize">
            Meet the team
          </h2>
        </Reveal>
        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {team.map((member: TeamMember, i: number) => (
            <motion.figure
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              className="group bg-ink p-8 border border-line hover:border-accent text-center transition-colors duration-300"
            >
              <div className="flex justify-center items-center bg-accent/15 group-hover:bg-accent mx-auto rounded-full w-20 h-20 font-semibold text-accent group-hover:text-white text-2xl transition-colors duration-300">
                {member.initials}
              </div>
              <figcaption className="mt-6">
                <span className="block font-semibold text-xl">{member.name}</span>
                <span className="block mt-1 text-mist text-lg">{member.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
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
