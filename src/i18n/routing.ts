import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi", "ja", "zh", "ar"],
  defaultLocale: "vi"
});
