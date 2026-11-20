import { SITE, SERVICES } from '@/lib/site';
import { CANONICAL_HOST, ORG, MARKETS, COUNTRY_NAMES, absoluteUrl } from '@/lib/markets';
import { getLastModified } from '@/lib/content-dates';

const BASE = CANONICAL_HOST;
const ld = (schema) => <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
const dropNulls = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined && v !== ''));

/** Countries we actively serve (market.serving === true). Drives Organization.areaServed and Service.areaServed. */
export function servedCountries() {
  return Object.values(MARKETS).filter((m) => m.serving && m.country).map((m) => ({ '@type': 'Country', name: COUNTRY_NAMES[m.country] || m.country }));
}

/** City service areas (from markets' serviceAreas). schema.org City has no addressRegion property, so region/country sit in a nested PostalAddress. */
function serviceCities() {
  return Object.values(MARKETS).filter((m) => m.serving && m.serviceAreas).flatMap((m) =>
    m.serviceAreas.map((c) => ({ '@type': 'City', name: c.name, address: { '@type': 'PostalAddress', addressRegion: c.region, addressCountry: m.country } })));
}

/** One contactPoint per market that declares `contactPoint` and has a phone (India, Saudi). Phone lines only — no addresses attached. */
function contactPoints() {
  return Object.values(MARKETS)
    .filter((m) => m.contactPoint && m.phone)
    .map((m) => dropNulls({
      '@type': 'ContactPoint',
      contactType: m.contactPoint.contactType,
      telephone: m.phone,
      email: ORG.email,
      areaServed: m.areaServed?.length ? m.areaServed : undefined,
      availableLanguage: m.availableLanguage,
    }));
}

// Organization — NOT LocalBusiness: we have no premises in the markets we serve. Address is the real (Indian) entity only.
export function OrganizationSchema() {
  const served = [...servedCountries(), ...serviceCities()];
  return ld({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: ORG.name,
    url: absoluteUrl('/'),
    logo: `${BASE}${ORG.logoPath}`,
    description: SITE.description,
    email: ORG.email,
    identifier: { '@type': 'PropertyValue', name: 'Udyam Registration Number', value: ORG.udyam },
    address: { '@type': 'PostalAddress', ...dropNulls(ORG.address) },
    areaServed: served.length ? served : undefined,
    contactPoint: contactPoints(),
    sameAs: ORG.sameAs,
  });
}

// No SearchAction: the site has no search endpoint, and Google retired the sitelinks search box. Do not add one without a real search page.
export function WebsiteSchema() {
  return ld({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    name: ORG.name,
    url: absoluteUrl('/'),
    inLanguage: 'en',
    publisher: { '@id': `${BASE}/#organization` },
  });
}

export function ServiceSchema({ name, description, slug }) {
  const served = servedCountries();
  return ld({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: served.length ? served : undefined,
    url: absoluteUrl(`/services/${slug}`),
  });
}

/** WebPage node carrying a real dateModified (from lib/content-dates.js, never the build time). */
export function WebPageSchema({ path, name, description, type = 'WebPage', locale = 'en' }) {
  const modified = getLastModified(path);
  return ld(dropNulls({
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: locale,
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    dateModified: modified || undefined,
  }));
}

export function FaqSchema({ faqs = [] }) {
  if (!faqs.length) return null;
  return ld({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  });
}

export function BreadcrumbSchema({ items = [] }) {
  if (!items.length) return null;
  return ld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  });
}
