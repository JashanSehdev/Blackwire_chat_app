import { Box, Card, Container, Stack, Typography } from '@mui/material'
import styles from './profile.module.css'
import ProfileCard from '../../../components/profile/profile-card/profile-card'
import EditProfileCard from '@/components/profile/edit-profile/edit-profile'


export default function ProfilePage(){
    return(
        <Container>
            <Stack className={styles.section1}>
                <Typography variant='h4' sx={{fontWeight:'700'}}>My Profile</Typography>
                <Typography variant='body1' color={"textSecondary"}>Manage Your Personal Information and Account Settings</Typography>
            </Stack>
            <ProfileCard/>
            <EditProfileCard/>
        </Container>
    )
}