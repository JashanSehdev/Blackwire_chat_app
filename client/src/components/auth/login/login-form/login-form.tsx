"use client";

import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./login.module.css";
import GoogleAuthButton from "@/components/auth/google-auth-button/google-auth";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";
import { InputFields, LoginInput, loginSchema } from "./login.type";
import ControlField from "@/components/form/controller-field/control-field";

const inputs: InputFields[] = [
  {
    name: "identifier",
    type: "text",
    label: "Enter Your email or username",
    placeholder: "eg : jash@gmail.com",
  },
  {
    name: "password",
    type: "password",
    label: "Enter Your password",
    placeholder: "Enter your password",
  },
];
export default function LoginForm() {
  const { loading, login } = useLogin();

  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: ""
    }
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    await login(data.identifier, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        {inputs.map((item) => (
          <ControlField
            key={item.name}
            name={item.name}
            label={item.label}
            type={item.type as "text" | "password"}
            control={control}
            placeholder={item.placeholder}
          />
        ))}
        <Stack direction={"row"} spacing={1}>
          <Typography variant="body1">Already Have an account?</Typography>
          <Link href={"register"}>
            <Typography>Register</Typography>
          </Link>
        </Stack>

        <Button loading={loading} type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </form>
  );
}
