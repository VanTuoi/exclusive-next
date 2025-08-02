import { Roboto } from "next/font/google";

import { ThemeOption } from "~/types/theme/color";

import type { TypographyVariantsOptions } from "@mui/material/styles";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export default function themeTypography(theme: ThemeOption): TypographyVariantsOptions {
  return {
    fontFamily: theme?.customization?.fontFamily || roboto.style.fontFamily || "Roboto, sans-serif",
    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontSize: "12px"
    },
    h5: {
      fontSize: "14px",
      color: theme.heading,
      fontWeight: 500
    },
    h4: {
      fontSize: "16px",
      color: theme.heading,
      fontWeight: 600
    },
    h3: {
      fontSize: "20px",
      color: theme.heading,
      fontWeight: 600
    },
    h2: {
      fontSize: "24px",
      color: theme.heading,
      fontWeight: 700
    },
    h1: {
      fontSize: "34px",
      color: theme.heading,
      fontWeight: 700
    },
    subtitle1: {
      fontSize: "14px",
      fontWeight: 500,
      color: theme.heading
    },
    subtitle2: {
      fontSize: "12px",
      fontWeight: 400,
      color: theme.heading
    },
    caption: {
      fontSize: "12px",
      color: theme.heading,
      fontWeight: 400
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16px"
    },
    body2: {
      letterSpacing: "0px",
      fontWeight: 400,
      lineHeight: "16px",
      color: theme.heading
    },
    button: {
      textTransform: "capitalize"
    }
  };
}
