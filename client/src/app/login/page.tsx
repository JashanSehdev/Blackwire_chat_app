"use client";

import { Box, Container, Stack, SvgIconProps, Typography } from "@mui/material";
import styles from "./login.module.css";

import LoginCard from "@/components/auth/login/login-card";
import PeopleIcon from '@mui/icons-material/People'; 


export default function LoginPage() {
  const Icon : SvgIconProps = <></>
  const name : string = 'Splitwise'
  const image : string = ''
  const placeholderImage = 'data:image/png;base64,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'
  return (
    <Container>
      <Box className={styles.container}>

        <Stack className={styles.imageContainer} sx={{display: {
          xs:'none',
          md:'flex',
          
        }}}>
            <Stack direction='row' spacing={1}>
              <PeopleIcon sx={{fontSize:'30px'}} />
              <Typography variant="h5" sx={{fontWeight:'700'}}>
                {name}
              </Typography>
            </Stack>

            <Box
              component='img' 
              src={"/SecureLogin.png"}
              height={'auto'}
              alt={"Login Page image"}
              width={'auto'}
              className={styles.image}
            />
            
            
        </Stack>
        <Box className={styles.loginCard}>
          <LoginCard />
        </Box>
      </Box>
    </Container>
  );
}
