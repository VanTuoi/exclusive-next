"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useHome } from "~/hooks";

import { useRouter } from "next/navigation";
import { Section } from "~/components/ui";
import { ProductComponent, SliderProducts } from "~/components/ui/section";

type SliderProductsRef = {
  slideNext: () => void;
  slidePrev: () => void;
};

const ExploreProducts = memo(() => {
  const { dataFlashSafe } = useHome();
  const router = useRouter();
  const t = useTranslations();

  const theme = useTheme();

  const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));

  const sliderRef = useRef<SliderProductsRef | null>(null);

  const handleChangeStep = ({ step }: { step: "next" | "previous" }) => {
    if (sliderRef.current) {
      if (step === "next") sliderRef.current.slideNext();
      else sliderRef.current.slidePrev();
    }
  };

  return (
    <Section
      handleViewAll={() => router.push("/products")}
      viewAll="bottom"
      title={t("home.explore.title")}
      content={t("home.explore.content")}
      timePromotion=""
      multiRow={isSmallDisplay ? 1 : 2}
      nextItem={true}
      handleChangeStep={handleChangeStep}
    >
      <SliderProducts ref={sliderRef}>
        {[...dataFlashSafe, ...dataFlashSafe].map((item, index) => (
          <SwiperSlide key={item.id + index} style={{ width: "220px", height: "auto" }}>
            <ProductComponent product={item} />
          </SwiperSlide>
        ))}
      </SliderProducts>
    </Section>
  );
});

export default ExploreProducts;
