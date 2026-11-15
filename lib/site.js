export const SITE = {
  name: 'Pride Hire',
  tagline: 'Premium digital solutions that grow your business.',
  description: 'Pride Hire helps businesses generate more leads, customers and sales with premium digital solutions — websites, design, ads and automation.',
  email: 'contact@pridehire.com',
  contactEmail: 'contact@pridehire.com',
  phone: '+919456615609',
  whatsapp: '919456615609',
  calendly: 'https://calendly.com/pridehire/free-consultation',
  location: 'Delhi NCR, India, Remotly Worldwide',
  cta: { primary: 'Get Free Website Audit', secondary: 'Book Free Consultation' },
};
export const OFFICES = [
  { label: 'India (Head Office)', address: 'Delhi NCR\nRemote Delivery Worldwide' },
];

export const NAV = [
  
   { label: 'Company', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const TRUST_POINTS = ['Transparent Communication', 'Latest Technologies', 'Results Driven', 'Long Term Partnership'];

// TODO(content): add REAL client names/logos here (only with the client's permission). Marquee hides itself while empty.
export const CLIENTS = [];

// Only claims that are commitments or verifiable facts. Removed as unverified: '5.0 Star Rated', '100+ Projects', '5 Countries',
// '5+ Years', '100% Satisfaction'. TODO(content): re-add any of these ONLY with real, provable figures.
export const TRUST_STATS = [
  { value: '24h', label: 'Response Time' },
];
export const TRUST_BADGES = ['Free Consultation', 'No Long-Term Contracts'];
export const BUSINESS_HOURS = 'Mon – Sat';

export const SERVICES = [
  { slug: 'website-development', title: 'Website Development', outcome: 'High-converting websites built to generate leads and sales.', points: ['Mobile-first', 'Built to convert', 'Fast loading'] },
  { slug: 'graphic-design', title: 'Graphic Design', outcome: 'Logos, brand identity and creative design that builds trust.', points: ['Logo design', 'Brand identity', 'Marketing materials'] },
  { slug: 'business-automation', title: 'Business Automation', outcome: 'Automate workflows, save time and never miss a lead again.', points: ['Auto-replies', 'Follow-ups', 'CRM automation'] },
  { slug: 'meta-ads', title: 'Meta Ads', outcome: 'Facebook & Instagram campaigns that fill your calendar.', points: ['Lead campaigns', 'Retargeting', 'Creative that converts'] },
  { slug: 'google-ads', title: 'Google Ads', outcome: 'Reach people ready to buy — show up first on Google today.', points: ['Search & Maps ads', 'Call tracking', 'ROI-focused'] },
  { slug: 'seo', title: 'SEO', outcome: 'Get discovered by customers searching on Google organically.', points: ['Local SEO', 'Google Business Profile', 'Rank higher'] },
];



export const WHY = [
  { title: 'Transparent Communication', body: 'No jargon, no hidden fees. You always know what we are working on, why we are doing it, and what results to expect. Regular updates keep you fully in control.' },
  { title: 'Latest Technologies', body: 'We stay ahead of the curve — using cutting-edge tools, frameworks and AI-powered automation to deliver faster, smarter and more effective digital solutions.' },
  { title: 'Results Driven', body: 'Every decision we make is tied to your business goals. We measure success by the leads, sales and growth we generate for your business — not vanity metrics.' },
  { title: 'Long Term Partnership', body: 'We are not a one-project agency. We invest in your success for the long haul — growing alongside your business and continuously improving your digital presence.' },
];

// Verified client reviews ONLY. Shape: { name, business, role, rating (1-5), comment, source, date }
// TODO(content): add genuine reviews received through /api/review or a public profile (Google, Clutch), with permission.
// NEVER add review/aggregateRating structured data unless the reviews are real, visible on-page, and independently verifiable.
export const REVIEWS = [];

/**
 * PORTFOLIO DATA MODEL — verifiable work only.
 * To add a project: append an object below AND an entry in PROJECT_DETAILS with the same slug.
 *   slug      url-safe id (/portfolio/<slug>)
 *   client    real client / product name
 *   tag       short descriptor shown on cards, e.g. 'E-commerce · Fashion'
 *   category  one of PROJECT_CATEGORIES
 *   blurb     one factual sentence
 *   image     /portfolio/<file>.webp (real screenshot)
 *   url       live URL, or null  (TODO: supply)
 *   metrics   [{ value, label, verified, source }]  — a metric is shown ONLY when verified === true
 *             `source` = where the number comes from (analytics export, client email, etc). Never publish an unsourced number.
 */
export const PROJECTS = [
  {
    slug: 'modora-elan', client: 'Modora Élan', tag: 'E-commerce · Fashion', category: 'Websites',
    blurb: 'A premium modest-wear online store.', image: '/portfolio/modora-elan.webp', url: null, // TODO(content): live URL
    metrics: [{ value: '2.4×', label: 'more online sales', verified: false, source: null }], // TODO(content): confirm + cite, then set verified: true
  },
  {
    slug: 'salonflow', client: 'SalonFlow', tag: 'SaaS · Salon ERP', category: 'Automation',
    blurb: 'A multi-tenant platform for running a salon.', image: '/portfolio/salonflow.webp', url: null, // TODO(content): live URL
    metrics: [{ value: '30+', label: 'salons onboarded', verified: false, source: null }], // TODO(content): confirm + cite, then set verified: true
  },
];
export const verifiedMetrics = (metrics = []) => metrics.filter((m) => m.verified && m.source);

// Back-compat shape used by cards: first verified metric (if any) flattened to metric/label.
export const RESULTS = PROJECTS.map((p) => {
  const m = verifiedMetrics(p.metrics)[0];
  return { ...p, metric: m?.value ?? null, label: m?.label ?? null };
});
export const PROJECT_CATEGORIES = ['All Projects', 'Websites', 'Branding', 'SEO', 'Google Ads', 'Meta Ads', 'Automation'];

export const PROCESS = [
  { step: 'Audit', body: 'We review your site, Google presence and competitors — free.' },
  { step: 'Plan', body: 'A clear, honest plan and quote. You decide what makes sense.' },
  { step: 'Build', body: 'We design, build and launch — fast, and built to convert.' },
  { step: 'Grow', body: 'SEO, ads and improvements that turn traffic into customers.' },
];

export const FAQS = [
  { q: 'How much does it cost?', a: 'It depends on what you need. You’ll get a clear, fixed quote after your free audit — with no surprises and no hidden fees.' },
  { q: 'Do you lock me into a contract?', a: 'No. There are no lock-in contracts. You own your website, domain and accounts.' },
  { q: 'How long does it take?', a: 'Most local-business websites go live in 2–4 weeks. SEO and ads build momentum over the following weeks.' },
  { q: 'Do I really need a new website?', a: 'Maybe not. That’s exactly what the free audit tells you — honestly.' },
  { q: 'Do you work outside Auckland?', a: 'Yes — we focus on Auckland and greater New Zealand, but work with good businesses anywhere.' },
];

export const VALUES_CLOSING = 'Trust is earned through honesty. Growth is earned through excellence.';

export const LOCAL_PAGES = [
  { slug: 'web-design-auckland', title: 'Web Design Auckland', h1: 'Web Design in Auckland that wins you customers', intro: 'Premium, fast, mobile-first websites for Auckland businesses — designed to turn visitors into calls, bookings and sales.', benefits: ['Loads in under 2 seconds', 'Designed to convert visitors into enquiries', 'Mobile-first for how Kiwis actually browse', 'SEO-ready from day one'], keywords: 'web design Auckland, website designer Auckland, Auckland web development' },
  { slug: 'seo-auckland', title: 'SEO Auckland', h1: 'SEO in Auckland that gets your phone ringing', intro: 'Rank on Google when Aucklanders search for your service — local SEO, Google Business Profile and content that brings real enquiries.', benefits: ['Rank for “near me” and suburb searches', 'Google Business Profile optimisation', 'Honest monthly reporting', 'No lock-in contracts'], keywords: 'SEO Auckland, local SEO Auckland, Auckland SEO agency' },
  { slug: 'google-ads-auckland', title: 'Google Ads Auckland', h1: 'Google Ads in Auckland that pay for themselves', intro: 'Show up first on Google today. ROI-focused Search and Maps campaigns with call tracking — so you know exactly what every dollar returns.', benefits: ['Leads from day one', 'Call tracking on every campaign', 'Suburb-level targeting', 'Transparent ad spend — you own the account'], keywords: 'Google Ads Auckland, PPC Auckland, Google Ads agency Auckland' },
  { slug: 'meta-ads-auckland', title: 'Meta Ads Auckland', h1: 'Facebook & Instagram Ads for Auckland businesses', intro: 'Reach new local customers on Facebook and Instagram with creative that converts and lead campaigns that fill your calendar.', benefits: ['Local audience targeting', 'Lead forms that actually get filled', 'Retargeting website visitors', 'Creative done for you'], keywords: 'Meta Ads Auckland, Facebook Ads Auckland, Instagram Ads Auckland' },
  { slug: 'ecommerce-auckland', title: 'Ecommerce Auckland', h1: 'Ecommerce websites in Auckland built to sell', intro: 'Shopify and custom online stores for NZ businesses — fast product pages, smooth checkout and marketing that drives sales.', benefits: ['Shopify or fully custom builds', 'Optimised product pages', 'Secure NZ payment options', 'Email & ads integration'], keywords: 'ecommerce Auckland, Shopify developer Auckland, online store NZ' },
];

// Rich detail content for each service page (/services/<slug>).
export const SERVICE_DETAILS = {
  'website-development': {
    heroTitle: 'Websites that turn visitors into customers',
    intro: 'A website should do more than look good — it should bring you enquiries while you sleep. We build fast, modern, mobile-first sites designed around one goal: turning the people who land on your page into people who contact you.',
    criteria: [
      { title: 'Built to convert', body: 'Every page is designed to guide visitors toward calling, booking or enquiring — not just to look pretty.' },
      { title: 'Fast on every device', body: 'Optimised to load in under two seconds, because slow sites lose customers before they even see you.' },
      { title: 'Found on Google', body: 'Clean, SEO-ready structure so search engines understand and rank your business.' },
      { title: 'Yours to keep', body: 'You own the website, domain and every account. No lock-in, no hostage situations.' },
    ],
    stages: ['Discovery & goals', 'Design & content', 'Development', 'Testing & speed', 'Launch', 'Support & growth'],
  },
  'graphic-design': {
    heroTitle: 'Design that makes you look established',
    intro: 'People judge your business in seconds. Strong, consistent design tells them you are professional, trustworthy and worth their money — before they read a single word. We craft the logos, brand kits and visuals that make small businesses look premium.',
    criteria: [
      { title: 'Memorable identity', body: 'A logo and brand system that stands out and sticks in your customers’ minds.' },
      { title: 'Consistent everywhere', body: 'The same premium look across your site, socials, ads and print — building instant recognition.' },
      { title: 'Built for conversions', body: 'Ad creatives and graphics designed to stop the scroll and drive action.' },
      { title: 'Ready to use', body: 'Print-ready and web-ready files delivered in every format you’ll ever need.' },
    ],
    stages: ['Brand discovery', 'Concepts', 'Refinement', 'Brand kit', 'Asset delivery', 'Ongoing design'],
  },
  'business-automation': {
    heroTitle: 'Automate the busywork, never miss a lead',
    intro: 'You didn’t start a business to answer the same message fifty times a day. We set up smart automation that handles enquiries, follow-ups and repetitive tasks — so leads get instant replies and nothing slips through the cracks.',
    criteria: [
      { title: 'Instant lead response', body: 'Every enquiry gets an immediate, professional reply — even at 2am.' },
      { title: 'Automated follow-ups', body: 'Gentle reminders that turn maybes into customers, without you lifting a finger.' },
      { title: 'Everything connected', body: 'Your forms, inbox, CRM and calendar working together as one system.' },
      { title: 'AI where it helps', body: 'Smart replies and workflows that save hours every week.' },
    ],
    stages: ['Audit your workflow', 'Map automations', 'Build & connect', 'Test', 'Go live', 'Optimise'],
  },
  'meta-ads': {
    heroTitle: 'Facebook & Instagram ads that fill your calendar',
    intro: 'Billions of people scroll Meta every day — including your future customers. We build targeted Facebook and Instagram campaigns that put your business in front of the right people and turn attention into real enquiries.',
    criteria: [
      { title: 'The right audience', body: 'Laser-targeted to the people most likely to buy — not wasted on everyone else.' },
      { title: 'Scroll-stopping creative', body: 'Ads designed to grab attention and drive action in a crowded feed.' },
      { title: 'Retargeting that works', body: 'Bring back the people who showed interest but didn’t enquire the first time.' },
      { title: 'Clear reporting', body: 'You always know exactly what you spent and what it brought in.' },
    ],
    stages: ['Strategy', 'Audience research', 'Creative', 'Launch', 'Optimise', 'Scale'],
  },
  'google-ads': {
    heroTitle: 'Show up first when people are ready to buy',
    intro: 'When someone searches for what you offer, they’re ready to act. Google Ads puts you at the very top of that moment. We run lean, ROI-focused Search and Maps campaigns that bring in calls and enquiries from day one.',
    criteria: [
      { title: 'Buyer-intent keywords', body: 'We target searches from people ready to hire, not just browse.' },
      { title: 'Call tracking', body: 'Every lead is traceable, so you know exactly which ads bring the phone calls.' },
      { title: 'No wasted spend', body: 'Tight targeting and negative keywords keep every dollar working.' },
      { title: 'Full ownership', body: 'The ad account is yours, with plain-English monthly reporting.' },
    ],
    stages: ['Keyword research', 'Campaign build', 'Landing pages', 'Launch', 'Optimise', 'Report'],
  },
  'seo': {
    heroTitle: 'Get found on Google — free, long-term traffic',
    intro: 'SEO is the work that makes your business the answer Google gives when someone searches for what you do. It takes time, but it compounds — bringing free, high-intent traffic month after month, long after the work is done.',
    criteria: [
      { title: 'Local visibility', body: 'Rank in Maps and local searches where your customers actually are.' },
      { title: 'On-page SEO', body: 'Pages structured so Google understands exactly what you offer and where.' },
      { title: 'Google Business Profile', body: 'Optimised and managed to drive calls, directions and bookings.' },
      { title: 'Honest reporting', body: 'Clear monthly reports on rankings and traffic — no vanity metrics.' },
    ],
    stages: ['SEO audit', 'Keyword strategy', 'On-page fixes', 'Local SEO', 'Content', 'Monthly growth'],
  },
};

// Blog posts — empty for now; add entries and the blog grid appears automatically.
export const POSTS = [];


// Per-project case study content (/portfolio/<slug>)
export const PROJECT_DETAILS = {
  'modora-elan': {
    headline: 'A premium modest-wear store built to convert browsers into buyers.',
    intro: 'Modora Élan needed an online store that felt as premium as the clothing itself — fast, elegant, and built so that browsing turns into buying rather than bouncing.',
    timeline: '5 weeks',
    services: ['Ecommerce Development', 'UI/UX Design', 'Performance'],
    challenge: 'The original store was slow, the product pages buried the details customers actually care about, and the checkout lost people halfway through. Traffic was fine — sales weren’t.',
    solution: [
      'Rebuilt the store from scratch with a fast, modern stack',
      'Redesigned product pages around clear photos, sizing and trust signals',
      'Simplified the checkout down to the fewest possible steps',
      'Optimised images and load speed for mobile shoppers',
    ],
    // TODO(content): every figure below is UNVERIFIED and hidden from the site until verified: true + source supplied.
    results: [
      { value: '2.4×', label: 'more online sales', verified: false, source: null },
      { value: '<2s', label: 'page load time', verified: false, source: null },
      { value: '-38%', label: 'cart abandonment', verified: false, source: null },
    ],
  },
  'salonflow': {
    headline: 'A multi-tenant platform that runs the whole salon, not just the calendar.',
    intro: 'SalonFlow is a salon management platform built to replace the notebook, the WhatsApp group and three different apps — bookings, staff, inventory and revenue in one place.',
    timeline: '8 weeks',
    services: ['Web Application', 'UI/UX Design', 'Multi-tenant Architecture'],
    challenge: 'Salon owners were juggling paper diaries and spreadsheets. Double-bookings were common, no-shows went untracked, and nobody knew which services actually made money.',
    solution: [
      'Built a multi-tenant platform so each salon gets its own secure space',
      'Designed a booking calendar staff can actually use during a busy day',
      'Added automated reminders to cut no-shows',
      'Built revenue and staff-performance reporting in plain English',
    ],
    // TODO(content): every figure below is UNVERIFIED and hidden from the site until verified: true + source supplied.
    results: [
      { value: '30+', label: 'salons onboarded', verified: false, source: null },
      { value: '-45%', label: 'no-shows', verified: false, source: null },
      { value: '1 place', label: 'instead of 4 tools', verified: false, source: null },
    ],
  },
};

export const LANDING = {
  'website-development': {
    badge: 'Website Development',
    hero: 'Websites that turn clicks into customers',
    sub: 'Fast, modern, mobile-first websites built with one goal — to generate leads and sales for your business.',
    benefits: [
      { title: 'Built to convert', body: 'Every page guides visitors toward calling, booking or enquiring.' },
      { title: 'Lightning fast', body: 'Loads in under 2 seconds — because slow sites lose customers.' },
      { title: 'Mobile-first', body: 'Looks and works perfectly on every phone, tablet and desktop.' },
      { title: 'Found on Google', body: 'SEO-ready structure so customers actually find you.' },
      { title: 'You own it all', body: 'Your website, domain and accounts — no lock-in, ever.' },
      { title: 'Ongoing support', body: 'We stay with you after launch to keep everything running.' },
    ],
    faqs: [
      { q: 'How long does a website take?', a: 'Most business websites take 3–5 weeks from kickoff to launch, depending on the number of pages and content readiness.' },
      { q: 'Do I own the website?', a: 'Yes — completely. The website, domain and all accounts are in your name from day one.' },
      { q: 'Will it work on mobile?', a: 'Absolutely. Every site we build is mobile-first and tested across all devices.' },
      { q: 'What does it cost?', a: 'Most small-business sites fall between a clear fixed range we agree upfront — no hidden fees, no surprises.' },
    ],
    category: 'Websites',
  },
  'graphic-design': {
    badge: 'Graphic Design',
    hero: 'Design that makes you look premium',
    sub: 'Logos, branding and creative that build instant trust and set you apart from the competition.',
    benefits: [
      { title: 'Memorable identity', body: 'A logo and brand that sticks in your customers’ minds.' },
      { title: 'Consistent everywhere', body: 'The same premium look across site, socials, ads and print.' },
      { title: 'Built to convert', body: 'Ad creatives designed to stop the scroll and drive action.' },
      { title: 'Every format ready', body: 'Print-ready and web-ready files delivered in all sizes.' },
      { title: 'Fast turnaround', body: 'Clear timelines so you get your assets when you need them.' },
      { title: 'Unlimited revisions', body: 'We refine until it’s exactly right for your brand.' },
    ],
    faqs: [
      { q: 'What design work do you do?', a: 'Logos, full brand identities, social media creatives, ad graphics, and print-ready marketing materials.' },
      { q: 'How many revisions do I get?', a: 'We refine the design until you’re genuinely happy — we don’t rush you into signing off.' },
      { q: 'Will I get all the files?', a: 'Yes — you receive every format you’ll ever need, web and print, plus the source files.' },
      { q: 'How long does a logo take?', a: 'Usually 1–2 weeks including concepts and revisions.' },
    ],
    category: 'Branding',
  },
  'business-automation': {
    badge: 'Business Automation',
    hero: 'Automate the busywork, never miss a lead',
    sub: 'Smart automation that replies to enquiries instantly, follows up automatically and saves you hours every week.',
    benefits: [
      { title: 'Instant replies', body: 'Every enquiry gets a professional response — even at 2am.' },
      { title: 'Automatic follow-ups', body: 'Turn maybes into customers without lifting a finger.' },
      { title: 'Everything connected', body: 'Forms, inbox, CRM and calendar working as one system.' },
      { title: 'AI where it helps', body: 'Smart replies and workflows that save real hours.' },
      { title: 'Never lose a lead', body: 'Every enquiry captured, tracked and followed up.' },
      { title: 'More time for you', body: 'Stop doing repetitive work — focus on your customers.' },
    ],
    faqs: [
      { q: 'What can you automate?', a: 'Lead responses, follow-up messages, booking reminders, CRM updates, and repetitive admin tasks.' },
      { q: 'Do I need technical skills?', a: 'No — we set everything up and hand you a simple system that just works.' },
      { q: 'Will it work with my tools?', a: 'We connect with most popular tools — email, WhatsApp, calendars, CRMs and forms.' },
      { q: 'How soon will I see results?', a: 'Most automations go live within 1–2 weeks and start saving time immediately.' },
    ],
    category: 'Automation',
  },
  'meta-ads': {
    badge: 'Meta Ads',
    hero: 'Facebook & Instagram ads that fill your calendar',
    sub: 'Targeted Meta campaigns that put your business in front of the right people — and turn attention into real enquiries.',
    benefits: [
      { title: 'The right audience', body: 'Laser-targeted to people most likely to buy.' },
      { title: 'Scroll-stopping creative', body: 'Ads designed to grab attention and drive action.' },
      { title: 'Retargeting that works', body: 'Bring back people who showed interest but didn’t enquire.' },
      { title: 'Clear reporting', body: 'Know exactly what you spent and what it brought in.' },
      { title: 'Fast setup', body: 'Campaigns live within days, not weeks.' },
      { title: 'No lock-in', body: 'Stay because it works, not because of a contract.' },
    ],
    faqs: [
      { q: 'How much should I spend?', a: 'We’ll recommend a starting budget based on your goals — you’re always in control of the spend.' },
      { q: 'How soon do leads come in?', a: 'Many clients see their first enquiries within the first week of a campaign going live.' },
      { q: 'Do you make the creatives?', a: 'Yes — we design the ad visuals and copy as part of the service.' },
      { q: 'Who owns the ad account?', a: 'You do. The account stays in your name with full access and reporting.' },
    ],
    category: 'Meta Ads',
  },
  'google-ads': {
    badge: 'Google Ads',
    hero: 'Show up first when people are ready to buy',
    sub: 'Lean, ROI-focused Google Search and Maps campaigns that bring in calls and enquiries from day one.',
    benefits: [
      { title: 'Buyer-intent keywords', body: 'Reach people ready to hire, not just browse.' },
      { title: 'Call tracking', body: 'Every lead traceable to the ad that brought it.' },
      { title: 'No wasted spend', body: 'Tight targeting keeps every dollar working.' },
      { title: 'Top of Google', body: 'Appear above competitors the moment people search.' },
      { title: 'Full ownership', body: 'Your ad account, your data, plain-English reports.' },
      { title: 'Fast results', body: 'Start getting calls within the first days.' },
    ],
    faqs: [
      { q: 'How fast do Google Ads work?', a: 'Unlike SEO, Google Ads can bring in calls and enquiries within the first day of going live.' },
      { q: 'How much does it cost?', a: 'You set the budget. We make sure every dollar targets people ready to buy.' },
      { q: 'Do you track phone calls?', a: 'Yes — we set up call tracking so you know exactly which ads drive calls.' },
      { q: 'Will I own the account?', a: 'Always. The Google Ads account is yours with full transparency.' },
    ],
    category: 'Google Ads',
  },
  'seo': {
    badge: 'SEO',
    hero: 'Get found on Google — free, long-term traffic',
    sub: 'Rank higher on Google and win high-intent customers searching for exactly what you offer, month after month.',
    benefits: [
      { title: 'Local visibility', body: 'Rank in Maps and local searches where customers are.' },
      { title: 'On-page SEO', body: 'Pages structured so Google understands your business.' },
      { title: 'Google Business Profile', body: 'Optimised to drive calls, directions and bookings.' },
      { title: 'Free, lasting traffic', body: 'Rankings keep bringing customers long after the work.' },
      { title: 'Honest reporting', body: 'Clear monthly reports — no vanity metrics.' },
      { title: 'Real results', body: 'We focus on rankings that actually bring enquiries.' },
    ],
    faqs: [
      { q: 'How long does SEO take?', a: 'SEO is a long game — meaningful movement usually takes 3–6 months, but it compounds and lasts.' },
      { q: 'Can you guarantee #1?', a: 'No honest agency can guarantee a specific position. We guarantee real work and honest reporting.' },
      { q: 'What is local SEO?', a: 'It’s ranking for searches in your area — like “plumber near me” — where your customers actually are.' },
      { q: 'Do you manage Google Business?', a: 'Yes — optimising your Google Business Profile is a core part of local SEO.' },
    ],
    category: 'SEO',
  },
};