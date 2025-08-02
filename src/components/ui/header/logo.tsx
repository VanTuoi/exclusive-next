"use client";
import { useRouter } from "next/navigation";

import { Box, Typography, useTheme } from "@mui/material";
import { memo } from "react";

export const Logo = memo(() => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
      onClick={() => {
        router.push("/");
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: theme.palette.background.paper,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 2
        }}
        p={1}
      >
        F2
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600 }} p={1}>
        Hệ thống học tập trực tuyến
      </Typography>
    </Box>
  );
});
