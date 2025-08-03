import { AccountBalanceWallet, AttachMoney, ShoppingBag, Storefront } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { SupportItem } from "./item";

export const Prices = memo(() => {
  const t = useTranslations();

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={{ xs: 2, lg: 4 }}
      >
        <SupportItem
          title={t("about.section2.0.title")}
          content={t("about.section2.0.content")}
          icon={<Storefront fontSize="large" />}
        />
        <SupportItem
          title={t("about.section2.1.title")}
          content={t("about.section2.1.content")}
          icon={<AttachMoney fontSize="large" />}
        />
        <SupportItem
          title={t("about.section2.2.title")}
          content={t("about.section2.2.content")}
          icon={<ShoppingBag fontSize="large" />}
        />
        <SupportItem
          title={t("about.section2.3.title")}
          content={t("about.section2.3.content")}
          icon={<AccountBalanceWallet fontSize="large" />}
        />
      </Box>
    </Container>
  );
});
