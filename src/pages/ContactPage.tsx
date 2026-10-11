import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Accordion from '../components/Accordion'
import ContactForm from '../components/ContactForm'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../components/icons'
import { contactFaqs, team } from '../data/site'
import type { TeamMember } from '../data/site'
import { CONTACT_INFO } from '../constants/global.constants'

const channels = [
  {
    label: 'Call us',
    value: CONTACT_INFO.PHONE,
    href: CONTACT_INFO.PHONE_HREF,
    note: 'Fastest for urgent offer deadlines',
  },
  {
    label: 'Email us',
    value: CONTACT_INFO.EMAIL,
    href: CONTACT_INFO.EMAIL_HREF,
    note: 'We reply within one business day',
  },
  {
    label: 'Visit us',
    value: CONTACT_INFO.ADDRESS,
    href: undefined,
    note: CONTACT_INFO.HOURS,
  },
]

const socials = [
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: YoutubeIcon, label: 'YouTube' },
]

/* ---------------------------------- Секции ---------------------------------- */

function ChannelsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1450px] px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map((channel, i) => {
            const Tag = channel.href ? motion.a : motion.div
            return (
              <Tag
                key={channel.label}
                {...(channel.href ? { href: channel.href } : {})}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group border border-line bg-ink-soft p-8 transition-colors duration-300 hover:border-accent"
              >
                <span className="text-base text-accent">{channel.label}</span>
                <p className="mt-3 text-xl font-semibold break-words transition-colors duration-300 group-hover:text-accent">
                  {channel.value}
                </p>
                <p className="mt-2 text-base text-mist">{channel.note}</p>
              </Tag>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <span className="text-lg text-mist">Follow us</span>
          {socials.map(({ Icon, label }) => (
            <a
              key={label}
              href="#contact"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FormSection() {
  return (
    <section className="bg-ink-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
                Send a request
              </h2>
              <p className="mt-4 max-w-[560px] text-lg leading-[1.7] text-mist">
                Buying, renting, selling or just exploring — pick a topic and
                describe your goal. No call centre, no spam.
              </p>
            </Reveal>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
                Your advisor
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6">
              {team.slice(0, 3).map((member: TeamMember, i: number) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-center gap-5 border border-line bg-ink p-6"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/15 text-lg font-semibold text-accent">
                    {member.initials}
                  </span>
                  <div>
                    <p className="text-xl font-semibold">{member.name}</p>
                    <p className="mt-1 text-base text-mist">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactFaqSection() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Before you write
          </h2>
        </Reveal>
        <div className="mt-12">
          <Accordion items={contactFaqs} />
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Страница ---------------------------------- */

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="One free consultation, no obligation. Tell us what you are looking for and your advisor gets back within one business day."
      />
      <ChannelsSection />
      <FormSection />
      <ContactFaqSection />
    </>
  )
}
