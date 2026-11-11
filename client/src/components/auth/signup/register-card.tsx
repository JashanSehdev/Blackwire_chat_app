"use client";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputFields, RegisterInput, registerSchema } from "./register.type";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./register.module.css";
import GoogleAuthButton from "@/components/auth/google-auth-button/google-auth";
import Link from "next/link";
import useRegister from "@/hooks/useRegister";

const inputs: InputFields[] = [
  {
    name: "username",
    type: "text",
    placeholder: "eg: John Doe",
    label: "Username",
  },
  {
    name: "email",
    type: "email",
    placeholder: "eg: john.doe@gmail.com",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Your Password",
    label: "Confirm Password",
  },
];

export default function RegisterCard() {
  const { loading, registerUser } = useRegister();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (
    data: RegisterInput,
  ) => {
    await registerUser(data.username, data.email, data.password);
  };
  return (
    <Paper className={styles.Container}>
      <Stack direction="column" spacing={3}>
        <Typography variant="h3">Create Your Account</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
            {inputs.map((item) => (
              <Box key={item.label} className={styles.inputBox}>
                <InputLabel>{item.label}</InputLabel>
                <TextField
                  key={item.name}
                  {...register(item.name)}
                  placeholder={item.placeholder}
                  type={item.type}
                  error={!!errors[item.name]}
                  helperText={errors[item.name]?.message}
                  fullWidth
                />
              </Box>
            ))}
            <Stack direction={"row"} spacing={1}>
              <Typography variant="body1">Already Have an account?</Typography>
              <Link href={"login"}>
                <Typography>Login</Typography>
              </Link>
            </Stack>
            <Button loading={loading} type="submit" variant="contained">
              Signup
            </Button>
          </Stack>
        </form>
        <Divider>Or</Divider>
        <GoogleAuthButton />
      </Stack>
    </Paper>
  );
}
