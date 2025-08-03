"use client";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";
import { memo, useEffect, useState } from "react";

export const ScrollToTopButton = memo(() => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <IconButton
      aria-label="scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      sx={{
        position: "fixed",
        bottom: { xs: 5, md: 25 },
        right: { xs: 5, md: 25 },
        zIndex: 100,
        width: 50,
        height: 50
      }}
    >
      <ArrowUpwardIcon sx={{ fontSize: { xs: 15, sm: 30 } }} color="primary" />
    </IconButton>
  );
});
