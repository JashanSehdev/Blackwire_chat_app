"use client";
import { Box,  Container,  Stack, Typography } from "@mui/material";
import styles from "./register.module.css";
import RegisterCard from "@/components/auth/signup/register-card";
import PeopleIcon from '@mui/icons-material/People'; 


export default function Register() {

  const name : string = 'Splitwise'
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
          <RegisterCard />
        </Box>
      </Box>
    </Container>
  );
}
