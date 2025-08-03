import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

interface LogoProps {
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
}

export const Logo = memo(({ justifyContent = "center" }: LogoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: justifyContent
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h2"
          sx={{
            color: "black",
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
      </Link>
    </Box>
  );
});
