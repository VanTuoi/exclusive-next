import { Box, Container, Divider } from "@mui/material";
import { memo } from "react";

import { NavCategoriesWrapper } from "./nav";
import { Slider } from "./slider";

export const HomeNavCategories = memo(() => {
  return (
    <Container maxWidth={"lg"} disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row"
          },
          alignItems: "center",
          gap: {
            sm: 0,
            md: 1
          },
          justifyContent: "space-between"
        }}
      >
        <NavCategoriesWrapper />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            display: {
              xs: "none",
              md: "flex"
            }
          }}
        />
        <Slider />
        zzz
      </Box>
    </Container>
  );
});
