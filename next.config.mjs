/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
};

export default nextConfig;
