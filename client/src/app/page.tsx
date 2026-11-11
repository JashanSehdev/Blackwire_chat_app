import { Box, Container, Fab, Stack, Typography } from "@mui/material";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import MessageIcon from '@mui/icons-material/Message';
import { redirect } from "next/navigation";
import Link from "next/link";
export default function App() {
  

  return (
    <Container className={styles.main}>
      <Link href={'/messages'}>
       <Fab className={styles.messageIcon} >
        <MessageIcon/>
      </Fab>
      </Link>
     
      <Navbar />
      <Box>
        <Stack spacing={-2}>
          <Typography variant={"h1"}>Welcome</Typography>
          <Typography sx={{paddingLeft: 1}} variant="h1">Users..</Typography>
        </Stack>
      </Box>
    </Container>
  );
}
