
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";

type MultiAutocompleteProps<T extends FieldValues, Option> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  loadOptions: (search: string) => Promise<Option[]>;
  getOptionLabel: (option: Option) => string;
  isOptionEqualToValue: (option: Option, value: Option) => boolean;
  rules?: RegisterOptions<T, FieldPath<T>>;
  placeholder?: string;
  disabled?: boolean;
  minSearchLength?: number;
  debounceTime?: number;
};

export function MultiAutocompleteController<
  T extends FieldValues,
  Option
>({
  name,
  control,
  label,
  loadOptions,
  getOptionLabel,
  isOptionEqualToValue,
  rules,
  placeholder,
  disabled,
  minSearchLength = 2,
  debounceTime = 400,
}: MultiAutocompleteProps<T, Option>) {
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = inputValue.trim();

    if (search.length < minSearchLength) return;

    let ignore = false;

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const result = await loadOptions(search);

        if (!ignore) {
          setOptions(result);
        }
      } catch (error) {
        if (!ignore) {
          setOptions([]);
          console.error("User search failed:", error);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }, debounceTime);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [inputValue, loadOptions, debounceTime, minSearchLength]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const selectedValues = (field.value ?? []) as Option[];

        // Keep selected values available even when API search changes.
        const availableOptions = [
          ...selectedValues,
          ...options.filter(
            (option) =>
              !selectedValues.some((selected) =>
                isOptionEqualToValue(option, selected)
              )
          ),
        ];

        return (
          <Autocomplete
            multiple
            options={
              inputValue.trim().length >= minSearchLength
                ? availableOptions
                : selectedValues
            }
            value={selectedValues}
            inputValue={inputValue}
            loading={loading}
            disabled={disabled}
            filterOptions={(options) => options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            onInputChange={(_, value, reason) => {
              if (reason === "input" || reason === "clear") {
                setInputValue(value);
              }
            }}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
        );
      }}
    />
  );
}
