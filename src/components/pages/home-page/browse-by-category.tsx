"use client";
import { useTranslations } from "next-intl";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useHome } from "~/hooks";

import { Section } from "~/components/ui";
import { CategoriesComponent, SliderProducts } from "~/components/ui/section";

type SliderProductsRef = {
  slideNext: () => void;
  slidePrev: () => void;
};

const BrowseByCategory = memo(() => {
  const t = useTranslations();

  const { dataCategories } = useHome();

  const sliderRef = useRef<SliderProductsRef | null>(null);

  const handleChangeStep = ({ step }: { step: "next" | "previous" }) => {
    if (sliderRef.current) {
      if (step === "next") sliderRef.current.slideNext();
      else sliderRef.current.slidePrev();
    }
  };

  return (
    <Section
      viewAll="none"
      title={t("home.categories.title")}
      content={t("home.categories.content")}
      timePromotion=""
      multiRow={1}
      nextItem={true}
      handleChangeStep={handleChangeStep}
    >
      <SliderProducts ref={sliderRef}>
        {dataCategories.map((item) => (
          <SwiperSlide key={item.title} style={{ width: "170px", height: "auto" }}>
            <CategoriesComponent categories={item} />
          </SwiperSlide>
        ))}
      </SliderProducts>
    </Section>
  );
});

export default BrowseByCategory;
