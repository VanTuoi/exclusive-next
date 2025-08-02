"use client";

import Link from "next/link";

import { Typography, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <Typography sx={{ color: theme.palette.success[800] }} className="" variant="h1">
      <Link href={"/courses"}>Courses</Link>
    </Typography>
  );
}
