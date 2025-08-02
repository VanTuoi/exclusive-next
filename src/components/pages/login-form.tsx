"use client";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Card,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLogin } from "~/hooks";

import { Logo, PasswordInput } from "~/components/ui";

export const LoginForm = memo(() => {
  const theme = useTheme();
  const router = useRouter();

  const formSchema = z.object({
    email: z
      .string({ required_error: "Vui lòng nhập email" })
      .min(1, { message: "Email không được để trống" })
      .max(20, { message: "Email không được vượt quá 20 ký tự" }),

    password: z
      .string({ required_error: "Vui lòng nhập mật khẩu" })
      .min(1, { message: "Mật khẩu không được để trống" })
      .max(50, { message: "Mật khẩu không được vượt quá 50 ký tự" })
      .refine((value) => value.length >= 8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự"
      })
  });

  const { login, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "jone@example.com",
      password: "12345678"
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2
      }}
    >
      <Card
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: {
            sx: "auto",
            sm: 350
          },
          padding: 4,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Stack spacing={3}>
          <Logo />
          <Typography variant="h4" component="h1" textAlign="left">
            Đăng nhập
          </Typography>
          <FormControl error={Boolean(errors.email)}>
            <TextField
              label="Email"
              type="text"
              placeholder="Email của bạn"
              variant="outlined"
              required
              fullWidth
              {...register("email")}
              error={Boolean(errors.email)}
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
          </FormControl>
          <PasswordInput
            label="Mật khẩu"
            placeholder="Mật khẩu của bạn"
            register={register}
            errors={errors}
            name="password"
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            loading={loading}
            disabled={loading || !isValid}
          >
            Đăng nhập
          </LoadingButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Typography variant="h5" sx={{ marginRight: 1 }}>
              Bạn chưa có tài khoản?
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                router.push("register");
              }}
            >
              {" "}
              Đăng ký ngay
            </Typography>
          </Box>
          <Divider sx={{ fontSize: 13, fontWeight: 500 }}>Hoặc đăng nhập với</Divider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <IconButton
              aria-label="google"
              size="large"
              sx={{
                ":hover": {
                  color: "#DB4437"
                }
              }}
            >
              <GoogleIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="facebook"
              size="large"
              sx={{
                ":hover": {
                  color: "#1877F2"
                }
              }}
            >
              <FacebookIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="apple"
              size="large"
              sx={{
                ":hover": {
                  color: "#000000"
                }
              }}
            >
              <AppleIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
});
