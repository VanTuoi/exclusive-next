"use client";

import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("common.notFound");

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={4}
    >
      <Typography variant="h2" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" mb={3}>
        {t("description")}
      </Typography>
      <Button variant="contained" component={Link} href="/">
        {t("goHome")}
      </Button>
    </Box>
  );
}
