"use client";

import { Box } from "@mui/material";

import { WishList } from "~/components/pages";

const CartPage = () => {
  return (
    <>
      <Box paddingBottom={2}>
        <WishList />
      </Box>
    </>
  );
};

export default CartPage;
