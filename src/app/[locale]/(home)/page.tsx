"use client";

import { Stack } from "@mui/material";

import {
  Arrival,
  BottomBanner,
  BrowseByCategory,
  ExploreProducts,
  FlashSales,
  HomeNavCategories,
  MonthSale,
  Support
} from "~/components/pages";

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
