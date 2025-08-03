import { Container } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useHome } from "~/hooks";

import { Section } from "~/components/ui";
import { ProductComponent, SliderProducts } from "~/components/ui/section";

type SliderProductsRef = {
  slideNext: () => void;
  slidePrev: () => void;
};

export const MonthSale = memo(() => {
  const t = useTranslations();

  const { dataFlashSafe } = useHome();

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
        viewAll="top-right"
        title={t("home.monthSale.title")}
        content={t("home.monthSale.content")}
        timePromotion=""
        multiRow={1}
        nextItem={false}
        handleChangeStep={handleChangeStep}
      >
        <SliderProducts ref={sliderRef}>
          {dataFlashSafe.map((item) => (
            <SwiperSlide key={item.id} style={{ width: "250px", height: "auto" }}>
              <ProductComponent product={item} />
            </SwiperSlide>
          ))}
        </SliderProducts>
      </Section>
    </Container>
  );
});
