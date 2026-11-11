import { MenuItem, TextField } from "@mui/material";
import {
  Controller,
  type FieldPath,
  type Control,
  type FieldValues,
  RegisterOptions,
} from "react-hook-form";

type Option = {
  label: string;
  value: string;
};
type SelectControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  rules?: RegisterOptions<T, FieldPath<T>>;
  size ?: 'small' | 'medium'
};
export default function SelectController<T extends FieldValues>({
  name,
  control,
  label,
  options,
  size
}: SelectControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          helperText={error?.message}
          error={!!error}
          label={label}
          value={field.value ?? ""}
          size={size}
        >
          <MenuItem value="">Select an Option</MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
