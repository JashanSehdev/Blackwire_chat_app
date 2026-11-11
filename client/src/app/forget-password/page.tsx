"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import styles from "./forget-password.module.css";
import { useForm } from "react-hook-form";
import ControlField from "@/components/form/controller-field/control-field";

export default function ForgetPassword() {
  const { control } = useForm();

  const getEmail = (
    <Stack spacing={2}>
      <Typography variant="body1" align="center">
        Kindly Enter Your Email
      </Typography>
      <ControlField
        control={control}
        name="email"
        placeholder="Enter Your Email"
        type="email"
      />
    </Stack>
  );

  const getOTP = (
    <Stack>
    </Stack>
  )

  return (
    <Box className={styles.main}>
      <Paper className={styles.container}></Paper>
    </Box>
  );
}

function getEmail() {
  return (
    <form>
    </form>
  );
}
