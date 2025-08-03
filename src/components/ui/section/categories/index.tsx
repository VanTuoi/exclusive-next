import Image from "next/image";

import { Box, Typography, useTheme } from "@mui/material";
import { memo } from "react";

import { Category } from "~/types/product";

import { CategoriesButton } from "../../buttons/svg-button";

interface ProductComponentProps {
  categories: Category;
}

export const CategoriesComponent = memo(({ categories }: ProductComponentProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "145px",
        width: "170px",
        position: "relative",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        borderRadius: "4px",
        overflow: "hidden",
        "&:hover .hover-button": {
          opacity: 1
        }
      }}
    >
      <CategoriesButton variant="outlined">
        <Image src={categories.img} height={56} width={56} alt="icon" />
        <Typography sx={{ color: theme.palette.text.primary }}> {categories.title}</Typography>
      </CategoriesButton>
    </Box>
  );
});
