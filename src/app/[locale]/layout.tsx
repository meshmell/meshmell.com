import "@/styles/globals.css";

import { notFound } from "next/navigation";
import { Session } from "next-auth";
import { hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { Providers } from "@/src/app/providers/index";
import GoogleAnalytics from "@/src/components/Analytics/GoogleAnalytics";
import { routing } from "@/src/i18n/routing";
import { LocaleKeyType } from "@/src/types/locale";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: LocaleKeyType }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "main" });
  const description = t("description");

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "ja-JP": "/ja",
      },
    },
    title: "Meshmell | Free 3D model sharing service",
    description: description,
    generator: "Meshmell",
    applicationName: "Meshmell",
    referrer: "origin-when-cross-origin",
    keywords: `${["Meshmell"]}`,
    authors: [{ name: "Yurimell", url: `https://yurimell.com/${locale}/who` }],
    creator: "Yurimell",
    publisher: "Yurimell",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: "Meshmell",
      description: description,
      url: process.env.NEXT_PUBLIC_BASE_URL,
      siteName: "Meshmell",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/general/home-img.webp`,
          width: 800,
          height: 600,
          alt: "Meshmell",
        },
      ],
      locale: t("locale"),
      type: "website",
    },

    twitter: {
      card: "summary",
      title: "Meshmell",
      description: description,
      siteId: "",
      creator: "@Yurimell6174",
      images: {
        url: `${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/general/home-img.webp`,
        alt: "Meshmell",
      },
    },
  };
};

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: LocaleKeyType; session: Session }>;
}) => {
  const { locale, session } = await params;

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  let htmlLang;

  switch (locale) {
    case "en":
      htmlLang = "en-US";
      break;
    case "ja":
      htmlLang = "ja-JP";
      break;
    default:
      htmlLang = "en-US";
      break;
  }

  return (
    // suppressHydrationWarning is used to suppress the warning that appears when using the hydrate function in the client side
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <Providers session={session} messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
