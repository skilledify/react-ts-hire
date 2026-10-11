import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import AuthLayout from '../components/AuthLayout'
import PasswordInput from '../components/PasswordInput'
import { AppRoutes, CONTACT_INFO } from '../constants/global.constants'
import { useAuth } from '../context/AuthContext'

interface LoginForm {
  email: string
  password: string
}

const initialState: LoginForm = {
  email: '',
  password: '',
}

const highlights = [
  'Verified listings with transparent pricing',
  'One dedicated advisor for the whole journey',
  'Save searches and get instant alerts',
]

/** Страница входа: аутентификация по email и паролю (localStorage). */
export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>(initialState)
  const [errors, setErrors] = useState<Partial<LoginForm>>({})
  const [formError, setFormError] = useState('')

  const update = <K extends keyof LoginForm>(key: K, value: LoginForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const validate = (state: LoginForm) => {
    const next: Partial<LoginForm> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(state.email))
      next.email = 'Please enter a valid email'
    if (!state.password) next.password = 'Please enter your password'
    return next
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError('')
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const result = login(form.email, form.password)
    if (!result.ok) {
      setFormError(result.error ?? 'Unable to sign in')
      return
    }
    navigate(AppRoutes.HOME_PAGE)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to reach your saved listings, alerts and your dedicated advisor."
      highlights={highlights}
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link
            to={AppRoutes.SIGNUP_PAGE}
            className="text-accent transition-colors duration-200 hover:text-accent-dark"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="grid gap-6">
        {formError && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="border border-accent/50 bg-accent/10 px-4 py-3 text-base text-accent"
          >
            {formError}
          </motion.p>
        )}

        <label className="flex flex-col gap-2">
          <span className="text-base text-mist">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="w-full border border-line bg-ink px-4 py-3 text-lg text-cream outline-none transition-colors focus:border-accent"
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <span className="text-base text-accent">{errors.email}</span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-base text-mist">Password</span>
          <PasswordInput
            id="login-password"
            value={form.password}
            onChange={(value) => update('password', value)}
            placeholder="Your password"
            autoComplete="current-password"
            invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <span className="text-base text-accent">{errors.password}</span>
          )}
        </label>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-base text-mist">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#63b59f]"
            />
            Remember me
          </label>
          <a
            href={CONTACT_INFO.EMAIL_HREF}
            className="text-base text-mist transition-colors duration-200 hover:text-accent"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-accent px-10 py-4 text-lg font-medium capitalize text-white transition-colors duration-200 hover:bg-accent-dark"
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  )
}
