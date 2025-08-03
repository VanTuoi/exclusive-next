import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useHome } from "~/hooks";

export const Slider = memo(() => {
  const { dataBanner } = useHome();
  const router = useRouter();

  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (dataBanner) setIsLoading(false);
  }, [dataBanner]);

  const height = isSmallDisplay ? 150 : 344;

  return !isLoading ? (
    <Box width={isSmallDisplay ? "100%" : "892px"} height={height}>
      <Swiper
        pagination={{
          clickable: true,
          renderBullet: (index: number, className: string) => {
            return `<span class="${className}" style="border: 2px solid #fff; border-radius: 50%; width: 15px; height: 15px; display: inline-block; margin: 0 5px; background: ${
              index >= 0 ? "#ff0000" : "#ccc"
            };"></span>`;
          }
        }}
        loop={true}
        modules={[Pagination]}
        style={{
          height: isSmallDisplay ? "150px" : "100%",
          width: "100%"
        }}
      >
        {dataBanner?.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              sizes="100%"
              priority={index === 0}
              style={{ objectFit: "cover", cursor: "pointer" }}
              onClick={() => router.push(slide.link)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  ) : (
    <Skeleton variant="rounded" width={isSmallDisplay ? "100%" : "892px"} height={height} />
  );
});
