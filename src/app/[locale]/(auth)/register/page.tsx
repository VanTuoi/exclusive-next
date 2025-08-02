import { Box } from "@mui/material";

import { RegisterForm } from "~/components/pages/register-form";

const RegisterPage = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
