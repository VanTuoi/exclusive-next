"use client";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

interface LogoProps {
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
  color?: string;
}

export const Logo = memo(({ justifyContent = "center", color = "black" }: LogoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: justifyContent
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        {isMobile ? (
          <Box
            sx={{
              width: 40,
              height: 40,
              border: "2px solid white",
              backgroundColor: "black",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: 22,
                color: "white",
                fontFamily: "Inter",
                fontWeight: 700
              }}
            >
              E
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="h2"
            sx={{
              color: color,
              fontFamily: "Inter",
              lineHeight: "24px",
              letterSpacing: "0.03em",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "none"
              }
            }}
          >
            Exclusive
          </Typography>
        )}
      </Link>
    </Box>
  );
});
