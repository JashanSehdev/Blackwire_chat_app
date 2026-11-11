"use client";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./chat-nav.module.css";
import { getTimeAgo } from "@/utils/get-time-age";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, useEffect, useState } from "react";
import CreateChatDrawer from "../create-chat/create-chat";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { fetchChatsAsync } from "@/features/chat/handle-chat/chat.action";
import { useDebounce } from "@/utils/debounce";

export default function ChatNavs() {
  const dispatch = useAppDispatch();
  const [openCreateBox, setOpenCreateBox] = useState<boolean>(false);
  const { chats, loading } = useAppSelector((state) => state.chat);
  const handleClose = () => {
    setOpenCreateBox(false);
  };
  const debounce = useDebounce((filter : {search : string}) => dispatch(fetchChatsAsync(filter)), 500)
 
  const truncate = (text: string | null, max: number) => {
    if (!text) return;
    return text.length > max ? text.slice(0, max) + "…" : text;
  };

  const handleSearch = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      const {value} = event.target;
      
      debounce({search : value})
  }

  useEffect(() => {
    dispatch(fetchChatsAsync());
  }, []);
  return (
    <Card className={styles.main}>
      <CreateChatDrawer handleClose={handleClose} open={openCreateBox} />
      <CardHeader
        title="messages"
        action={
          <IconButton onClick={() => setOpenCreateBox(true)}>
            <AddIcon />
          </IconButton>
        }
      />
      <CardContent className={styles.content}>
        <Box className={styles.inputBox}>
          <TextField fullWidth className={styles.navbar} placeholder="search.." onChange={handleSearch}/>
        </Box>

        {chats.map((chat) => (
          <ListItemButton key={chat.id}>
            <ListItem disablePadding disableGutters>
              <ListItemAvatar>
                <Avatar src={chat.profileAvatar ?? ""} />
              </ListItemAvatar>
              <ListItemText
                primary={truncate(chat.name, 15)}
                secondary={truncate(chat.lastMessage, 20)}
              />
              <ListItemText>
                <Stack
                  sx={{ alignItems: "center", justifyContent: "center" }}
                  spacing={0.5}
                >
                  <Typography variant="body2">
                    {getTimeAgo(chat.lastMessageTime)}
                  </Typography>
                  <Chip label="2" color="error" size="small" />
                </Stack>
              </ListItemText>
            </ListItem>
          </ListItemButton>
        ))}
      </CardContent>
    </Card>
  );
}
