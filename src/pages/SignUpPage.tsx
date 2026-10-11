import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import AuthLayout from '../components/AuthLayout'
import PasswordInput from '../components/PasswordInput'
import { AppRoutes } from '../constants/global.constants'
import { useAuth } from '../context/AuthContext'
interface SignUpForm {
  name: string
  email: string
  password: string
  confirm: string
  terms: boolean
}
const initialState: SignUpForm = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  terms: false,
}
type SignUpErrors = Partial<Record<keyof SignUpForm, string>>
const highlights = [
  'Free first consultation, no obligation',
  'Verified listings updated daily',
  'Your data stays private — always',
]
export default function SignUpPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<SignUpForm>(initialState)
  const [errors, setErrors] = useState<SignUpErrors>({})
  const [formError, setFormError] = useState('')
  const update = <K extends keyof SignUpForm>(key: K, value: SignUpForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))
  const validate = (state: SignUpForm): SignUpErrors => {
    const next: SignUpErrors = {}
    if (!state.name.trim()) next.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(state.email))
      next.email = 'Please enter a valid email'
    if (state.password.length < 6) next.password = 'Use at least 6 characters'
    if (state.confirm !== state.password)
      next.confirm = 'Passwords do not match'
    if (!state.terms) next.terms = 'Please accept the terms to continue'
    return next
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError('')
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    const result = signUp(form.name, form.email, form.password)
    if (!result.ok) {
      setFormError(result.error ?? 'Unable to create account')
      return
    }
    navigate(AppRoutes.HOME_PAGE)
  }
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Hire to save favourites, track price changes and work with a dedicated advisor."
      highlights={highlights}
      footer={
        <>
          Already have an account?{' '}
          <Link
            to={AppRoutes.LOGIN_PAGE}
            className="text-accent transition-colors duration-200 hover:text-accent-dark"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="gap-6 grid">
        {formError && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="bg-accent/10 px-4 py-3 border border-accent/50 text-accent text-base"
          >
            {formError}
          </motion.p>
        )}
        <label className="flex flex-col gap-2">
          <span className="text-mist text-base">Full name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="bg-ink px-4 py-3 border border-line focus:border-accent outline-none w-full text-cream text-lg transition-colors"
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
          {errors.name && (
            <span className="text-accent text-base">{errors.name}</span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-mist text-base">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="bg-ink px-4 py-3 border border-line focus:border-accent outline-none w-full text-cream text-lg transition-colors"
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <span className="text-accent text-base">{errors.email}</span>
          )}
        </label>
        <div className="gap-6 grid sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-mist text-base">Password</span>
            <PasswordInput
              id="signup-password"
              value={form.password}
              onChange={(value) => update('password', value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              invalid={Boolean(errors.password)}
            />
            {errors.password && (
              <span className="text-accent text-base">{errors.password}</span>
            )}
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-mist text-base">Confirm password</span>
            <PasswordInput
              id="signup-confirm"
              value={form.confirm}
              onChange={(value) => update('confirm', value)}
              placeholder="Repeat password"
              autoComplete="new-password"
              invalid={Boolean(errors.confirm)}
            />
            {errors.confirm && (
              <span className="text-accent text-base">{errors.confirm}</span>
            )}
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-start gap-3 text-mist text-base">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => update('terms', e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#63b59f]"
            />
            <span>
              I agree to the{' '}
              <Link
                to={AppRoutes.CONTACT_PAGE}
                className="text-accent transition-colors duration-200 hover:text-accent-dark"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                to={AppRoutes.CONTACT_PAGE}
                className="text-accent transition-colors duration-200 hover:text-accent-dark"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.terms && (
            <span className="text-accent text-base">{errors.terms}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-accent px-10 py-4 font-medium text-white text-lg capitalize transition-colors duration-200 hover:bg-accent-dark cursor-pointer"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}
