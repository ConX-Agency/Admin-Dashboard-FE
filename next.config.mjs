/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["github.com", "static.wikia.nocookie.net", "static.vecteezy.com", "letsenhance.io"], // Whitelist GitHub as an external image source
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
