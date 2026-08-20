import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /*
     * Our root layout lives in /[country]/[locale] (App Router i18n pattern),
     * so notFound() and unmatched URLs cannot compose a styled 404 through a
     * static root layout — global-not-found.tsx is the documented solution
     * for exactly this architecture (docs/routing.md §404 behavior).
     */
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      // CMS media (NEXT_PUBLIC_API_URL host and its siblings)
      {
        protocol: "https",
        hostname: "molodost.brontosolutions.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "staging2.brontosolutions.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "**.brontosolutions.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
