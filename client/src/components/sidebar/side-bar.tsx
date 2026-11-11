"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Stack,
  Avatar,
  Typography,
  ListItem,
  ListItemAvatar,
  Button,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./side-bar.module.css";
import { useState } from "react";
import Link from "next/link";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import PersonIcon from "@mui/icons-material/Person";
import { useAppDispatch, useAppSelector } from "@/features/store";
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from "next/navigation";
import { logoutMeAsync } from "@/features/auth/handle-auth/auth.action";

const drawerWidth = 240;

const menuItems = [
  { title: "Profile", path: "/profile", icon: <PersonIcon /> },
  { title: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { title: "Groups", path: "/groups", icon: <GroupIcon /> },
  { title: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

export default function Sidebar() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = useAppSelector((state) => state.auth.user)
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    dispatch(logoutMeAsync());
    router.push("/login")
  }


  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box className={styles.container}>
      <Stack sx={{flex: 1}}>
        <Toolbar>
          <RunCircleIcon />
          <h3>My Application</h3>
        </Toolbar>

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              href={item.path}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Stack>
      <Divider/>
      <Box>
        {
          user ? (
            <Stack direction={'column'} sx={{p: '0.5rem'}}>
            <ListItem>
              <ListItemAvatar>
                <Avatar 
                  src={user.avatar ?? ""}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={user.email}
                slotProps={{
                  secondary: {
                    noWrap: true,
                    sx: { width: "100%" },
                  },
                }}
              />
            </ListItem>

            <Button variant="contained" onClick={logout} >
              Logout
            </Button>
            </Stack>
          ) : (
            <ListItem className={styles.loginButton} onClick={() => router.push("/login")}>
              <ListItemAvatar>
                <Avatar>
                  <LoginIcon/>
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary="Login"
              />
            </ListItem>
          ) 
        }
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
