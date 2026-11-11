import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import GoogleLogo from "@/../public/google.png";
import styles from "./google.module.css";
import { googleAuthAsync } from "@/features/auth/handle-auth/auth.action";
import { useAppDispatch } from "@/features/store";
import { handleGoogleLogin as GoogleSignIn } from "@/lib/firebase/auth";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/api/api";

export default function GoogleAuthButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const HandleGoogleLogin = async () => {
    try {
      const result = await GoogleSignIn();
      if (!result) return;
      await dispatch(googleAuthAsync(result)).unwrap();
      enqueueSnackbar("Login Successful", { variant: "success" });
      router.replace("/");
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error));
    }
  };
  return (
    <Button variant={"outlined"} onClick={HandleGoogleLogin}>
      <Stack spacing={2} direction={"row"} className={styles.ButtonContent}>
        <Image src={GoogleLogo} alt="Google Logo" className={styles.Image} />
        <Typography>Google</Typography>
      </Stack>
    </Button>
  );
}
