import {
  Avatar,
  Box,
  Drawer,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./create-chat.module.css";
import AlertBox from "@/components/admin/alert/alertBox";
import { useEffect, useState } from "react";
import AlertCreateChat from "./alert-create-chat/alert-create-chat";
import useUsers from "@/hooks/admin/useUsers";
import { useDebounce } from "@/utils/debounce";
import { AdminUser } from "@/type/user.type";
import { useAppDispatch } from "@/features/store";
import { createPrivateChatAsync } from "@/features/chat/handle-chat/chat.action";

interface CreateChatProp {
  open: boolean;
  handleClose: () => void;
}

export default function CreateChatDrawer({
  open,
  handleClose,
}: CreateChatProp) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const { users, handleFiltersChange } = useUsers();
  const dispatch = useAppDispatch();

  const debouncedSearch = useDebounce(() => {
    handleFiltersChange({
      search,
    });
  }, 700);

  useEffect(() => {
    debouncedSearch();
  }, [search, debouncedSearch]);

  const createPrivateChat = async () => {
    if (!selectedUser) return;
    dispatch(createPrivateChatAsync({ memberId: selectedUser.id }));
  };
  return (
    <Drawer open={open} onClose={handleClose}>
      <AlertBox open={!!selectedUser} handleClose={() => setSelectedUser(null)}>
        {selectedUser && (
          <AlertCreateChat
            username={selectedUser.username}
            handleClose={() => setSelectedUser(null)}
            onSuccess={createPrivateChat}
          />
        )}
      </AlertBox>
      <Box className={styles.box}>
        <Stack spacing={2}>
          <ListItem disablePadding>
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="New Chat" />
            <ListItemButton></ListItemButton>
          </ListItem>
          <TextField
            placeholder="search .."
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
          />
        </Stack>
      </Box>

      <Box>
        {users.map((user) => (
          <ListItemButton key={user.id} onClick={() => setSelectedUser(user)}>
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>

            <ListItemText primary={user.username} />
          </ListItemButton>
        ))}
      </Box>
    </Drawer>
  );
}
