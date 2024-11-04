/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/Admin-Dashboard-FE' : '',
  images: {
    domains: ["github.com", "static.wikia.nocookie.net", "static.vecteezy.com"], // Whitelist GitHub as an external image source
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
