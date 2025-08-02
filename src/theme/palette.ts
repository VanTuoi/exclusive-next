import { PaletteOptions } from "@mui/material/styles";

import { ThemeOption } from "~/types/theme/color";

export default function themePalette(theme: ThemeOption, isLight: boolean): PaletteOptions {
  return {
    mode: isLight ? "light" : "dark",
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
      "200": theme.colors?.primary200,
      "800": theme.colors?.primary800
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      "200": theme.colors?.secondary200,
      "800": theme.colors?.secondary800
    },
    success: {
      light: theme.colors?.successLight,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
      "200": theme.colors?.successLight,
      "800": theme.colors?.successDark
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark,
      "200": theme.colors?.warningLight,
      "800": theme.colors?.warningDark
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
      "200": theme.colors?.errorLight,
      "800": theme.colors?.errorDark
    },
    grey: {
      "50": theme.colors?.grey50,
      "100": theme.colors?.grey100,
      "200": theme.colors?.grey200,
      "300": theme.colors?.grey300,
      "500": theme.colors?.grey500,
      "600": theme.colors?.grey600,
      "700": theme.colors?.grey700,
      "900": theme.colors?.grey900
    },
    text: {
      primary: theme.textPrimary,
      secondary: theme.textSecondary,
      disabled: theme.colors?.grey100
    },
    background: {
      paper: theme.paper,
      default: theme.paper
    }
  };
}
