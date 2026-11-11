"use client";
import { getErrorMessage } from "@/api/api";
import { MultiAutocompleteController } from "@/components/form/controller-autocomplete/control-autocomplete";
import { fetchUsersAsync } from "@/features/auth/handle-user/users.action";
import { useAppDispatch } from "@/features/store";
import useUsers from "@/hooks/admin/useUsers";
import { AdminUser } from "@/type/user.type";
import {
  AutocompleteRenderOptionState,
  AutocompleteRenderValueGetItemProps,
  Avatar,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { HTMLAttributes, ReactNode, useCallback } from "react";
import { Control } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import { GroupInput } from "../create-group.type";

type RenderOption = (
  props: HTMLAttributes<HTMLLIElement> & { key: React.Key },
  option: AdminUser,
  state: AutocompleteRenderOptionState,
) => ReactNode;

type RenderValue = (
  selectedUsers: AdminUser[],
  getItemProps: AutocompleteRenderValueGetItemProps<true>,
) => ReactNode;


interface SelectUserProp {
    control : Control<GroupInput>
}

export default function SelectUsers({
    control
} : SelectUserProp) {
  const dispatch = useAppDispatch();

  const onLoad = useCallback(async (search: string) => {
    const response = await dispatch(
      fetchUsersAsync({ search, page: 1, limit: 10 }),
    ).unwrap();
    return response.data;
  }, []);

  const getOptionLabel = (option: AdminUser) => {
    return option.username;
  };

  const isOptionEqualToValue = (option: AdminUser, value: AdminUser) => {
    return option.id === value.id;
  };

  const renderValue: RenderValue = (selectedUsers, getItemProps) => {
    return selectedUsers.map((user, index) => {
      const { key, ...itemProps } = getItemProps({ index });
      return (
        <Chip
          key={key}
          {...itemProps}
          size="small"
          avatar={
            <Avatar src={user.avatar}>{user.username[0]?.toUpperCase()}</Avatar>
          }
          label={user.username}
        />
      );
    });
  };

  const renderOptions: RenderOption = (props, option, { selected }) => {
    const {key, ...otherprops} = props
    return (
      <ListItem
        component={"li"}
        key={key}
        {...otherprops}
        secondaryAction={
          selected ? <DoneIcon color="primary" fontSize="small" /> : null
        }
        sx={{
          cursor: "pointer",
        }}
      >
        <ListItemAvatar>
          <Avatar src={ option.avatar}>
            {option.username.charAt(0)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={option.username} secondary={option.email} />
      </ListItem>
    );
  };



  return (
      <MultiAutocompleteController
        name="members"
        label="select Users"
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        control={control}
        placeholder="Select Users"
        loadOptions={onLoad}
        renderOption={renderOptions}
        renderValue={renderValue}
      />


  );
}
