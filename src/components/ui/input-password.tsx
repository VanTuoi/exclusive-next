"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: Partial<Record<keyof T, { message?: string }>>;
  name: Path<T>;
}

export const PasswordInput = <T extends FieldValues>({
  label,
  register,
  errors,
  name,
  placeholder
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormControl fullWidth error={Boolean(errors[name])}>
      <TextField
        label={label}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        variant="outlined"
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...register(name)}
        error={Boolean(errors[name])}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};
// ---> Using memo here will not get the error
// export const PasswordInput = memo(PasswordInputComponent) as typeof PasswordInputComponent;
