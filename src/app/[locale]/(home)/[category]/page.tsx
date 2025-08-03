"use client";

import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { memo } from "react";

const CategoryPage = memo(() => {
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: { xs: "90vh", md: "100vh" } }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Inter",
          fontSize: { xs: "24px", md: "40px" },
          mt: { xs: "20px", md: "10px" },
          fontWeight: 500,
          lineHeight: "45px"
        }}
      >
        {t("develop.title")}
      </Typography>
      <Typography mt="20px" variant="h4">
        {t("develop.content")}
      </Typography>
      <Button sx={{ marginTop: "20px" }} variant="contained" onClick={() => router.push("/")}>
        {t("develop.button")}
      </Button>
    </Box>
  );
});

export default CategoryPage;
