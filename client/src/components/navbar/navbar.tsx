import { Box, ListItem, Menu, Paper, Stack, Typography } from "@mui/material";
import styles from "./navbar.module.css";

import React from "react";
import NavbarItems from "./navbar-items/navbar-items";
import ProfileBar from "./profile-bar/profile-bar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Navbar = () => {
  return (
      <Paper className={styles.main}>
      <Stack className={styles.container} color="theme.paper" direction={'row'}>
        <Stack direction={'row'} spacing={2} className={styles.section1}>
          <Stack  direction={"row"} sx={{alignItems:'center'}}>
            <CheckCircleIcon />
            <Typography variant="h6" className={styles.logo}>
              Tasks
            </Typography>
          </Stack>

          <NavbarItems />
        </Stack>

        <ProfileBar />
      </Stack>
      </Paper>

  );
};

export default Navbar;
