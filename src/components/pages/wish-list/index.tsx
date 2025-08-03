"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { memo, useMemo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useCartStore, useWishList } from "~/stores";

import { SliderProducts } from "~/components/ui/section";

import { useTranslations } from "next-intl";
import { ProductWishListComponent } from "~/components/ui/section/product/product-wish-list";
import { JustForYou } from "./just-for-you";

type SliderProductsRef = {
  slideNext: () => void;
  slidePrev: () => void;
};

export const WishList = memo(() => {
  const t = useTranslations();

  const { items, toggleWishList } = useWishList();

  const { updateItem } = useCartStore();

  const totalItems = useMemo(() => {
    return Object.values(items).reduce((sum) => sum + 1, 0);
  }, [items]);

  const sliderRef = useRef<SliderProductsRef | null>(null);

  const moveAllToCart = () => {
    Object.values(items).map((item) => {
      const product = item.product;
      const selectedOptions = item.selectedOptions;

      const selectedColor = selectedOptions.color || "";
      const selectedSize = selectedOptions.size || "";

      updateItem(product, 1, { color: selectedColor, size: selectedSize });
      toggleWishList(product, { color: selectedColor, size: selectedSize });
    });
  };

  return (
    <Stack direction={"column"} spacing={{ xs: 2, md: 5 }}>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h3" paddingY={{ xs: 1, md: 5 }}>
          {t("wishList.title")} ({totalItems})
        </Typography>
        {totalItems > 0 && (
          <Button variant="text" size="large" onClick={() => moveAllToCart()}>
            {t("wishList.button")}
          </Button>
        )}
      </Box>
      {totalItems === 0 && (
        <Box
          width={"100%"}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography>{t("wishList.empty")}</Typography>
        </Box>
      )}
      <Box width={"100%"}>
        <SliderProducts multiRow={1} ref={sliderRef}>
          {Object.values(items).map((item) => {
            const product = item.product;
            return (
              <SwiperSlide key={product.id} style={{ width: "200px", height: "auto" }}>
                <ProductWishListComponent product={product} />
              </SwiperSlide>
            );
          })}
        </SliderProducts>
      </Box>
      <JustForYou />
    </Stack>
  );
});
