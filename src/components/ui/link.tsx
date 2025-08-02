import Link from "next/link";

import { Typography, useTheme } from "@mui/material";
import { memo } from "react";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

const CustomLinkComponent: React.FC<CustomLinkProps> = ({ href, children }) => {
  const theme = useTheme();

  return (
    <Link href={href} passHref legacyBehavior>
      <Typography
        component="a"
        variant="h4"
        sx={{
          textTransform: "capitalize",
          textDecoration: "none",
          color: "inherit",
          transition: "color 0.2s ease",
          ":hover": {
            color: theme.palette.secondary.main
          },
          cursor: "pointer"
        }}
      >
        {children}
      </Typography>
    </Link>
  );
};

export const CustomLink = memo(CustomLinkComponent);
