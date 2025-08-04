"use client";

import { Stack } from "@mui/material";
import dynamic from "next/dynamic";

const HomeNavCategories = dynamic(() => import("~/components/pages/home-page/nav-categories/index"));
const FlashSales = dynamic(() => import("~/components/pages/home-page/flash-sales"));
const BrowseByCategory = dynamic(() => import("~/components/pages/home-page/browse-by-category"));
const MonthSale = dynamic(() => import("~/components/pages/home-page/month-sale"));
const BottomBanner = dynamic(() => import("~/components/pages/home-page/bottom-banner"));
const ExploreProducts = dynamic(() => import("~/components/pages/home-page/explore-products"));
const Arrival = dynamic(() => import("~/components/pages/home-page/arrival"));
const Support = dynamic(() => import("~/components/pages/home-page/support"));

const HomePage = () => {
  return (
    <Stack
      padding={0}
      direction={"column"}
      gap={{
        xs: 2,
        md: 5,
        lg: 10
      }}
      paddingBottom={10}
    >
      <HomeNavCategories />
      <FlashSales />
      <BrowseByCategory />
      <MonthSale />
      <MonthSale />
      <BottomBanner />
      <ExploreProducts />
      <Arrival />
      <Support />
    </Stack>
  );
};

export default HomePage;
