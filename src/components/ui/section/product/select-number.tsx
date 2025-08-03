import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, InputBase } from "@mui/material";
import React, { memo } from "react";

interface NumberProductProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
}

export const NumberProduct = memo(({ quantity = 1, onQuantityChange }: NumberProductProps) => {
  const handleIncrease = () => onQuantityChange(quantity + 1);
  const handleDecrease = () => quantity > 1 && onQuantityChange(quantity - 1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 1) {
      onQuantityChange(value);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      border="1px solid"
      borderColor="grey.400"
      borderRadius={1}
      overflow="hidden"
      height={36}
    >
      <IconButton
        onClick={handleDecrease}
        size="small"
        sx={{
          borderRadius: 0,
          height: "100%",
          width: 36
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      <InputBase
        type="number"
        value={quantity}
        onChange={handleChange}
        inputProps={{
          min: 1,
          style: {
            textAlign: "center",
            padding: 0,
            height: "100%",
            MozAppearance: "textfield"
          }
        }}
        sx={{
          width: 50,
          input: {
            textAlign: "center",
            "&::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0
            },
            "&::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0
            },
            MozAppearance: "textfield"
          }
        }}
      />

      <IconButton
        onClick={handleIncrease}
        size="small"
        sx={{
          borderRadius: 0,
          height: "100%",
          width: 36
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
});
