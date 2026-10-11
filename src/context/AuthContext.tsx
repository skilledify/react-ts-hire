import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
export interface User {
  id: string
  name: string
  email: string
}
interface StoredUser extends User {
  password: string
}
interface AuthResult {
  ok: boolean
  error?: string
}
interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => AuthResult
  signUp: (name: string, email: string, password: string) => AuthResult
  logout: () => void
}
const USERS_KEY = 'hire.users'
const SESSION_KEY = 'hire.session'
const AuthContext = createContext<AuthContextValue | undefined>(undefined)
function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredUser[]) : []
  } catch {
    return []
  }
}
function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
function readSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}
function makeId(): string {
  return `u_${Math.random().toString(36).slice(2, 10)}`
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    setUser(readSession())
  }, [])
  const login = useCallback((email: string, password: string): AuthResult => {
    const normalized = email.trim().toLowerCase()
    const found = readUsers().find((u) => u.email === normalized)
    if (!found || found.password !== password) {
      return { ok: false, error: 'Incorrect email or password' }
    }
    const { password: _pw, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    return { ok: true }
  }, [])
  const signUp = useCallback(
    (name: string, email: string, password: string): AuthResult => {
      const normalized = email.trim().toLowerCase()
      const users = readUsers()
      if (users.some((u) => u.email === normalized)) {
        return { ok: false, error: 'An account with this email already exists' }
      }
      const newUser: StoredUser = {
        id: makeId(),
        name: name.trim(),
        email: normalized,
        password,
      }
      writeUsers([...users, newUser])
      const { password: _pw, ...safeUser } = newUser
      setUser(safeUser)
      localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
      return { ok: true }
    },
    [],
  )
  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }, [])
  const value = useMemo<AuthContextValue>(
    () => ({ user, login, signUp, logout }),
    [user, login, signUp, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
