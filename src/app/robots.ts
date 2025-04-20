import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const isDevelopment =
    process.env.NEXT_PUBLIC_SUBDOMAIN_FOR_PRODUCTION === "develop";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: isDevelopment ? "*" : "",
    },
    sitemap: isDevelopment ? "" : "https://www.meshmell.com/sitemap.xml",
  };
};

export default robots;
