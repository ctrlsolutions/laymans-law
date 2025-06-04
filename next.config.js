/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.builder.io",
      "via.placeholder.com",
      "127.0.0.1",
      "localhost",
      "flagcdn.com",
      ...(process.env.NEXT_PUBLIC_IMAGE_DOMAINS
        ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(",")
        : []),
    ],
  },
};

module.exports = nextConfig;
