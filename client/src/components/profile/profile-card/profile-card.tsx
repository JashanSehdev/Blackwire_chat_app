"use client";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import styles from "./profile-card.module.css";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloudinaryUploadController from "@/components/form/upload-widget/upload-widget";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { changeAvatarAsync } from "@/features/auth/handle-user/users.action";

interface avatarInput {
  avatar: string;
}
export default function ProfileCard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { control, setValue, handleSubmit } = useForm<avatarInput>();
  const onUpdationComplete = async (url: string) => {
    console.log("hi")
    if (!url) return;
    setValue("avatar", url);
    await handleSubmit(onSubmit)();
  };
  const onSubmit = (data: avatarInput) => dispatch(changeAvatarAsync(data));
  return (
    <Paper>
      <Stack direction="row" className={styles.container} useFlexGap>
        <Stack direction="row" spacing={1.5}>
          <Box className={styles.editBox}>
            <Avatar src={user?.avatar || ""} className={styles.avatar}>
              JS
            </Avatar>

            <Avatar className={styles.editAvatar}>
            
                <CloudinaryUploadController
                  onUploadComplete={onUpdationComplete}
                  name="avatar"
                  control={control}
                >
                  <PhotoCameraIcon sx={{ fontSize: "1.5rem" }} />
                </CloudinaryUploadController>
             
            </Avatar>
          </Box>

          <Stack sx={{ width: "100%", justifyContent: "center" }} spacing={1}>
            <Stack spacing={-1}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "700", fontSize: "20px" }}
              >
                Jashan Sehdev
              </Typography>
              <Typography variant="caption">@jashanSehdev</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <MailIcon />
              <Typography>jashan@gmail.com</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box>
          <Button variant="outlined" color="secondary">
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <EditIcon fontSize="small" />
              <Typography>Edit</Typography>
            </Stack>
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
