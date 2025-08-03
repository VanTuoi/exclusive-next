import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo } from "react";

import { CustomLink } from "~/components/ui";

import { LanguageSelect } from "./language";

export const TopHeader = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const t = useTranslations("common");

  return (
    <Box
      sx={{
        margin: "0 auto",
        backgroundColor: theme.palette.common.black,
        height: isMobile ? "48px" : "38px",
        width: "100%"
      }}
    >
      <Box
        sx={{
          p: { xs: 1, sm: 0 },
          m: "0 auto",
          maxWidth: theme.breakpoints.values.lg,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-between" },
          alignItems: { xs: "flex-end", sm: "center" },
          gap: 1,
          height: "100%",
          width: "100%"
        }}
      >
        <Box
          sx={{
            m: "0 auto",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            display: isMobile ? "none" : "flex"
          }}
        >
          <Typography
            component="h5"
            variant={isMobile ? "h6" : "h5"}
            sx={{
              color: theme.palette.common.white,
              wordBreak: "break-word"
            }}
          >
            {t("header.banner.saleContent")}
          </Typography>

          <CustomLink
            sx={{
              color: theme.palette.common.white,
              fontWeight: 600
            }}
            variant={isMobile ? "h6" : "h5"}
            href="/"
            underline
            lineHeight={12}
            underlineThickness={1.1}
          >
            {t("header.banner.saleLink")}
          </CustomLink>
        </Box>
        <LanguageSelect />
      </Box>
    </Box>
  );
});
