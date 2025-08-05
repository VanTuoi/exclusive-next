"use client";
import { Box, Grid } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { Prices, SliderManager, TopBanner } from "~/components/pages";
import { BreadcrumbsComponent } from "~/components/ui/breadcrumbs";
import { Path } from "~/types";

const Support = dynamic(() => import("~/components/pages/home-page/support"), { ssr: false });

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
