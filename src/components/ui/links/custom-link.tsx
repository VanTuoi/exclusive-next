import Link from "next/link";

import { SxProps, Theme, Tooltip, Typography } from "@mui/material";
import { memo, useMemo } from "react";

import type { TypographyProps } from "@mui/material/Typography";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: TypographyProps["variant"];
  maxLength?: number;
  underline?: boolean;
  underlineThickness?: number;
  fontWeight?: number | string;
  lineHeight?: number;
  marginLeft?: number;
  sx?: SxProps<Theme>;
}

export const CustomLink = memo(
  ({
    href,
    children,
    variant = "h6",
    maxLength = 20,
    underline = false,
    underlineThickness = 1,
    fontWeight = "normal",
    marginLeft = 0,
    sx
  }: CustomLinkProps) => {
    const text = typeof children === "string" ? children : "";
    const truncatedText = useMemo(
      () => (text.length > maxLength ? `${text.slice(0, maxLength)}...` : text),
      [text, maxLength]
    );

    const showTooltip = text.length > maxLength;

    return (
      <Tooltip title={showTooltip ? text : ""}>
        <Typography
          component={Link}
          href={href}
          variant={variant}
          sx={{
            display: "inline",
            fontWeight,
            textDecoration: underline ? "underline" : "none",
            textDecorationThickness: underline ? underlineThickness : undefined,
            textDecorationColor: "text.secondary",
            textUnderlineOffset: 1,
            textTransform: "capitalize",
            color: "inherit",
            cursor: "pointer",
            transition: "color 0.35s ease",
            ml: marginLeft,
            "&:hover": {
              color: "secondary.main",
              textDecorationColor: "secondary.main"
            },
            ...sx
          }}
        >
          {truncatedText}
        </Typography>
      </Tooltip>
    );
  }
);
