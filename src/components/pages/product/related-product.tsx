import { Container, Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useRef } from "react";
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

  console.log("use is id", id);

  const sliderRef = useRef<SliderProductsRef | null>(null);

  const handleChangeStep = ({ step }: { step: "next" | "previous" }) => {
    if (sliderRef.current) {
      if (step === "next") sliderRef.current.slideNext();
      else sliderRef.current.slidePrev();
    }
  };

  return (
    <Container maxWidth={"lg"}>
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
              <SwiperSlide key={item.title} style={{ width: "270px", height: "auto" }}>
                <ProductComponent product={item} key={item.id} />
              </SwiperSlide>
            ))}
          </SliderProducts>
        ) : (
          <Skeleton variant="rounded" width={"244px"} height={"244px"}></Skeleton>
        )}
      </Section>
    </Container>
  );
});
