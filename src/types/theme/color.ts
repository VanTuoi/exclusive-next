interface Customization {
  fontFamily?: string;
  type: "light" | "dark";
  borderRadius?: number;
}

interface Colors {
  primaryLight: string;
  primaryMain: string;
  primaryDark: string;
  primary200: string;
  primary800: string;

  secondaryLight: string;
  secondaryMain: string;
  secondaryDark: string;
  secondary200: string;
  secondary800: string;

  successLight: string;
  successMain: string;
  successDark: string;
  success200: string;

  errorLight: string;
  errorMain: string;
  errorDark: string;

  warningLight: string;
  warningMain: string;
  warningDark: string;

  grey50: string;
  grey100: string;
  grey200: string;
  grey300: string;
  grey500: string;
  grey600: string;
  grey700: string;
  grey900: string;

  paper: string;
  background: string;
  textTitle: string;
  textPrimary: string;
  textSecondary: string;

  darkPaper: string;
  darkBackground: string;
  darkTextTitle: string;
  darkTextPrimary: string;
  darkTextSecondary: string;
}

interface ThemeOption {
  colors: Colors;
  heading: string;
  borderRadius: number;
  paper: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  divider: string;
  customization?: Customization;
}
export type { Colors, Customization, ThemeOption };
