import { createTheme, ThemeOptions } from "@mui/material/styles";

import { Colors, Customization, ThemeOption } from "~/types/theme/color";

import OverrideStyles from "./override-style";
import themePalette from "./palette";
import themeTypography from "./typography";

const theme = (customization: Customization): ReturnType<typeof createTheme> => {
  const colors: Colors = {
    primaryLight: "#54a9ff",
    primaryMain: "#2e83ea",
    primaryDark: "#0063c6",
    primary200: "#027ffc",
    primary800: "#004284",

    secondaryLight: "#54a9ff",
    secondaryMain: "#2e83ea",
    secondaryDark: "#0063c6",
    secondary200: "#027ffc",
    secondary800: "#004284",

    successLight: "#b9f6ca",
    successMain: "#00e676",
    successDark: "#00c853",
    success200: "#69f0ae",

    errorLight: "#ff4444",
    errorMain: "#ed3d3d",
    errorDark: "#bc0000",

    warningLight: "#fff8e1",
    warningMain: "#ffd43a",
    warningDark: "#e0af00",

    grey50: "#F8FAFC",
    grey100: "#E8EBED",
    grey200: "#E3E8EF",
    grey300: "#CDD5DF",
    grey500: "#697586",
    grey600: "#4B5565",
    grey700: "#364152",
    grey900: "#121926",

    paper: "#ffffff",
    background: "#ffffff",
    textTitle: "#000000",
    textPrimary: "#000000",
    textSecondary: "#000000",

    darkPaper: "#212121",
    darkBackground: "#1a223f",
    darkTextTitle: "#ffffff",
    darkTextPrimary: "#ffffff",
    darkTextSecondary: "#ffffff"
  };

  const isLight = customization.type === "light";
  const isRtl = customization.locale === "ar";

  const themeOption: ThemeOption = {
    colors,
    borderRadius: 8,
    paper: isLight ? colors.paper : colors.darkPaper,
    background: isLight ? colors.background : colors.darkBackground,
    heading: isLight ? colors.textTitle : colors.darkTextTitle,
    textPrimary: isLight ? colors.textPrimary : colors.darkTextPrimary,
    textSecondary: isLight ? colors.textSecondary : colors.darkTextSecondary,
    divider: isLight ? colors.grey200 : colors.grey300,
    customization
  };

  const themeOptions: ThemeOptions = {
    direction: isRtl ? "rtl" : "ltr",
    palette: themePalette(themeOption, isLight),
    typography: themeTypography(themeOption),
    components: OverrideStyles(themeOption)
  };

  const muiTheme = createTheme(themeOptions);
  return muiTheme;
};

export default theme;
