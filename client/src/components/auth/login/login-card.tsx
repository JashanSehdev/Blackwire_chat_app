import { Divider, Paper, Stack, Typography } from "@mui/material";
import LoginForm from "./login-form/login-form";
import styles from "./login-card.module.css";
import GoogleAuthButton from "../google-auth-button/google-auth";

export default function LoginCard() {
  return (
    <Paper className={styles.container}>
      <Stack spacing={2}>
        <Stack>
          <Typography variant="h3"  className={styles.title}>Welcome Back!</Typography>
          <Typography variant="body1" color="text.secondary"> Login to your account</Typography>
        </Stack>

        <LoginForm />
          <Divider>Or</Divider>
        <GoogleAuthButton/>
        <Typography href="forget-password" component='a'>Forget Password</Typography>
      </Stack>
    </Paper>
  );
}
