import { Link, useLocation } from 'react-router'
const SEGMENT_LABELS: Record<string, string> = {
  about: 'About us',
  buying: 'Buying',
  renting: 'Renting',
  selling: 'Selling',
  contact: 'Contact us',
}
export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-base">
      <Link
        to="/"
        className="text-mist hover:text-accent transition-colors duration-200"
      >
        Home
      </Link>
      {segments.map((segment) => (
        <span key={segment} className="flex items-center gap-2">
          <span aria-hidden="true" className="text-accent">
            /
          </span>
          <span className="text-cream capitalize">
            {SEGMENT_LABELS[segment] ?? segment}
          </span>
        </span>
      ))}
    </nav>
  )
}
