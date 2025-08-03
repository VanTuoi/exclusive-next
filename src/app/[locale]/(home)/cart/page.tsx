"use client";

import { Box } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

import { CartComponents } from "~/components/pages";
import { BreadcrumbsComponent } from "~/components/ui/breadcrumbs";
import { Path } from "~/types";

const CartPage = () => {
  const locale = useLocale();
  const t = useTranslations("common.breadcrumbs");

  const paths: Path[] = [
    { title: t("home"), link: `/${locale}` },
    { title: t("cart"), link: `/${locale}/cart` }
  ];

  return (
    <Box paddingBottom={2}>
      <BreadcrumbsComponent paths={paths} />
      <CartComponents />
    </Box>
  );
};

export default CartPage;
