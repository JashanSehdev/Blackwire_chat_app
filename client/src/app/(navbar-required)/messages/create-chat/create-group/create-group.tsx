import { Avatar, Button, Stack } from "@mui/material";
import SelectUsers from "./select-users/select-user";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupInput, groupSchema } from "./create-group.type";
import styles from "./create-group.module.css";
import ControlField from "@/components/form/controller-field/control-field";
import CloudinaryUploadController from "@/components/form/upload-widget/upload-widget";
import { useAppDispatch } from "@/features/store";
import { createGroupAsync } from "@/features/chat/handle-chat/chat.action";

export default function CreateGroup() {
  const dispatch = useAppDispatch()
  const { control, handleSubmit } = useForm<GroupInput>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      members: [],
    },
  });

  const onSubmit: SubmitHandler<GroupInput> = (data) => {
    const {members, ...rest} = data
    const payload = {
      members : members.map((user)=>user.id)
  };
  
    console.log(data, payload.members);
    dispatch(createGroupAsync({...rest, memberId: payload.members}))
  };

  const groupProfile = useWatch({
    control: control,
    name: "profileAvatar",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Stack spacing={3}>
        <Stack spacing={2} >
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Avatar src={groupProfile} className={styles.avatar}/>
            <CloudinaryUploadController control={control} name="profileAvatar">
              <Button>Add profile photo</Button>
            </CloudinaryUploadController>
          </Stack>

          <ControlField control={control} name="name" label="Group Name" />
          <SelectUsers control={control} />
        </Stack>
        <Button variant="contained" type="submit">
          Create Group
        </Button>
      </Stack>
    </form>
  );
}
