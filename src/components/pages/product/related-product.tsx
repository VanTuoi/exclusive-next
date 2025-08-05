"use client";

import { Container, Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { Section } from "~/components/ui";
import { ProductComponent, SliderProducts } from "~/components/ui/section";

import { useFlashSales } from "~/hooks";

type SliderProductsRef = {
  slideNext: () => void;
  slidePrev: () => void;
};

interface RelatedProductProps {
  id?: number;
}

export const RelatedProduct = memo(({ id }: RelatedProductProps) => {
  const t = useTranslations();

  const { dataFlashSafe, isLoading } = useFlashSales();

  useEffect(() => {
    console.log("call api with id", id);
  }, []);

  const sliderRef = useRef<SliderProductsRef | null>(null);

  const handleChangeStep = ({ step }: { step: "next" | "previous" }) => {
    if (sliderRef.current) {
      if (step === "next") sliderRef.current.slideNext();
      else sliderRef.current.slidePrev();
    }
  };

  return (
    <Container>
      <Section
        nextItem={false}
        viewAll="none"
        title={t("productDetail.relatedItem")}
        content=""
        timePromotion=""
        multiRow={1}
        handleChangeStep={handleChangeStep}
      >
        {!isLoading ? (
          <SliderProducts ref={sliderRef}>
            {dataFlashSafe.map((item) => (
              <SwiperSlide key={item.title} style={{ width: "220px", height: "auto" }}>
                <ProductComponent product={item} key={item.id} />
              </SwiperSlide>
            ))}
          </SliderProducts>
        ) : (
          <Skeleton variant="rounded" width={"220px"} height={"200px"}></Skeleton>
        )}
      </Section>
    </Container>
  );
});
