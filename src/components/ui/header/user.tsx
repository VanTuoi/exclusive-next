"use client";
import { Box, IconButton, Menu, MenuItem, Skeleton, Tooltip, Typography, useTheme } from "@mui/material";
import { memo, MouseEvent, useEffect, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, useGetMe } from "~/hooks/auth";
import { useAuthStore } from "~/stores";
import { isOlderThanMinutes } from "~/utils";

export const User = memo(() => {
  const { userData, timeUpdate } = useAuthStore();
  const theme = useTheme();
  const t = useTranslations("common");

  const router = useRouter();
  const pathname = usePathname();

  const { handleLogout } = useAuth();
  const { handleGetMe } = useGetMe();

  const menuItems = [
    {
      icon: <AccountCircleIcon fontSize="small" />,
      text: t("header.user.manageMyAccount"),
      action: () => router.push("/user/profile")
    },
    {
      icon: <ReceiptLongIcon fontSize="small" />,
      text: t("header.user.myOrder"),
      action: () => router.push("#")
    },
    {
      icon: <CancelIcon fontSize="small" />,
      text: t("header.user.myCancellations"),
      action: () => router.push("#")
    },
    {
      icon: <StarRateIcon fontSize="small" />,
      text: t("header.user.myReviews"),
      action: () => router.push("#")
    },
    {
      icon: <LogoutIcon fontSize="small" />,
      text: t("header.user.logout"),
      action: handleLogout
    }
  ];

  const [loading, setLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if ((isOlderThanMinutes(timeUpdate, 30) || !userData) && localStorage.getItem("isLogin") === "true") {
        setIsLogin(true);
        await handleGetMe().finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [userData, pathname]);

  useEffect(() => {
    handleCloseUserMenu();
  }, [pathname]);

  return !loading ? (
    <Box sx={{ flexGrow: 0 }}>
      {!isLogin || !userData ? null : (
        <>
          <Tooltip title={t("header.user.title")}>
            <IconButton
              color={pathname.includes("/user/profile") ? "primary" : "default"}
              onClick={handleOpenUserMenu}
              aria-label="Open user menu"
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{
              mt: "45px",
              "& .MuiPaper-root": {
                color: "inherit",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.18)"
              }
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted={false}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} onClick={item.action} sx={{ paddingX: 3, paddingY: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", color: theme.palette.common.white }}>
                  {item.icon}
                  <Typography variant="h4" sx={{ ml: 2, textAlign: "center", color: theme.palette.common.white }}>
                    {item.text}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  ) : (
    <Skeleton variant="circular" width={40} height={40} />
  );
});
