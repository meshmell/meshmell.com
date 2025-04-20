export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_ENV_STATUS === "production" &&
  process.env.NEXT_PUBLIC_SUBDOMAIN_FOR_PRODUCTION === ""
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
    : "";

export const pageview = (path: string) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
};
