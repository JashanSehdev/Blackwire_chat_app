"use client";

import { getErrorMessage } from "@/api/api";
import { loginUserAsync } from "@/features/auth/handle-auth/auth.action";
import { useAppDispatch } from "@/features/store";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export default function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function login(identifier: string, password: string) {
    try {
      setLoading(true);
      await dispatch(loginUserAsync({ identifier, password })).unwrap();
      enqueueSnackbar("Login Successful", { variant: "success" });
      router.replace("/");
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: "error" });
    } finally {
      setLoading(false);
    }
  }




  return { login, loading };
}
