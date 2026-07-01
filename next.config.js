/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // R3F / drei ship modern ESM; transpiling keeps Next happy across versions.
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    formats: ['image/avif', 'image/webp'],
    // If you later load remote images, whitelist hosts here, e.g.:
    // remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  compiler: {
    // Strip console.* in production builds (keeps bundles lean).
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
};

module.exports = nextConfig;
