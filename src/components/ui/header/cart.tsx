import { usePathname, useRouter } from "next/navigation";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, IconButton } from "@mui/material";
import { memo, useMemo } from "react";

import { useCartStore } from "~/stores";

export const Cart = memo(() => {
  const { items } = useCartStore();

  const router = useRouter();
  const pathname = usePathname();

  const totalItems = useMemo(() => {
    return Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <Box
      onClick={() => {
        router.push("/cart");
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        padding: "2px 3px"
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        color="secondary"
        badgeContent={totalItems}
      >
        <IconButton color={pathname.includes("/cart") ? "primary" : "default"} aria-label="View shopping cart">
          <ShoppingCartIcon />
        </IconButton>
      </Badge>
    </Box>
  );
});
