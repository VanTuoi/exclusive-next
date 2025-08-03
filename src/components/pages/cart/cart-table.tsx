import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import { memo } from "react";

import { CartItem } from "~/stores";

import { useTranslations } from "next-intl";
import { CartItemRow } from "./cart-row";
interface CartTableProps {
  items: { [key: number]: CartItem };
}

export const CartTable = memo(({ items }: CartTableProps) => {
  const theme = useTheme();

  const t = useTranslations();

  return Object.keys(items).length > 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ borderColor: theme.palette.grey[50] }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ width: "25%", fontSize: "16px", fontWeight: 500 }}>
              {t("cart.table.products")}
            </TableCell>
            <TableCell align="center" sx={{ width: "25%", fontSize: "16px", fontWeight: 500 }}>
              {t("cart.table.price")}
            </TableCell>
            <TableCell align="center" sx={{ width: "25%", fontSize: "16px", fontWeight: 500 }}>
              {t("cart.table.quantity")}
            </TableCell>
            <TableCell align="right" sx={{ width: "25%", fontSize: "16px", fontWeight: 500 }}>
              {t("cart.table.subtotal")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(items).map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box
      width={"100%"}
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", py: 5 }}
    >
      <Typography>{t("cart.empty")}</Typography>
    </Box>
  );
});
