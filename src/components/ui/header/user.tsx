"use client";

import { useRouter } from "next/navigation";

import { Avatar, Box, Button, IconButton, Menu, MenuItem, Skeleton, Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { memo, MouseEvent, useState } from "react";

import { useLogout } from "~/hooks";

export const User = memo(() => {
  const { data: session, status } = useSession();
  const { handleLogout } = useLogout();
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userData = session?.user;
  const loading = status === "loading";

  return !loading ? (
    <Box sx={{ flexGrow: 0 }}>
      {!userData ? (
        <Button variant="contained" onClick={() => router.push("/login")}>
          Đăng nhập
        </Button>
      ) : (
        <>
          <Tooltip title="">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userData.name || "User"} src={userData.avatar || ""} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                router.push("/profile");
              }}
              sx={{ px: 3, py: 1 }}
            >
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Cài đặt
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                handleLogout();
              }}
              sx={{ px: 3, py: 1 }}
            >
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Đăng xuất
              </Typography>
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  ) : (
    <Skeleton variant="circular" width={40} height={40} />
  );
});
