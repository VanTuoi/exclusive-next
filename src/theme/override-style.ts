import { ThemeOption } from "~/types/theme/color";

export default function OverrideStyles(theme: ThemeOption) {
  return {
    MuiButton: {
      styleOverrides: {
        // root: {
        //     fontWeight: 500,
        //     borderRadius: "8px",
        //     "&:hover": {
        //         backgroundColor: theme.colors.secondaryMain,
        //         border: "none"
        //     }
        // }
        // outlined: {
        //     border: `2px solid ${theme.colors.primaryMain}`,
        //     "&:hover": {
        //         color: theme.colors.paper,
        //         backgroundColor: theme.colors.primaryDark,
        //         border: `2px solid ${theme.colors.primaryDark}`
        //     }
        // },
        // contained: {
        //     "&:hover": {
        //         backgroundColor: theme.colors.primaryDark
        //     }
        // },
        // text: {
        //     "&:hover": {
        //         color: theme.colors.paper,
        //         backgroundColor: theme.colors.primaryDark
        //     }
        // }
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
