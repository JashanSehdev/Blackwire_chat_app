'use client'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./chat-nav.module.css";
import { mockChats } from "@/data/chat.data";
import { getTimeAgo } from "@/utils/get-time-age";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CreateChatDrawer from "../create-chat/create-chat";

export default function ChatNavs() {

    const [openCreateBox, setOpenCreateBox] = useState<boolean>(false);
    const handleClose = () => {
        setOpenCreateBox(false);
    }

    const truncate = (text : string | null, max : number) =>{
        if (!text)
            return 
        return text.length > max ? text.slice(0, max) + '…' : text;
    }
  
  return (
    <Card className={styles.main}>
        <CreateChatDrawer handleClose={handleClose} open={openCreateBox} />
      <CardHeader title="messages" 
        action = {
            <IconButton onClick={() => setOpenCreateBox(true)}>
                <AddIcon/>
            </IconButton>
        }
      />
      <CardContent className={styles.content}>
        {mockChats.map((chat) => (
          <ListItemButton key={chat.id}>
            <ListItem disablePadding disableGutters>
              <ListItemAvatar>
                <Avatar src={chat.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={truncate(chat.title, 15)}
                secondary={truncate(chat.lastMessage, 20)}
              />
              <ListItemText>
                <Stack
                  sx={{ alignItems: "center", justifyContent: "center" }}
                  spacing={0.5}
                >
                  <Typography variant="body2">{getTimeAgo(chat.lastMessageTime)}</Typography>
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
