import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateUser, useDeleteUser, useUpdateUser } from "~/hooks/use-users";

import { UserData } from "~/types/user";

export const UserFormModal = ({
  open,
  onClose,
  user
}: {
  open: boolean;
  onClose: () => void;
  user?: UserData | null;
}) => {
  const userSchema = z
    .object({
      name: z.string().min(1, "Tên người dùng không được để trống").max(100, "Tên người dùng không quá 100 ký tự"),
      email: z.string().email("Email không hợp lệ").max(100, "Email không quá 100 ký tự"),
      avatar: z.string().url("Ảnh phải là một URL hợp lệ").optional().or(z.literal("")),
      password: z
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(100, "Mật khẩu không quá 100 ký tự")
        .optional()
        .or(z.literal("")),
      password_confirmation: z
        .string()
        .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự")
        .max(100, "Xác nhận mật khẩu không quá 100 ký tự")
        .optional()
        .or(z.literal("")),
      phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Số điện thoại không hợp lệ")
        .optional()
        .or(z.literal("")),
      gender: z.enum(["male", "female", "other"]).optional(),
      date_of_birth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh phải có định dạng YYYY-MM-DD")
        .optional()
        .or(z.literal("")),
      address: z.string().max(200, "Địa chỉ không quá 200 ký tự").optional().or(z.literal("")),
      enrollment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày đăng ký phải có định dạng YYYY-MM-DD"),
      status: z.enum(["active", "inactive"]),
      roles: z.enum(["admin", "user"]).array().optional()
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
      if (password !== password_confirmation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password_confirmation"],
          message: "Mật khẩu xác nhận không khớp"
        });
      }
    });

  type UserInput = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
      password: "",
      password_confirmation: "",
      phone: "",
      gender: undefined,
      date_of_birth: "",
      address: "",
      enrollment_date: "",
      roles: [],
      status: "active"
    }
  });

  useEffect(() => {
    if (user) {
      const { ...userData } = user;
      reset({
        ...userData,
        avatar: userData.avatar || "",
        password: "",
        password_confirmation: "",
        phone: userData.phone || "",
        gender: userData.gender || undefined,
        date_of_birth: userData.date_of_birth ? dayjs(userData.date_of_birth).format("YYYY-MM-DD") : "",
        address: userData.address || "",
        enrollment_date: userData.enrollment_date ? dayjs(userData.enrollment_date).format("YYYY-MM-DD") : "",
        status: userData.status || "active",
        roles: userData.roles || []
      });
    } else {
      reset({
        name: "",
        email: "",
        avatar: "",
        password: "",
        password_confirmation: "",
        phone: "",
        gender: undefined,
        date_of_birth: "",
        address: "",
        enrollment_date: "",
        status: "active",
        roles: []
      });
    }
  }, [user, reset]);

  const { createUser, loading: loadingCreate } = useCreateUser(onClose);
  const { updateUser, loading: loadingUpdate } = useUpdateUser(onClose);
  const { deleteUser, loading: loadingDelete } = useDeleteUser(onClose);

  const onSubmit = handleSubmit((data: UserInput) => {
    if (user) {
      updateUser({
        id: user.id,
        userData: data
      });
    } else {
      createUser(data);
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Cập nhật người dùng" : "Thêm người dùng mới"}</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Tên người dùng"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Ảnh (URL)"
              fullWidth
              {...register("avatar")}
              error={!!errors.avatar}
              helperText={errors.avatar?.message}
            />

            <TextField
              label="Mật khẩu"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Xác nhận mật khẩu"
              type="password"
              fullWidth
              {...register("password_confirmation")}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
            />

            <TextField
              label="Số điện thoại (+84)"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <TextField
              select
              label="Giới tính"
              fullWidth
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              <MenuItem value="male">Nam</MenuItem>
              <MenuItem value="female">Nữ</MenuItem>
              <MenuItem value="other">Khác</MenuItem>
            </TextField>

            <TextField
              label="Ngày sinh (YYYY-MM-DD)"
              fullWidth
              {...register("date_of_birth")}
              error={!!errors.date_of_birth}
              helperText={errors.date_of_birth?.message}
            />

            <TextField
              label="Địa chỉ"
              fullWidth
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />

            <TextField
              label="Ngày đăng ký (YYYY-MM-DD)"
              fullWidth
              {...register("enrollment_date")}
              error={!!errors.enrollment_date}
              helperText={errors.enrollment_date?.message}
            />

            <Controller
              name="roles"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <TextField
                  select
                  label="Vai trò"
                  fullWidth
                  SelectProps={{
                    multiple: true
                  }}
                  error={!!errors.roles}
                  helperText={errors.roles?.message}
                  {...field}
                  value={field.value || []}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <MenuItem value="admin">Quản trị viên</MenuItem>
                  <MenuItem value="user">Người dùng</MenuItem>
                </TextField>
              )}
            />

            <TextField
              select
              label="Trạng thái"
              fullWidth
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <MenuItem value="active">Hoạt động</MenuItem>
              <MenuItem value="inactive">Không hoạt động</MenuItem>
            </TextField>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={onClose} color="error">
                Hủy
              </Button>

              {user && (
                <Button onClick={() => deleteUser(user)} disabled={loadingDelete} color="error" variant="outlined">
                  Xoá
                </Button>
              )}

              <Button
                type="submit"
                variant="contained"
                loading={isSubmitting || loadingCreate || loadingUpdate}
                disabled={isSubmitting || loadingCreate || loadingUpdate}
              >
                {user ? "Cập nhật" : "Tạo mới"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
