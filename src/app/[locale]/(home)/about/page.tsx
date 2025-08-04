"use client";

import { Box, Grid } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Prices, SliderManager, TopBanner } from "~/components/pages";
import Support from "~/components/pages/home-page/support";

import { BreadcrumbsComponent } from "~/components/ui/breadcrumbs";
import { Path } from "~/types";

const AboutPage = () => {
  const locale = useLocale();
  const t = useTranslations("common.breadcrumbs");

  const paths: Path[] = [
    { title: t("home"), link: `/${locale}` },
    { title: t("about"), link: `/${locale}/about` }
  ];

  return (
    <Box paddingBottom={2}>
      <BreadcrumbsComponent paths={paths} />
      <Grid container spacing={{ xs: 2, md: 5, lg: 17.5 }}>
        <Grid size={{ xs: 12 }}>
          <TopBanner />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Prices />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SliderManager />
        </Grid>
        <Grid size={{ xs: 12 }} mb={15}>
          <Support />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutPage;
