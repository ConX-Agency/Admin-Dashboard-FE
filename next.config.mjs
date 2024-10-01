/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["github.com"], // Whitelist GitHub as an external image source
  },
};

export default nextConfig;
