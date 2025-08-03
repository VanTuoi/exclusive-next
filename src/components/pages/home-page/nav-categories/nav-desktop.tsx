import { Box, Skeleton, Stack } from "@mui/material";
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
          <CustomLink variant="h4" href={"/" + item.url} key={item.url} maxLength={100}>
            {item.name[displayLocale]}
          </CustomLink>
        );
      })}
    </Box>
  ) : (
    <Stack direction={"column"} spacing={1}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} variant="rounded" width={210} height={40} />
      ))}
    </Stack>
  );
});
