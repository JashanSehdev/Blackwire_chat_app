import { Box, Card, CardContent, CardHeader, IconButton, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './chat-area.module.css'

export default function ChatArea() {
  return (
    <Card className={styles.main}>
      <CardHeader
        avatar={<PersonIcon />}
        title="person 1"
        subheader="online"
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardContent className={styles.content} >
        <Box className={styles.chat}>
            <Box className={styles.chatBox} sx={{flex : 1}}>

            </Box>

            <Box sx={{pt: 1}}>
                <TextField
                    variant="outlined"
                    placeholder="enter your message here"
                    fullWidth
                />
            </Box>

        </Box>
      </CardContent>
    </Card>
  );
}
