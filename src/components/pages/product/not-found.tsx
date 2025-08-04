"use client";

import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export const ProductNotFound = () => {
  const t = useTranslations("productDetail");
  return (
    <Typography variant="h5" color="text.secondary" textAlign="center" pt={5} sx={{ fontSize: 16 }}>
      {t("notFound")}
    </Typography>
  );
};
