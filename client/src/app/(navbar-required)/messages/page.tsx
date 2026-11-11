import { Box, Container } from "@mui/material";
import styles from './messages.module.css'
import ChatNavs from "./chat-navigations/chat-nav";
import ChatArea from "./chat-area/chat-area";

export default function MessagesPage () {

    return (
        <Container>
            <Box className={styles.main}>
                <Box className={styles.leftSection}>   
                    <ChatNavs/>
                </Box>
                <Box className={styles.rigthSection}>
                    <ChatArea/>
                </Box>
            </Box>
        </Container>
    )
}