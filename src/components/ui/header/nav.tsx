import { Box, useMediaQuery, useTheme } from "@mui/material";

import { useAuthStore } from "~/stores";

import { useTranslations } from "next-intl";
import { CustomLink } from "~/components/ui";

export const Nav = () => {
  const { userData } = useAuthStore();

  const t = useTranslations("common.header.nav");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const NAV = [
    { titleKey: "home", link: "/" },
    { titleKey: "contact", link: "/contact" },
    { titleKey: "about", link: "/about" },
    { titleKey: "signup", link: "/auth/sign-up" }
  ];

  return (
    <Box
      sx={{
        display: isSmallScreen ? "none" : "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "48px",
        marginLeft: "54px"
      }}
    >
      {NAV.filter((item) => {
        return item.link !== "/auth/sign-up" || !userData;
      }).map((item) => (
        <CustomLink fontWeight={600} key={item.link} variant="h4" href={item.link}>
          {t(item.titleKey)}
        </CustomLink>
      ))}
    </Box>
  );
};
