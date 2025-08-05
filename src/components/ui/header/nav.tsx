import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { CustomLink } from "~/components/ui";
import { useAuthStore } from "~/stores";

export const Nav = () => {
  const { userData } = useAuthStore();

  const t = useTranslations("common.header.nav");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const NAV = [
    { titleKey: "home", link: "/" },
    { titleKey: "products", link: "/products" },
    { titleKey: "contact", link: "/contact" },
    { titleKey: "about", link: "/about" },
    { titleKey: "signup", link: "/auth/sign-up" }
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: isSmallScreen ? "8px" : "48px",
        marginLeft: isSmallScreen ? 0 : "54px",
        overflowX: isSmallScreen ? "auto" : "visible",
        width: "100%",
        px: 2
      }}
    >
      {NAV.filter((item) => {
        return item.link !== "/auth/sign-up" || !userData;
      }).map((item) => (
        <Box
          key={item.link}
          sx={{
            flex: "0 0 auto",
            minWidth: "auto"
          }}
        >
          <CustomLink
            fontWeight={isSmallScreen ? 500 : 600}
            variant={isSmallScreen ? "h5" : "h4"}
            href={item.link}
            sx={{
              whiteSpace: "nowrap"
            }}
          >
            {t(item.titleKey)}
          </CustomLink>
        </Box>
      ))}
    </Box>
  );
};
