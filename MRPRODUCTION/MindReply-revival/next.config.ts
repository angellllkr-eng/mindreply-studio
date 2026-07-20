import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  rewrites: async () => {
    // Only proxy /api/* to an external backend when one is configured.
    // Without this guard, an undefined NEXT_PUBLIC_API_URL produces an
    // invalid rewrite destination and crashes the dev/build server.
    if (!process.env.NEXT_PUBLIC_API_URL) {
      return [];
    }

    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        },
      ],
    };
  },
};

export default config;
