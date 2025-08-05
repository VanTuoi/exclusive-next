"use client";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Button, IconButton, Stack, useTheme } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useCartStore, useWishList } from "~/stores";
import { Product } from "~/types";
import { CustomLink } from "../../links";
import { ColorSelect } from "./colors-select";
import { Discount } from "./discount";
import { ProductPrice } from "./product-prices";
import { ProductRating } from "./product-rating";
import { SizeSelect } from "./size-product";

interface ProductComponentProps {
  product: Product;
}

export const ProductWishListComponent = memo(({ product }: ProductComponentProps) => {
  const t = useTranslations();

  const theme = useTheme();

  const router = useRouter();

  const locale = useLocale();

  const { updateItem } = useCartStore();

  const { items, toggleWishList } = useWishList();

  const selectedColor = items[product.id].selectedOptions?.color || "";
  const selectedSize = items[product.id].selectedOptions?.size || "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
      <Box
        sx={{
          height: "200px",
          width: "220px",
          position: "relative",
          backgroundColor: theme.palette.background.default,
          borderRadius: "4px",
          overflow: "hidden",
          "&:hover .hover-button": {
            opacity: 1
          }
        }}
      >
        <Image
          onClick={() => {
            router.push("/product" + "/" + product.id + "/" + product.title);
          }}
          alt={product?.image?.find((img) => img.colorCode === selectedColor)?.alt || "img product"}
          src={
            product?.image?.find((img) => img.colorCode === selectedColor)?.url ||
            "/assets/imgs/product-image-not-available.webp"
          }
          height={180}
          width={180}
          style={{
            objectFit: "contain",
            position: "absolute",
            inset: 0,
            margin: "auto"
          }}
        />
        <Discount locale={locale || "en"} promotions={product.promotions} />
        <Stack direction={"column"} gap={1} sx={{ position: "absolute", top: "10px", right: "10px" }}>
          <IconButton
            onClick={() => toggleWishList(product, { color: selectedColor, size: selectedSize })}
            aria-label="fingerprint"
            color="inherit"
            sx={{
              backgroundColor: theme.palette.background.default,
              height: "35px",
              width: "35px",
              ":hover": {
                color: theme.palette.error.main
              }
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Stack>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          className="hover-button"
          onClick={() => {
            toggleWishList(product, { color: selectedColor, size: selectedSize });
            updateItem(product, 1, { color: selectedColor, size: selectedSize });
          }}
          sx={{
            height: "35px",
            position: "absolute",
            bottom: 0,
            zIndex: 2,
            opacity: 0,
            borderRadius: "0px",
            transition: "opacity 0.35s ease"
          }}
          startIcon={<ShoppingCartOutlinedIcon />}
        >
          {t("home.addToCart")}
        </Button>
      </Box>
      <CustomLink
        href={"/product" + "/" + product.id + "/" + product.title}
        variant="h5"
        maxLength={25}
        sx={{ fontWeight: 500 }}
      >
        {product?.title}
      </CustomLink>
      <ProductPrice
        showOldPrice={true}
        price={product?.price}
        finalPrice={product?.finalPrice}
        locale={locale || "en"}
      />
      <ProductRating rating={product?.rating} />
      <ColorSelect
        isLabel={false}
        imgs={product?.image || []}
        selectedColor={selectedColor}
        handleColorChange={(color) => toggleWishList(product, { color: color, size: selectedSize })}
      />
      <SizeSelect
        variant="small"
        sizes={product.sizes || []}
        selectedSize={selectedSize}
        handleSizeChange={(size) => toggleWishList(product, { color: selectedColor, size: size })}
      />
    </Box>
  );
});
