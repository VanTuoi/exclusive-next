import HeadphonesIcon from "@mui/icons-material/Headphones";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box, Container } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { memo } from "react";

import { formatCurrency } from "~/utils";

import { SupportItem } from "./item";

export const Support = memo(() => {
  const t = useTranslations();

  const locale = useLocale();

  const formattedCurrency = formatCurrency(140, locale || "en");

  return (
    <Container maxWidth={"lg"} disableGutters>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", lg: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        gap={{
          xs: 2,
          lg: 10
        }}
      >
        <SupportItem
          title={t("home.support.0.title")}
          content={t("home.support.0.content", { objectName: formattedCurrency })}
          icon={<LocalShippingIcon sx={{ height: 35, width: 35 }} />}
        />
        <SupportItem
          title={t("home.support.1.title")}
          content={t("home.support.1.content")}
          icon={<HeadphonesIcon sx={{ height: 35, width: 35 }} />}
        />
        <SupportItem
          title={t("home.support.2.title")}
          content={t("home.support.2.content")}
          icon={<VerifiedUserIcon sx={{ height: 35, width: 35 }} />}
        />
      </Box>
    </Container>
  );
});
