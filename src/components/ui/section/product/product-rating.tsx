import { Star } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";

interface ProductRatingProps {
  rating: {
    rate: number;
    count: number;
  };
  moreText?: string;
}

export const ProductRating = ({ rating }: ProductRatingProps) => {
  const theme = useTheme();

  return (
    <Stack direction="row" gap={0.5} alignItems="center" sx={{ color: theme.palette.text.secondary }}>
      <Typography variant="h5" fontWeight={500} component="span">
        {rating?.rate?.toFixed(1)}
      </Typography>
      <Star fontSize="small" sx={{ color: "#f5a623" }} />
    </Stack>
  );
};
