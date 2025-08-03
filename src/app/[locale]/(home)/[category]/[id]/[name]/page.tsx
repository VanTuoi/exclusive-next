"use client";

import { Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { ProductDetails, RelatedProduct } from "~/components/pages";
import { useProduct } from "~/hooks";

export default function ProductClient() {
  const { handleGetProducts, dataProductDetails } = useProduct();

  useEffect(() => {
    handleGetProducts("1");
  }, []);

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 0, lg: 5 } }}>
      <Stack direction="column" gap={{ xs: 3, lg: 10 }} pb={10}>
        {dataProductDetails && <ProductDetails product={dataProductDetails} />}
        <RelatedProduct id={1} />
      </Stack>
    </Container>
  );
}
