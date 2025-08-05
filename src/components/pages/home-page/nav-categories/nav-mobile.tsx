"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { memo, useEffect, useState } from "react";

import { useHome } from "~/hooks";

import { CustomLink } from "~/components/ui";

import { CategoryNav } from "~/types";

export const NavCategoriesMobile = memo(() => {
  const locale = useLocale();

  const { dataNavCategories } = useHome();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const t = useTranslations("");

  useEffect(() => {
    if (dataNavCategories) setIsLoading(false);
  }, [dataNavCategories]);

  return !isLoading ? (
    <Accordion sx={{ width: "100%", margin: 0 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Toggle categories navigation"
        sx={{
          padding: 0,
          "& .MuiAccordionSummary-content": {
            margin: 0
          }
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" gap={1}>
          <WidgetsIcon />
          <Typography variant="h4">{t("home.categoriesNav")}</Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: 1 }}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} gap={1}>
          {dataNavCategories.map((item) => {
            const displayLocale = (locale as keyof CategoryNav["name"]) || "en";
            return (
              <CustomLink variant="h4" href={`/products?category=${item.url}`} key={item.url} maxLength={100}>
                {item.name[displayLocale]}
              </CustomLink>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Skeleton variant="rounded" width="100%" height={40} />
  );
});
