"use client";

import { Box } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

import { CheckOutComponents } from "~/components/pages";
import { BreadcrumbsComponent } from "~/components/ui/breadcrumbs";
import { Path } from "~/types";

const CartPage = () => {
  const locale = useLocale();
  const t = useTranslations("common.breadcrumbs");

  const paths: Path[] = [
    { title: t("account"), link: `/${locale}/account` },
    { title: t("myAccount"), link: `/${locale}/my-account` },
    { title: t("product"), link: `/${locale}/product` },
    { title: t("viewCart"), link: `/${locale}/view-cart` },
    { title: t("checkout"), link: `/${locale}/checkout` }
  ];

  return (
    <Box paddingBottom={2}>
      <BreadcrumbsComponent paths={paths} />
      <CheckOutComponents />
    </Box>
  );
};

export default CartPage;
