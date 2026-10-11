import type { FormEvent } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONTACT_INFO } from '../constants/global.constants'
interface FormState {
  name: string
  email: string
  phone: string
  topic: string
  message: string
}
const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  topic: 'Buying',
  message: '',
}
const topics = [
  'Buying',
  'Renting',
  'Selling',
  'Property valuation',
  'Other',
]
const fieldClass =
  'w-full border border-line bg-ink px-4 py-3 text-lg text-cream outline-none transition-colors focus:border-accent'
export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [sent, setSent] = useState(false)
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))
  const validate = (state: FormState) => {
    const next: Partial<FormState> = {}
    if (!state.name.trim()) next.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(state.email))
      next.email = 'Please enter a valid email'
    if (!state.message.trim()) next.message = 'Please describe your request'
    return next
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSent(true)
      setForm(initialState)
    }
  }
  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-ink-soft p-10 border border-accent text-center"
      >
        <div className="flex justify-center items-center bg-accent mx-auto rounded-full w-14 h-14 text-white text-2xl">
          ✓
        </div>
        <h3 className="mt-6 font-semibold text-2xl md:text-3xl">Thank you!</h3>
        <p className="mx-auto mt-4 max-w-[480px] text-mist text-lg leading-[1.7]">
          Your request has been sent. A Hire agent will contact you within
          one business day.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 px-8 py-4 border border-line hover:border-accent font-medium text-cream hover:text-accent text-lg transition-colors duration-200 cursor-pointer"
        >
          Send another request
        </button>
      </motion.div>
    )
  }
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="gap-6 grid bg-ink p-6 md:p-10 border border-line"
    >
      <div className="gap-6 grid sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-mist text-base">Your name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={fieldClass}
            placeholder="Ada Lovelace"
          />
          {errors.name && <span className="text-accent text-base">{errors.name}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-mist text-base">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={fieldClass}
            placeholder="you@example.com"
          />
          {errors.email && <span className="text-accent text-base">{errors.email}</span>}
        </label>
      </div>
      <div className="gap-6 grid sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-mist text-base">Phone (optional)</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={fieldClass}
            placeholder="+44 20 7946 0958"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-mist text-base">What is it about?</span>
          <select
            value={form.topic}
            onChange={(e) => update('topic', e.target.value)}
            className={`${fieldClass} [&>option]:bg-ink`}
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-mist text-base">Message</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClass} resize-y`}
          placeholder="Tell us a bit about what you are looking for…"
        />
        {errors.message && <span className="text-accent text-base">{errors.message}</span>}
      </label>
      <div className="flex items-center gap-6">
        <button
          type="submit"
          className="bg-accent px-10 py-4 font-medium text-white text-lg capitalize transition-colors duration-200 hover:bg-accent-dark cursor-pointer"
        >
          Send request
        </button>
        <a
          href={CONTACT_INFO.PHONE_HREF}
          className="text-mist hover:text-accent text-lg transition-colors duration-200"
        >
          {CONTACT_INFO.PHONE}
        </a>
      </div>
    </form>
  )
}
