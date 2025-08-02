import { Box } from "@mui/material";

import { LoginForm } from "~/components/pages/login-form";

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
