"use client";
import { useAppDispatch, useAppSelector } from "@/features/store";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useRouter } from "next/navigation";
import { logoutMeAsync } from "@/features/auth/handle-auth/auth.action";
import { enqueueSnackbar } from "notistack";
import { getErrorMessage } from "@/api/api";
import { useState } from "react";
import FadedMenu from "@/components/menu/menu";

export default function ProfileBar() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  async function logout() {
    try {
      await dispatch(logoutMeAsync()).unwrap();
      enqueueSnackbar("Logout Successful", { variant: "success" });
      router.replace("/");
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error));
    }
  }
  const menuOption = [
    {
      label: "Logout",
      action: logout,
    },
    {
      label: "Profile",
      action : () => {router.push('/profile')},
    },
  ];

  if (!user) {
    return (
      <Box>
        <ListItemButton
          disableGutters
          onClick={() => router.push("/login")}
        >
          <ListItem disablePadding>
            <ListItemIcon>
                <PowerSettingsNewIcon  />
    
            </ListItemIcon>
            <ListItemText>Login </ListItemText>
          </ListItem>
        </ListItemButton>
      </Box>
    );
  }
  return (
    <Stack spacing={1} direction={"row"}>
      <Stack spacing={1} direction={"row"} sx={{ alignItems: "center" }}>
        <ListItemIcon
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          <Avatar sizes="small" src={user.avatar ?? ""}>{user.username.charAt(0)}</Avatar>
        </ListItemIcon>

        <ListItemText>{user.username}</ListItemText>
      </Stack>
      <FadedMenu
        options={menuOption}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
      />
    </Stack>
  );
}
