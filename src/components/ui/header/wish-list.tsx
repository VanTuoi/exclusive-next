import { usePathname, useRouter } from "next/navigation";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge, Box, IconButton } from "@mui/material";
import { memo, useMemo } from "react";

import { useWishList } from "~/stores";

export const WishList = memo(() => {
  const { items } = useWishList();

  const router = useRouter();
  const pathname = usePathname();

  const totalItems = useMemo(() => {
    return Object.values(items).reduce((sum) => sum + 1, 0);
  }, [items]);

  return (
    <Box
      onClick={() => {
        router.push("/wish-list");
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
        <IconButton color={pathname.includes("/wish-list") ? "primary" : "default"}>
          <FavoriteIcon />
        </IconButton>
      </Badge>
    </Box>
  );
});
