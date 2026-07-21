import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/status", "/docs"],
        disallow: [
          "/command",
          "/command/",
          "/api/command",
          "/api/chat",
          "/models",
          "/workflows",
          "/labs",
          "/api/",
          "/command/gate",
        ],
      },
    ],
  };
}
