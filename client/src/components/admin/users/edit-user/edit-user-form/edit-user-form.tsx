"use client";
import { Button, Divider, Stack } from "@mui/material";
import { EditUserInput, editUserSchema } from "./edit-user-form.type";
import SelectController from "@/components/form/select/selectController";
import { RoleEnum, StatusEnum } from "@/enum/user.enum";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUsers from "@/hooks/admin/useUsers";
import { AdminUser } from "@/type/user.type";

const RoleOptions = [
  {
    label: "Admin",
    value: RoleEnum.ADMIN,
  },
  {
    label: "User",
    value: RoleEnum.USER,
  },
];

const StatusOption = [
  {
    label: "Active",
    value: StatusEnum.ACTIVE,
  },
  {
    label: "Block",
    value: StatusEnum.BLOCKED,
  },
];

export default function EditUserForm({
  user,
  editUserbyAdmin,
}: {
  user: AdminUser;
  editUserbyAdmin: (
    userId: number,
    editUser: {
      status: StatusEnum;
      role: RoleEnum;
    },
  ) => Promise<void>;
}) {

  const { control, handleSubmit } = useForm<EditUserInput>({
    resolver: zodResolver(editUserSchema),
    defaultValues: user ?? {},
  });

  const onSubmit: SubmitHandler<EditUserInput> = (data) => {
    editUserbyAdmin(user.id, data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <SelectController
            name="role"
            label="Set Role"
            control={control}
            options={RoleOptions}
            size="small"
          />

          <SelectController
            size="small"
            name="status"
            label="Set Status"
            control={control}
            options={StatusOption}
          />
        </Stack>
        <Divider />
        <Stack spacing={2}>
          <Button variant="contained" type="submit">
            Edit
          </Button>
          <Button variant="outlined">Cancel</Button>
        </Stack>
      </Stack>
    </form>
  );
}
