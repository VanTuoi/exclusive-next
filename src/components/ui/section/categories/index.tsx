import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from "react";

import { Category } from "~/types/product";
import { CategoriesButton } from "../../buttons/svg-button";

interface ProductComponentProps {
  categories: Category;
}

export const CategoriesComponent = memo(({ categories }: ProductComponentProps) => {
  const theme = useTheme();
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/products?category=${categories.link}`);
  };

  return (
    <Box
      onClick={handleNavigate}
      sx={{
        height: "145px",
        width: "170px",
        position: "relative",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover .hover-button": {
          opacity: 1
        }
      }}
    >
      <CategoriesButton variant="outlined">
        <Image src={categories.img} height={56} width={56} alt="icon" />
        <Box component="span">{categories.title}</Box>
      </CategoriesButton>
    </Box>
  );
});
