"use client";

import { Box, Grid } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { InfoContact } from "~/components/pages";
import { ContactForm } from "~/components/ui";

import { BreadcrumbsComponent } from "~/components/ui/breadcrumbs";
import { Path } from "~/types";

const ContactPage = () => {
  const locale = useLocale();
  const t = useTranslations("common.breadcrumbs");

  const paths: Path[] = [
    { title: t("home"), link: `/${locale}` },
    { title: t("contact"), link: `/${locale}/contact` }
  ];

  return (
    <Box paddingBottom={2}>
      <BreadcrumbsComponent paths={paths} />
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <InfoContact />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <ContactForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;
