/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["github.com"], // Whitelist GitHub as an external image source
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;