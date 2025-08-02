"use client";

import { usePathname } from "next/navigation";

import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const LoadingBar = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? (
    <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 2000 }}>
      <LinearProgress color="primary" />
    </Box>
  ) : null;
};
