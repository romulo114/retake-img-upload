/** @type {import('next').NextConfig} */
const hostnames = ['images.unsplash.com', 'bnxrrgofefrmsrvoecll.supabase.co'];

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
};

module.exports = nextConfig;
