/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
      },
    ],
    dangerouslyAllowSVG: true,
  },

  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
}

module.exports = config
