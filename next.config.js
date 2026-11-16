/** @type {import('next').NextConfig} */

// Permanent redirects (308 — treated like 301 by Google). Every source resolves in exactly one hop.
const NZ_PAGES = ['web-design-auckland', 'seo-auckland', 'google-ads-auckland', 'meta-ads-auckland', 'ecommerce-auckland'];

const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  eslint: { ignoreDuringBuilds: true },
  // Next's built-in trailing-slash 308 runs BEFORE custom redirects, which made /seo-auckland/ a 2-hop chain.
  // We turn it off and replicate it as the LAST rule below, so every URL still resolves in exactly one hop.
  skipTrailingSlashRedirect: true,
  experimental: { globalNotFound: true }, // 404 page for unmatched URLs when there are multiple root layouts (see app/global-not-found.js)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  async redirects() {
    return [
      ...NZ_PAGES.flatMap((slug) => [
        { source: `/${slug}/`, destination: `/nz/${slug}`, permanent: true },
        { source: `/${slug}`, destination: `/nz/${slug}`, permanent: true },
      ]),
      { source: '/:path+/', destination: '/:path+', permanent: true }, // trailing-slash normalisation (must stay last)
    ];
  },
};
module.exports = nextConfig;
