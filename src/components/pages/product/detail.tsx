"use client";
import { Box, Button, Divider, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import "yet-another-react-lightbox/styles.css";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Slider } from "~/components/ui";
import { ColorSelect } from "~/components/ui/section/product/colors-select";
import { ProductPrice } from "~/components/ui/section/product/product-prices";
import { ProductRatingExtend } from "~/components/ui/section/product/product-rating-extend";
import { NumberProduct } from "~/components/ui/section/product/select-number";
import { SizeSelect } from "~/components/ui/section/product/size-product";
import { useCartStore, useWishList } from "~/stores";
import { Product } from "~/types";

import { useLocale, useTranslations } from "next-intl";
import { SupportProduct } from "./support";

interface ProductDetailsProps {
  product?: Product;
}

export const ProductDetails = memo(({ product }: ProductDetailsProps) => {
  const t = useTranslations();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [quantity, setQuantity] = useState<number>(1);

  const { items, toggleWishList, isProductInWishList } = useWishList();

  const { items: cartItems, updateItem } = useCartStore();

  const locale = useLocale();

  const [selectedColor, setSelectedColorPage] = useState<string>("");
  const [selectedSize, setSelectedSizePage] = useState<string>("");

  const width = isSmallScreen ? "97vw" : "500px";

  useEffect(() => {
    if (product) {
      setQuantity(cartItems[product.id]?.quantity || 1);
      if (isProductInWishList(product.id)) {
        setSelectedColorPage(items[product.id]?.selectedOptions.color);
        setSelectedSizePage(items[product.id]?.selectedOptions.size);
      } else {
        setSelectedColorPage(product.image?.[0]?.colorCode || "");
        setSelectedSizePage(product.sizes?.[0] || "");
      }
    }
  }, [items, product]);

  if (!product) return null;

  return (
    <Grid container spacing={{ xs: 4, lg: 2 }}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Slider images={product?.image} selectedColor={selectedColor} width={width} />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5, lg: 12 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "0.03em"
                }}
              >
                {product?.title}
              </Typography>
              <ProductRatingExtend
                rating={product?.rating}
                moreText={t("productDetail.review")}
                inStock={product?.inStock}
              />
              <ProductPrice
                sx={{ fontSize: "24px", lineHeight: "24px", fontWeight: 400 }}
                showOldPrice={false}
                price={product?.price}
                finalPrice={product?.finalPrice}
                locale={locale || "en"}
              />
              <Typography variant="body1">{product?.description}</Typography>
              <Divider orientation="horizontal" variant="fullWidth" flexItem />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5, lg: 12 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: {
                  xs: "8px",
                  md: "24px"
                }
              }}
            >
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  {t("productDetail.colors")}:
                </Typography>
                <ColorSelect
                  isLabel={false}
                  imgs={product?.image || []}
                  selectedColor={selectedColor}
                  handleColorChange={(color) => {
                    setSelectedColorPage(color);
                    if (isProductInWishList(product?.id)) {
                      toggleWishList(product, {
                        color: color,
                        size: items[product?.id].selectedOptions.size
                      });
                    }
                  }}
                />
              </Box>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  {t("productDetail.size")}:
                </Typography>
                {product?.sizes && (
                  <SizeSelect
                    sizes={product.sizes}
                    selectedSize={selectedSize}
                    handleSizeChange={(size) => {
                      setSelectedSizePage(size);
                      if (isProductInWishList(product?.id)) {
                        toggleWishList(product, {
                          color: items[product?.id].selectedOptions.color,
                          size: size
                        });
                      }
                    }}
                  />
                )}
              </Box>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
                <NumberProduct quantity={quantity} onQuantityChange={setQuantity} />
                <Button
                  variant="contained"
                  onClick={() => {
                    updateItem(product, quantity, {
                      color: selectedColor,
                      size: selectedSize
                    });
                  }}
                >
                  {t("productDetail.buttonBuy")}
                </Button>
                <IconButton
                  onClick={() => toggleWishList(product, { color: selectedColor, size: selectedSize })}
                  aria-label="fingerprint"
                  color={isProductInWishList(product.id) ? "primary" : "inherit"}
                  sx={{
                    backgroundColor: isProductInWishList(product.id)
                      ? theme.palette.primary.main
                      : theme.palette.background.default,
                    color: isProductInWishList(product.id) ? theme.palette.common.white : "",
                    height: "40px",
                    width: "40px",
                    ":hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white
                    }
                  }}
                >
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5, lg: 12 }}>
            <Box mt={"16px"}>
              <SupportProduct />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
