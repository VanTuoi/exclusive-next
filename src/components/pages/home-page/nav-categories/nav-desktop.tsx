"use client";
import { Box, Skeleton } from "@mui/material";
import { useLocale } from "next-intl";
import { memo, useEffect, useState } from "react";

import { useHome } from "~/hooks";

import { CustomLink } from "~/components/ui";

import { CategoryNav } from "~/types";

export const NavCategoriesDesktop = memo(() => {
  const locale = useLocale();
  const { dataNavCategories } = useHome();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (dataNavCategories) setIsLoading(false);
  }, [dataNavCategories]);

  return !isLoading ? (
    <Box
      sx={{
        height: "344px",
        maxWidth: "220px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2
      }}
    >
      {dataNavCategories.map((item) => {
        const displayLocale = (locale as keyof CategoryNav["name"]) || "en";
        return (
          <CustomLink variant="h4" href={item.url} key={item.url} maxLength={100}>
            {item.name[displayLocale]}
          </CustomLink>
        );
      })}
    </Box>
  ) : (
    <Box
      sx={{
        height: "344px",
        width: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 1
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} variant="rounded" width="100%" height={30} animation="wave" sx={{ borderRadius: 1 }} />
      ))}
    </Box>
  );
});
