import { ThemeOption } from "~/types/theme/color";

export default function OverrideStyles(theme: ThemeOption) {
  return {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: "none"
        },
        rounded: {
          borderRadius: `${theme?.borderRadius}px`
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: `${theme.borderRadius}px`
        }
      }
    }
  };
}
