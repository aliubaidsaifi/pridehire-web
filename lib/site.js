// Single source of truth for shared copy & navigation.
// Keeping content here keeps components lean and makes edits one-stop.

export const SITE = {
  name: 'PrideHire',
  tagline: 'Build. Scale. Automate.',
  description:
    'PrideHire is a digital product development agency helping companies design, build and scale websites, SaaS products and digital experiences.',
  email: 'hello@pridehire.com',
  contactEmail: 'hr@pridehire.com',
  location: 'Delhi, India',
  cta: {
    primary: 'Start Your Project',
    secondary: 'View Our Work',
  },
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES = [
  {
    slug: 'ui-ux',
    title: 'UI/UX Design',
    summary: 'Research-led product design that turns complexity into clarity.',
    points: ['Product research', 'Wireframes', 'Design systems', 'User experience'],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    summary: 'Fast, accessible, SEO-ready front-ends built to scale.',
    points: ['Next.js websites', 'React applications', 'Custom web platforms'],
  },
  {
    slug: 'saas-development',
    title: 'SaaS Development',
    summary: 'From MVP to multi-tenant platform — engineered for growth.',
    points: ['SaaS products', 'MVP development', 'Dashboard applications'],
  },
  {
    slug: 'branding',
    title: 'Branding',
    summary: 'Identity systems that make digital products feel inevitable.',
    points: ['Brand identity', 'Visual design', 'Digital strategy'],
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    summary: 'Growth engineering that compounds — measured, not guessed.',
    points: ['SEO', 'Growth marketing', 'Conversion optimization'],
  },
];

export const PROJECTS = [
  {
    title: 'Modora Élan',
    category: 'E-commerce Platform',
    tech: 'Next.js · MERN · Stripe',
    result: '2.4× conversion uplift',
    accent: 'from-violet-500/20 to-indigo-500/10',
  },
  {
    title: 'SalonFlow',
    category: 'Multi-tenant SaaS',
    tech: 'Node · MongoDB · React',
    result: '8 hrs/week saved per branch',
    accent: 'from-indigo-500/20 to-sky-500/10',
  },
  {
    title: 'Northwind Dashboard',
    category: 'Analytics SaaS',
    tech: 'Next.js · D3 · Postgres',
    result: '< 1.2s median load',
    accent: 'from-fuchsia-500/15 to-violet-500/10',
  },
  {
    title: 'Atlas Commerce',
    category: 'Headless Storefront',
    tech: 'React · GraphQL · Vercel',
    result: '99 Lighthouse score',
    accent: 'from-emerald-500/15 to-indigo-500/10',
  },
];

export const STATS = [
  { value: 120, suffix: '+', label: 'Projects Completed' },
  { value: 80, suffix: '+', label: 'Happy Clients' },
  { value: 6, suffix: '', label: 'Years Experience' },
  { value: 99, suffix: '%', label: 'On-time Delivery' },
];

export const WHY = [
  {
    title: 'Modern Development',
    body: 'Type-safe, component-driven engineering on a current stack — no legacy debt baked in.',
  },
  {
    title: 'Creative Design',
    body: 'Interfaces with a point of view. Every screen earns its place in the flow.',
  },
  {
    title: 'Fast Delivery',
    body: 'Tight sprints and a locked scope mean you ship in weeks, not quarters.',
  },
  {
    title: 'Scalable Solutions',
    body: 'Architecture decisions made for the version of you with 100× the traffic.',
  },
];

export const PROCESS = [
  { step: 'Discovery', body: 'We map the problem, users and constraints before a single pixel.' },
  { step: 'Strategy', body: 'Scope, architecture and a roadmap you can actually ship against.' },
  { step: 'Design', body: 'Systems-first design — accessible, on-brand, ready for engineering.' },
  { step: 'Development', body: 'Clean, tested, performant code with CI/CD from day one.' },
  { step: 'Launch', body: 'Deploy, measure, iterate. We optimise after the lights are on.' },
];

export const TESTIMONIALS = [
  {
    quote:
      'PrideHire rebuilt our storefront in six weeks and conversion jumped immediately. They think like product owners, not order-takers.',
    name: 'Aarav Mehta',
    role: 'Founder, Modora Élan',
  },
  {
    quote:
      'The multi-tenant architecture they designed scaled cleanly from one branch to twelve. Zero re-platforming.',
    name: 'Sara Khan',
    role: 'COO, SalonFlow',
  },
  {
    quote:
      'Fast, communicative, and genuinely good at the hard engineering. Our dashboard has never been quicker.',
    name: 'Daniel Roy',
    role: 'CTO, Northwind',
  },
];
