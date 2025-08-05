import { Stack } from "@mui/material";
import { NextPage } from "next";
import { ProductDetails, ProductNotFound, RelatedProduct } from "~/components/pages";

import { productApi } from "~/services";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const getProductApi = productApi("public");
  const response = await getProductApi.getProductDetails(resolvedParams.id);

  if (!response.data.success) return {};

  const product = response.data.data;
  return {
    title: product.title,
    description: product.description || `Product detail ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image[0].url || "/assets/img/not-found.jpg",
          width: 800,
          height: 600,
          alt: product.title
        }
      ]
    }
  };
}

const ProductPage: NextPage<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const getProductApi = productApi("public");
  const response = await getProductApi.getProductDetails(id);

  const product = response.data.data;

  return (
    <Stack
      direction="column"
      gap={{ xs: 3, lg: 10 }}
      pt={{ xs: 0, lg: 5 }}
      pb={10}
      mx="auto"
      maxWidth="lg"
      px={{ xs: 2, sm: 3, md: 4, lg: 0 }}
    >
      {response.data.success ? <ProductDetails product={product} /> : <ProductNotFound />}
      <RelatedProduct id={product.id} />
    </Stack>
  );
};

export default ProductPage;
