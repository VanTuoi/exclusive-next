"use client";

import { Box, Card, CardContent } from "@mui/material";
import { LoginForm } from "~/components/ui";

const SignUpPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 2
      }}
    >
      <Card
        elevation={6}
        sx={{
          borderRadius: 3,
          width: {
            xs: "100%",
            sm: 400
          }
        }}
      >
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage;
