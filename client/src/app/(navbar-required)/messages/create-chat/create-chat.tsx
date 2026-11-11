import {
  Avatar,
  Box,
  Button,
  Drawer,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
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
import { ChatTypeEnum } from "@/enum/chat.enum";
import CreateGroup from "./create-group/create-group";

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
  const [createOption, setCreateOption] = useState<ChatTypeEnum>(
    ChatTypeEnum.PRIVATE,
  );

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
          <Toolbar>
            <Stack spacing={1}>
              <Typography>Select Create option</Typography>
              <Stack direction={"row"} spacing={2}>
                <Button
                  color={
                    createOption === ChatTypeEnum.GROUP ? "info" : "secondary"
                  }
                  variant="contained"
                  onClick={() => setCreateOption(ChatTypeEnum.GROUP)}
                >
                  Group Chat
                </Button>
                <Button
                  color={
                    createOption === ChatTypeEnum.PRIVATE ? "info" : "secondary"
                  }
                  variant="contained"
                  onClick={() => setCreateOption(ChatTypeEnum.PRIVATE)}
                >
                  Private Chat
                </Button>
              </Stack>
            </Stack>
          </Toolbar>
        </Stack>
      </Box>
      {createOption === ChatTypeEnum.PRIVATE ? (
        <Box aria-label="create-private-chat">
          <TextField
            sx={{ p: "0 1rem" }}
            placeholder="search .."
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
          />
          {users.map((user) => (
            <ListItemButton key={user.id} onClick={() => setSelectedUser(user)}>
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>

              <ListItemText primary={user.username} />
            </ListItemButton>
          ))}
        </Box>
      ) : (
        <CreateGroup />
      )}
    </Drawer>
  );
}
