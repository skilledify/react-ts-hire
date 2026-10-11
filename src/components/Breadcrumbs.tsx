import { Link, useLocation } from 'react-router'

const SEGMENT_LABELS: Record<string, string> = {
  about: 'About us',
  buying: 'Buying',
  renting: 'Renting',
  selling: 'Selling',
  contact: 'Contact us',
}

/**
 * Breadcrumbs based on the current location.
 * Home is always the first crumb, then every route segment.
 */
export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-base">
      <Link
        to="/"
        className="text-mist transition-colors duration-200 hover:text-accent"
      >
        Home
      </Link>
      {segments.map((segment) => (
        <span key={segment} className="flex items-center gap-2">
          <span aria-hidden="true" className="text-accent">
            /
          </span>
          <span className="capitalize text-cream">
            {SEGMENT_LABELS[segment] ?? segment}
          </span>
        </span>
      ))}
    </nav>
  )
}
