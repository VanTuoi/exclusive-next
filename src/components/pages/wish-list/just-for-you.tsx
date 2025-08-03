"use client";
import { Container, Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import { Section } from "~/components/ui";
import { SliderProducts } from "~/components/ui/section";
import { ProductJustForYouComponent } from "~/components/ui/section/product/product-just-for-you";

import { useFlashSales } from "~/hooks";

type SliderProductsRef = {
  slideNext: () => void;
  slidePrev: () => void;
};

export const JustForYou = memo(() => {
  const t = useTranslations();
  const { dataFlashSafe, isLoading } = useFlashSales();

  const sliderRef = useRef<SliderProductsRef | null>(null);

  const handleChangeStep = ({ step }: { step: "next" | "previous" }) => {
    if (sliderRef.current) {
      if (step === "next") sliderRef.current.slideNext();
      else sliderRef.current.slidePrev();
    }
  };

  return (
    <Container maxWidth={"lg"} disableGutters>
      <Section
        nextItem={false}
        viewAll="top-right"
        variantButton="contained"
        title={t("wishList.justForYou.title")}
        content={t("wishList.justForYou.title")}
        timePromotion=""
        multiRow={1}
        handleChangeStep={handleChangeStep}
      >
        {!isLoading ? (
          <SliderProducts ref={sliderRef}>
            {dataFlashSafe.map((item) => (
              <SwiperSlide key={item.title} style={{ width: "200px", height: "auto" }}>
                <ProductJustForYouComponent product={item} key={item.id} />
              </SwiperSlide>
            ))}
          </SliderProducts>
        ) : (
          <Skeleton variant="rounded" width={"200px"} height={"200px"}></Skeleton>
        )}
      </Section>
    </Container>
  );
});
