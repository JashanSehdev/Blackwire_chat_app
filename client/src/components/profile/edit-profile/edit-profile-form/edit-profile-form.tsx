"use client";
import ControlField from "@/components/form/controller-field/control-field";
import { Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

export default function EditProfileForm() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data : unknown) => { // needed to update it
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            <ControlField
              name="Firstname"
              label="First Name"
              placeholder="Joe"
              control={control}
            />

            <ControlField
              name="mobileNumber"
              label="Mobile Number"
              placeholder="Joe"
              control={control}
            />
          </Stack>
        </Grid>

        <Grid size={6}>
          <Stack>
            <ControlField
              name="lastName"
              label="Last Name"
              placeholder="Joe"
              control={control}
            />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
