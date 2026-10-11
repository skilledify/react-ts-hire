import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { footerColumns } from '../data/site'
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from './icons'
import Reveal from './Reveal'
import { AppRoutes, asset } from '../constants/global.constants'

interface Social {
  Icon: ComponentType<{ className?: string }>
  label: string
}

const socials: Social[] = [
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: YoutubeIcon, label: 'YouTube' },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer id="footer" className="bg-ink-soft pt-16 md:pt-32">
      <div className="mx-auto px-4 max-w-[1450px]">
        <div className="gap-10 lg:gap-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pb-14">
          <Reveal className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to={AppRoutes.HOME_PAGE}>
              <img src={asset('/img/logo.svg')} alt="Hire" className="w-auto h-11" />
            </Link>
            <p className="mt-[22px] max-w-[340px] text-mist text-lg leading-[1.7]">
              Neque, vestibulum sed varius magna et at. Eu, adipiscing morbi augue.
            </p>
            <div className="flex items-center gap-5 mt-8">
              {socials.map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#footer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#555e68] hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </Reveal>

          {footerColumns.map((column, i) => (
            <Reveal key={column.title} delay={0.08 * (i + 1)}>
              <h3 className="mb-3 font-semibold text-[26px] capitalize tracking-[0.01em]">
                {column.title}
              </h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="inline-block py-1 text-mist hover:text-white text-lg leading-[1.7] transition-all hover:translate-x-1 duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="inline-block py-1 text-mist text-lg leading-[1.7]">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-line border-t">
        <div className="flex md:flex-row flex-col justify-between items-center gap-6 mx-auto px-4 py-4 max-w-[1450px] md:text-left text-center">
          <span className="text-mist text-lg">
            Copyright ©TemplatesJungle {currentYear}. All right reserved
          </span>
          <span className="text-mist text-lg">Design by: Designer</span>
        </div>
      </div>
    </footer>
  )
}
