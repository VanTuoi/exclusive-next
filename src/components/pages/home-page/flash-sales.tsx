"use client";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useFlashSales } from "~/hooks";

import { Section } from "~/components/ui";
import { ProductComponent, SliderProducts } from "~/components/ui/section";

import { getDatePlusNDays } from "~/utils/time";

type SliderProductsRef = {
  slideNext: () => void;
  slidePrev: () => void;
};

const FlashSales = memo(() => {
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
    <Section
      nextItem={true}
      viewAll="bottom"
      title={t("home.flashSale.title")}
      content={t("home.flashSale.content")}
      timePromotion={getDatePlusNDays(20)}
      multiRow={1}
      handleChangeStep={handleChangeStep}
    >
      {!isLoading ? (
        <SliderProducts ref={sliderRef}>
          {dataFlashSafe.map((item) => (
            <SwiperSlide key={item.id} style={{ width: "220px", height: "auto" }}>
              <ProductComponent product={item} key={item.id} />
            </SwiperSlide>
          ))}
        </SliderProducts>
      ) : (
        <Skeleton variant="rounded" width={"220px"} height={"200px"}></Skeleton>
      )}
    </Section>
  );
});

export default FlashSales;
