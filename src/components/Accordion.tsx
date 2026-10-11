import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Faq } from '../data/site'
interface AccordionProps {
  items: Faq[]
}
export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-[900px]">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="border-line border-b"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex justify-between items-center gap-4 py-6 w-full text-left cursor-pointer"
            >
              <span className="font-medium text-lg md:text-xl">{item.question}</span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex justify-center items-center border border-accent rounded-full w-9 h-9 text-accent shrink-0"
              >
                <span className="absolute bg-accent w-[2px] h-[14px]" />
                <span className="absolute bg-accent w-[14px] h-[2px]" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pr-10 pb-6 text-mist text-lg leading-[1.7]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
