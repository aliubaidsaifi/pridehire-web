// Shared visual pieces for the Saudi pages (decoration only, no text).

// Subtle eight-point-star lattice (a geometric motif common to Gulf design). Hidden from assistive tech by the callers.
export const PATTERN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%23EE6A52' stroke-opacity='0.22' stroke-width='1'%3E%3Cpath d='M32 6l7.4 18.6L58 32l-18.6 7.4L32 58l-7.4-18.6L6 32l18.6-7.4z'/%3E%3Cpath d='M32 18l4.2 9.8L46 32l-9.8 4.2L32 46l-4.2-9.8L18 32l9.8-4.2z'/%3E%3C/g%3E%3C/svg%3E\")";

export function Arrow({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${className} rtl:-scale-x-100`} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Real photos (the same ones the India service cards use). A service with no photo yet (restaurant menus) simply shows the tinted icon block.
export const SA_IMAGES = {
  'web-development': '/services/website-development.webp',
  'business-automation': '/services/business-automation.webp',
  'graphic-design': '/services/graphic-design.webp',
};

// Same icon language as the India service cards, keyed by Saudi page id.
const ICONS = {
  'web-development': <path d="M4 6h16v10H4zM9 20h6M12 16v4" />,
  'restaurant-digital-menu': <path d="M7 3v8a2 2 0 002 2v8M7 3v6M11 3v6M9 3v6M17 3c-2 2-2 6 0 8v10" />,
  'business-automation': <path d="M12 3v3M12 18v3M3 12h3M18 12h3M8 8h8v8H8z" />,
  'sfda-menu-labelling': <path d="M7 3h8l4 4v14H7zM14 3v5h5M10 13h6M10 17h6" />,
  'ai-visibility': <path d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5" />,
  'about': <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" />,
  'graphic-design': <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />,
};

export function ServiceIcon({ id, className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {ICONS[id] || <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
