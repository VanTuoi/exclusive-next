import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Button, IconButton, Stack, useTheme } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useEffect } from "react";
import { useCartStore, useDialogStore, useWishList } from "~/stores";
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

export const ProductComponent = memo(({ product }: ProductComponentProps) => {
  const t = useTranslations();

  const theme = useTheme();

  const locale = useLocale();
  const router = useRouter();

  const { selectedOptions, setSelectedColor, openViewDetail, setSelectedSize, openAddToCart } = useDialogStore();

  const { updateItem } = useCartStore();

  const { toggleWishList, isProductInWishList } = useWishList();

  const selectedColor = selectedOptions[product.id]?.color || "";
  const selectedSize = selectedOptions[product.id]?.size || "";

  useEffect(() => {
    if (selectedColor === "" && product?.image?.[0]?.colorCode) {
      setSelectedColor(product?.image?.[0]?.colorCode, product.id);
    }
    if (selectedSize === "" && product?.sizes?.[0]) {
      setSelectedSize(product?.sizes?.[0], product.id);
    }
  }, [product]);

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
            router.push("/" + product.category + "/" + product.id + "/" + product.title);
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
            color={isProductInWishList(product.id) ? "primary" : "inherit"}
            sx={{
              backgroundColor: isProductInWishList(product.id)
                ? theme.palette.primary.main
                : theme.palette.background.default,
              color: isProductInWishList(product.id) ? theme.palette.common.white : "",
              height: "35px",
              width: "35px",
              ":hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white
              }
            }}
          >
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => openViewDetail(product)}
            aria-label="fingerprint"
            color="inherit"
            sx={{
              backgroundColor: theme.palette.background.default,
              height: "35px",
              width: "35px",
              ":hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white
              }
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        </Stack>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          className="hover-button"
          onClick={() => {
            openAddToCart(product);
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
        >
          {t("home.addToCart")}
        </Button>
      </Box>
      <CustomLink
        href={"/" + product.category + "/" + product.id + "/" + product.title}
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
        handleColorChange={(color) => setSelectedColor(color, product.id)}
      />
      <SizeSelect
        variant="small"
        sizes={product.sizes || []}
        selectedSize={selectedSize}
        handleSizeChange={(size: string) => setSelectedSize(size, product.id)}
      />
    </Box>
  );
});
