import { AppRoutes, asset } from '../constants/global.constants'

/* ---------------------------------- Хедер / футер ---------------------------------- */

export interface NavItem {
  label: string
  to: string
}

export const navLinks: NavItem[] = [
  { label: 'home', to: AppRoutes.HOME_PAGE },
  { label: 'About us', to: AppRoutes.ABOUT_PAGE },
  { label: 'Buying', to: AppRoutes.BUYING_PAGE },
  { label: 'Renting', to: AppRoutes.RENTING_PAGE },
  { label: 'Selling', to: AppRoutes.SELLING_PAGE },
  { label: 'Contact us', to: AppRoutes.CONTACT_PAGE },
]

export interface FooterLink {
  label: string
  /** Внутренний маршрут React Router; если не задан — текст без ссылки */
  to?: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Project',
    links: [
      { label: 'Houses', to: AppRoutes.BUYING_PAGE },
      { label: 'Rooms', to: AppRoutes.RENTING_PAGE },
      { label: 'Flats', to: AppRoutes.RENTING_PAGE },
      { label: 'Appartments', to: AppRoutes.SELLING_PAGE },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'How we work ?', to: AppRoutes.ABOUT_PAGE },
      { label: 'Capital', to: AppRoutes.SELLING_PAGE },
      { label: 'Security', to: AppRoutes.CONTACT_PAGE },
    ],
  },
  {
    title: 'Movement',
    links: [
      { label: 'Who are we', to: AppRoutes.ABOUT_PAGE },
      { label: 'Support us', to: AppRoutes.CONTACT_PAGE },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Privacy', to: AppRoutes.CONTACT_PAGE },
      { label: 'Condition', to: AppRoutes.CONTACT_PAGE },
      { label: 'Blog' },
      { label: 'FAQs', to: AppRoutes.CONTACT_PAGE },
    ],
  },
]

/* ---------------------------------- Главная страница ---------------------------------- */

export interface FilterOptionConfig {
  key: string
  label: string
  options: string[]
}

export const filterConfig: FilterOptionConfig[] = [
  {
    key: 'purpose',
    label: 'Purpose',
    options: ['Buy', 'Sell'],
  },
  {
    key: 'location',
    label: 'Location',
    options: ['Toronto, Canada', 'Paris, France', 'Moscow, Russia'],
  },
  {
    key: 'type',
    label: 'Type',
    options: ['Industrial home', 'Сарай', 'Подвал'],
  },
]

export const logos: string[] = [
  asset('/img/logos/1.svg'),
  asset('/img/logos/2.svg'),
  asset('/img/logos/3.svg'),
  asset('/img/logos/4.svg'),
  asset('/img/logos/5.svg'),
]

export interface Property {
  id: number
  title: string
  address: string
  image: string
  beds: number
  baths: number
  area: number
}

export const properties: Property[] = [
  {
    id: 1,
    title: 'Aliva Priva Jalvin',
    address: '1087 Pin Oak Drive, Clinton, USA',
    image: asset('/img/slider/1.jpg'),
    beds: 4,
    baths: 2,
    area: 1203,
  },
  {
    id: 2,
    title: 'Hard line orchar',
    address: '1087 Pin Oak Drive, Clinton, USA',
    image: asset('/img/slider/2.jpg'),
    beds: 4,
    baths: 2,
    area: 1203,
  },
  {
    id: 3,
    title: 'Allpine lenevote',
    address: '1087 Pin Oak Drive, Clinton, USA',
    image: asset('/img/slider/3.jpg'),
    beds: 4,
    baths: 2,
    area: 1203,
  },
  {
    id: 4,
    title: 'Aliva Priva Jalvin',
    address: '1087 Pin Oak Drive, Clinton, USA',
    image: asset('/img/slider/1.jpg'),
    beds: 3,
    baths: 2,
    area: 1203,
  },
  {
    id: 5,
    title: 'Hard line orchar',
    address: '1087 Pin Oak Drive, Clinton, USA',
    image: asset('/img/slider/2.jpg'),
    beds: 5,
    baths: 3,
    area: 1450,
  },
  {
    id: 6,
    title: 'Allpine lenevote',
    address: '1087 Pin Oak Drive, Clinton, USA',
    image: asset('/img/slider/3.jpg'),
    beds: 4,
    baths: 1,
    area: 980,
  },
]

export interface Review {
  id: number
  text: string
  name: string
  job: string
}

export const reviews: Review[] = [
  {
    id: 1,
    text: 'Massa semper non rutrum orci facilisi sit. Lectus porta quam a fringilla eget viverra sem. Vulputate massa hendrerit turpis gravida tempor, porttitor.',
    name: 'Elena Pravo',
    job: 'Ceo, Upstate',
  },
  {
    id: 2,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem ullam veniam, corrupti veritatis quam iure alias iusto non voluptatum cum? Expedita perspiciatis sunt laudantium ipsum quasi. Optio ut voluptates accusantium ratione doloremque, aut laboriosam voluptas error molestias odio.',
    name: 'Mark Jenkins',
    job: 'Founder, Domus',
  },
  {
    id: 3,
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quod similique quisquam officiis. Ipsum nemo fugiat laborum beatae doloremque officia impedit totam commodi, quos dolor hic repellat dolores qui! Laborum dignissimos porro vero iure a cumque voluptate placeat.',
    name: 'Sara Lowell',
    job: 'Agent, Nestwell',
  },
]

export const galleryColumns: string[][] = [
  [
    asset('/img/gallery/1.jpg'),
    asset('/img/gallery/2.jpg'),
    asset('/img/gallery/3.jpg'),
    asset('/img/gallery/4.jpg'),
    asset('/img/gallery/5.jpg'),
  ],
  [
    asset('/img/gallery/6.jpg'),
    asset('/img/gallery/7.jpg'),
    asset('/img/gallery/8.jpg'),
    asset('/img/gallery/9.jpg'),
    asset('/img/gallery/10.jpg'),
    asset('/img/gallery/11.jpg'),
  ],
]

/* ---------------------------------- Аренда (Renting) ---------------------------------- */

export type RentalType = 'Apartment' | 'House' | 'Townhouse' | 'Studio'

export interface Rental {
  id: number
  title: string
  address: string
  image: string
  beds: number
  baths: number
  area: number
  /** Аренда в месяц, USD */
  price: number
  type: RentalType
}

export const rentalTypes: RentalType[] = ['Apartment', 'House', 'Townhouse', 'Studio']

export const rentals: Rental[] = [
  {
    id: 1,
    title: 'Sunlit loft on Clinton',
    address: '218 Willow St, Clinton, USA',
    image: asset('/img/gallery/1.jpg'),
    beds: 2,
    baths: 1,
    area: 780,
    price: 1850,
    type: 'Apartment',
  },
  {
    id: 2,
    title: 'Riverside studio',
    address: '47 Quay Road, Toronto, Canada',
    image: asset('/img/gallery/2.jpg'),
    beds: 1,
    baths: 1,
    area: 460,
    price: 1250,
    type: 'Studio',
  },
  {
    id: 3,
    title: 'Maple townhouse',
    address: '9 Maple Crescent, Toronto, Canada',
    image: asset('/img/gallery/3.jpg'),
    beds: 3,
    baths: 2,
    area: 1340,
    price: 2650,
    type: 'Townhouse',
  },
  {
    id: 4,
    title: 'Park view apartment',
    address: '12 Rue des Lilas, Paris, France',
    image: asset('/img/gallery/4.jpg'),
    beds: 2,
    baths: 2,
    area: 950,
    price: 2100,
    type: 'Apartment',
  },
  {
    id: 5,
    title: 'Oak family house',
    address: '350 Pin Oak Drive, Clinton, USA',
    image: asset('/img/gallery/5.jpg'),
    beds: 4,
    baths: 3,
    area: 1820,
    price: 3400,
    type: 'House',
  },
  {
    id: 6,
    title: 'Nordic compact flat',
    address: '6 Sjogatan, Moscow, Russia',
    image: asset('/img/gallery/6.jpg'),
    beds: 1,
    baths: 1,
    area: 540,
    price: 1350,
    type: 'Apartment',
  },
  {
    id: 7,
    title: 'Garden townhouse',
    address: '84 Elmsworth Ave, Toronto, Canada',
    image: asset('/img/gallery/7.jpg'),
    beds: 3,
    baths: 2,
    area: 1260,
    price: 2480,
    type: 'Townhouse',
  },
  {
    id: 8,
    title: 'Skyline penthouse',
    address: '22 Place Vendome, Paris, France',
    image: asset('/img/gallery/8.jpg'),
    beds: 3,
    baths: 2,
    area: 1450,
    price: 4200,
    type: 'Apartment',
  },
]

/* ---------------------------------- About ---------------------------------- */

export interface Stat {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 12, suffix: '+', label: 'Years on the market' },
  { value: 4800, suffix: '+', label: 'Happy families' },
  { value: 1350, suffix: '+', label: 'Homes closed' },
  { value: 98, suffix: '%', label: 'Satisfaction rate' },
]

export interface TimelineItem {
  year: string
  title: string
  text: string
}

export const timeline: TimelineItem[] = [
  {
    year: '2014',
    title: 'The first key',
    text: 'Three agents, one small office and a simple promise: people before properties.',
  },
  {
    year: '2017',
    title: 'Regional growth',
    text: 'We opened desks in Toronto and Paris, building a network of true local experts.',
  },
  {
    year: '2020',
    title: 'Digital-first viewings',
    text: 'Virtual tours and remote closings let clients buy a home without leaving the sofa.',
  },
  {
    year: '2023',
    title: '10,000 doors',
    text: 'Our community passed ten thousand families who found their place through Hire.',
  },
  {
    year: '2026',
    title: 'Full-cycle agency',
    text: 'Buying, renting and selling — with one dedicated manager per client from start to keys.',
  },
]

export interface TeamMember {
  name: string
  role: string
  initials: string
}

export const team: TeamMember[] = [
  { name: 'Amelia Hart', role: 'Founder & CEO', initials: 'AH' },
  { name: 'Daniel Okoye', role: 'Head of Sales', initials: 'DO' },
  { name: 'Sofia Marchetti', role: 'Rental Director', initials: 'SM' },
  { name: 'Liam Novak', role: 'Lead Advisor', initials: 'LN' },
]

export interface ValueItem {
  title: string
  text: string
}

export const values: ValueItem[] = [
  {
    title: 'Transparency',
    text: 'No hidden fees and no fine print. You see every number and every document before you sign anything.',
  },
  {
    title: 'People first',
    text: 'We listen before we show. Your routine, budget and plans shape the shortlist — not the other way around.',
  },
  {
    title: 'Speed with care',
    text: 'Offers within 24 hours and closings in weeks — without ever skipping a due-diligence step.',
  },
  {
    title: 'Local expertise',
    text: 'Agents who actually live in the neighbourhoods they sell, with fresh data on every street.',
  },
]

/* ---------------------------------- Buying ---------------------------------- */

export interface Step {
  title: string
  text: string
}

export const buyingSteps: Step[] = [
  {
    title: 'Share your wish list',
    text: 'Tell us the budget, the neighbourhood and the non-negotiables. It takes five minutes and shapes everything that follows.',
  },
  {
    title: 'Get a curated shortlist',
    text: 'We match you with verified listings — including off-market homes — and schedule tours around your calendar.',
  },
  {
    title: 'Make a smart offer',
    text: 'Your advisor builds a comparative market analysis so your offer is competitive, not reckless.',
  },
  {
    title: 'Inspect & secure',
    text: 'We coordinate the inspection, appraisal and mortgage paperwork, chasing every deadline for you.',
  },
  {
    title: 'Get the keys',
    text: 'Review the closing statement, sign remotely or in person, collect the keys — and keep a 12-month support line.',
  },
]

export interface Faq {
  question: string
  answer: string
}

export const buyingFaqs: Faq[] = [
  {
    question: 'How much deposit do I need?',
    answer:
      'Most lenders ask for 5–20% of the price. A 20% down payment removes private mortgage insurance and usually unlocks a better rate — we will model every option with you before you choose.',
  },
  {
    question: 'Can I buy while still renting?',
    answer:
      'Yes, it is common. We coordinate the closing date with your lease so you never pay two homes for longer than absolutely needed.',
  },
  {
    question: 'What extra costs should I expect?',
    answer:
      'Budget 2–5% of the price for closing costs, plus legal fees, moving and a small reserve for immediate repairs. Your advisor sends a full estimate before you ever offer.',
  },
  {
    question: 'How long does the process take?',
    answer:
      'From first viewing to keys it takes 30–60 days on average. Cash purchases can close in as little as two weeks.',
  },
  {
    question: 'Do you help with mortgages?',
    answer:
      'We compare offers from 12+ lenders and negotiate the terms on your behalf — completely free if you finance through one of our partners.',
  },
]

/* ---------------------------------- Selling ---------------------------------- */

export const sellingSteps: Step[] = [
  {
    title: 'Free valuation',
    text: 'We walk the property, compare it with 20+ recent sales and send a realistic price range within 48 hours.',
  },
  {
    title: 'Prepare the home',
    text: 'Styling checklist, professional photos, floor plan and a 3D tour — all included in the full-service plan.',
  },
  {
    title: 'Launch to the market',
    text: 'Your listing goes live on the major portals and straight to our database of 4,800 pre-qualified buyers.',
  },
  {
    title: 'Negotiate offers',
    text: 'You receive every offer in writing with our recommendation, so you can decide with the full picture.',
  },
  {
    title: 'Close & settle',
    text: 'We handle legal paperwork, redemption statements and the final walk-through until the money lands.',
  },
]

export interface SellingPlan {
  name: string
  price: string
  note: string
  features: string[]
  featured: boolean
}

export const sellingPlans: SellingPlan[] = [
  {
    name: 'Basic',
    price: '2.5%',
    note: 'List only',
    features: ['Professional photos', 'Portal listings', 'Standard viewings', 'Email support'],
    featured: false,
  },
  {
    name: 'Full Service',
    price: '4%',
    note: 'Most popular',
    features: [
      'Everything in Basic',
      'Home staging consult',
      '3D tour & floor plan',
      'Dedicated advisor',
      'Open house events',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    price: '6%',
    note: 'White glove',
    features: [
      'Everything in Full Service',
      'Priority top placement',
      'Interior styling crew',
      'Buyer bidding orchestration',
      'Post-sale support',
    ],
    featured: false,
  },
]

export const sellingFaqs: Faq[] = [
  {
    question: 'What does it cost to list with Hire?',
    answer:
      'Our Basic plan charges 2.5% only when the home sells — no upfront fees and no staging surcharge for standard preparation.',
  },
  {
    question: 'Should I renovate before selling?',
    answer:
      'Rarely. Small cosmetic fixes and decluttering recoup far more than major works. We run a room-by-room ROI check during the free valuation.',
  },
  {
    question: 'How is the asking price determined?',
    answer:
      'A comparative market analysis of at least 20 recent sales within 2 km, adjusted for size, condition and demand — plus buyer-activity data from the last 30 days.',
  },
  {
    question: 'Can I sell and buy at the same time?',
    answer:
      'Yes. We synchronise both chains, negotiate rent-back when needed and aim for a single moving day with zero double-mortgage overlap.',
  },
]

export const rentingFaqs: Faq[] = [
  {
    question: 'What documents do I need?',
    answer:
      'A valid ID, proof of income (2–3 payslips or a tax return) and a reference from your previous landlord. Students and relocators can add a guarantor.',
  },
  {
    question: 'How much do I pay upfront?',
    answer:
      'Usually the first month, a security deposit of one month and — where legal — the last month. We never charge above the statutory cap in your region.',
  },
  {
    question: 'Can I negotiate the rent?',
    answer:
      'Often yes. A longer lease, an off-season move-in or immediate availability all give us room. Your advisor handles the negotiation for you.',
  },
  {
    question: 'How fast can I move in?',
    answer:
      'Applications are reviewed within 24–48 hours, and most of our listings hand over keys the same week you apply.',
  },
]

export const contactFaqs: Faq[] = [
  {
    question: 'Is the first consultation free?',
    answer:
      'Yes. The first 30-minute consultation — in our office, by phone or online — is always free and comes with no obligation.',
  },
  {
    question: 'Which areas do you cover?',
    answer:
      'Toronto and the Greater Toronto Area, Paris and the Moscow region, plus remote assistance for international relocations.',
  },
  {
    question: 'Can I book a viewing outside office hours?',
    answer:
      'Absolutely. Evening and weekend slots are available — mention the preferred time in the form and we will confirm it the same day.',
  },
  {
    question: 'How quickly do you reply?',
    answer:
      'Within one business day for every enquiry, and the same day for anything marked urgent, such as an offer deadline.',
  },
]




