// Temporary helper: extracts SVG paths from the legacy markup.
// Run once: node scripts/extract-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync(new URL('../legacy/index.html', import.meta.url), 'utf8')

const slice = (from, to) => html.slice(html.indexOf(from), html.indexOf(to))

const grabPaths = (block) =>
  [...block.matchAll(/\bd="([^"]+)"/g)].map((m) => m[1])

// 0. Inline "Hire" logo from the header (overrides the stray "Rentiz" file asset)
const logoSvg = html.match(/<svg[\s\S]*?<\/svg>/)?.[0]
if (logoSvg) {
  // Normalize multi-line markup into a compact single-line SVG file.
  const compact = logoSvg.replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim()
  writeFileSync(new URL('../public/img/logo.svg', import.meta.url), compact + '\n')
  console.log('logo.svg written (Hire wordmark):', compact.length, 'chars')
}

// 1. Feature icons inside the "popular" slider labels (bed / bath / area)
const popular = slice('popular__slider', 'why__container')
const iconSvgs = [...popular.matchAll(/<svg[\s\S]*?<\/svg>/g)].map((m) => m[0])
const uniqueIcons = new Map()
for (const svg of iconSvgs) {
  const paths = grabPaths(svg)
  const key = paths.join('|')
  if (!uniqueIcons.has(key)) uniqueIcons.set(key, paths)
}

// 2. Social icons in the footer
const socialsBlock = slice('footer__socials', 'links-footer')
const socialSvgs = [...socialsBlock.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(
  (m) => m[0],
)
const socials = socialSvgs.map((svg) => ({
  viewBox: svg.match(/viewBox="([^"]+)"/)?.[1] ?? '',
  paths: grabPaths(svg),
}))

// 3. Generate React icon components
const featureNames = ['BedIcon', 'BathIcon', 'AreaIcon']

const featureIcons = [...uniqueIcons.values()]
  .map(
    (paths, i) => `
export function ${featureNames[i] ?? `FeatureIcon${i}`}({ className = '' }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden="true">
${paths.map((p) => `      <path d="${p}" fill="currentColor" />`).join('\n')}
    </svg>
  )
}`,
  )
  .join('\n')

const socialNames = ['FacebookIcon', 'InstagramIcon', 'TwitterIcon', 'YoutubeIcon']

const socialIcons = socials
  .map(
    (s, i) => `
export function ${socialNames[i]}({ className = '' }) {
  return (
    <svg viewBox="${s.viewBox}" fill="none" className={className} aria-hidden="true">
${s.paths.map((p) => `      <path d="${p}" fill="currentColor" />`).join('\n')}
    </svg>
  )
}`,
  )
  .join('\n')

const file = `// Auto-generated from legacy/index.html by scripts/extract-icons.mjs
// Feature icons (bed / bath / area) and social icons, colored via currentColor.

${featureIcons}

${socialIcons}
`

writeFileSync(
  new URL('../src/components/icons.jsx', import.meta.url),
  file,
)
console.log(
  'icons written:',
  featureNames.length,
  'feature +',
  socialNames.length,
  'social',
)

