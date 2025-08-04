"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";

import { useHome } from "~/hooks";

export const Slider = memo(() => {
  const { dataBanner } = useHome();
  const router = useRouter();

  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));
  const height = isSmallDisplay ? 150 : 320;

  const firstSlide = dataBanner?.[0];

  return (
    <Box width={isSmallDisplay ? "100%" : "892px"} height={height} position="relative">
      {firstSlide ? (
        <Image
          src={firstSlide.url}
          alt={firstSlide.alt}
          fill
          sizes="(max-width: 1200px) 100vw, 892px"
          fetchPriority="high"
          priority
          style={{
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: 6
          }}
          onClick={() => router.push(firstSlide.link)}
        />
      ) : (
        <Skeleton variant="rounded" width="100%" height="100%" />
      )}
    </Box>
  );
});
