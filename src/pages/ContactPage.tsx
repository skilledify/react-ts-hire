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
function ChannelsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto px-4 max-w-[1450px]">
        <div className="gap-6 grid md:grid-cols-3">
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
                className="group bg-ink-soft p-8 border border-line hover:border-accent transition-colors duration-300"
              >
                <span className="text-accent text-base">{channel.label}</span>
                <p className="mt-3 font-semibold group-hover:text-accent text-xl break-words transition-colors duration-300">
                  {channel.value}
                </p>
                <p className="mt-2 text-mist text-base">{channel.note}</p>
              </Tag>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center gap-6 mt-8">
          <span className="text-mist text-lg">Follow us</span>
          {socials.map(({ Icon, label }) => (
            <a
              key={label}
              href="#contact"
              aria-label={label}
              className="flex justify-center items-center border border-line hover:border-accent rounded-full w-11 h-11 text-mist hover:text-accent transition-colors duration-200"
            >
              <Icon className="w-5 h-5" />
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <div className="items-start gap-12 lg:gap-16 grid lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Reveal>
              <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
                Send a request
              </h2>
              <p className="mt-4 max-w-[560px] text-mist text-lg leading-[1.7]">
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
              <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
                Your advisor
              </h2>
            </Reveal>
            <div className="gap-6 grid mt-8">
              {team.slice(0, 3).map((member: TeamMember, i: number) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-center gap-5 bg-ink p-6 border border-line"
                >
                  <span className="flex justify-center items-center bg-accent/15 rounded-full w-14 h-14 font-semibold text-accent text-lg shrink-0">
                    {member.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-xl">{member.name}</p>
                    <p className="mt-1 text-mist text-base">{member.role}</p>
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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] text-center capitalize">
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
