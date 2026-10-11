import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { AppRoutes, CONTACT_INFO } from '../constants/global.constants'
import { navLinks } from '../data/site'
export default function NotFoundPage() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto px-4 max-w-[1450px]">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-semibold text-[clamp(4rem,2.5rem+11vw,9rem)] text-accent leading-none"
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-semibold text-[clamp(1.75rem,1.3rem+2.2vw,3rem)] capitalize"
        >
          This page has moved out
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-4 max-w-[620px] text-mist text-lg leading-[1.7]"
        >
          The address you followed does not exist. Try one of the sections below
          or call us on{' '}
          <a
            href={CONTACT_INFO.PHONE_HREF}
            className="text-accent transition-colors duration-200 hover:text-accent-dark"
          >
            {CONTACT_INFO.PHONE}
          </a>
          .
        </motion.p>
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          aria-label="Site sections"
          className="flex flex-wrap gap-4 mt-10"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-6 py-3 border border-line hover:border-accent text-cream hover:text-accent text-lg capitalize transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-10"
        >
          <Link
            to={AppRoutes.HOME_PAGE}
            className="inline-block bg-accent px-8 py-4 font-medium text-white text-lg capitalize transition-colors duration-200 hover:bg-accent-dark"
          >
            Back to homepage
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
