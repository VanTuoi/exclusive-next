import { NextIntlClientProvider, hasLocale } from "next-intl";

import { routing } from "~/i18n/routing";
import Provider from "~/provider/provider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive",
  description: "Exclusive app"
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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
