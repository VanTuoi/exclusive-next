"use client";

import { Box } from "@mui/material";
import { memo } from "react";
import { ListProducts } from "~/components/pages/products/list";

const CategoryPage = memo(() => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="flex-start" minHeight="100vh" py={2}>
      <ListProducts />
    </Box>
  );
});

export default CategoryPage;
