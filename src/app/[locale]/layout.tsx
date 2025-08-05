import { NextIntlClientProvider, hasLocale } from "next-intl";

import { routing } from "~/i18n/routing";
import Provider from "~/provider/provider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive",
  description: "Exclusive app",
  keywords: ["nextjs", "app router", "seo"],
  manifest: "/manifest.json",
  openGraph: {
    title: "My OG Title",
    description: "OG Description",
    url: "",
    siteName: "MySite",
    images: [
      {
        url: "",
        width: 1200,
        height: 630
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    // notFound();
  }

  return (
    <html lang={locale} dir={["ar", "he"].includes(locale) ? "rtl" : "ltr"}>
      <head>
        <link rel="dns-prefetch" href="https://js.stripe.com" />
      </head>
      <body>
        <NextIntlClientProvider>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
