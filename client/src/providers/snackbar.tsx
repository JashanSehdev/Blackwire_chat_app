'use client'
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

export default function Snackbar({ children }: { children: ReactNode }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
