import { Paper } from "@mui/material";
import styles from './edit-profile.module.css'
import EditProfileForm from "./edit-profile-form/edit-profile-form";

export default function EditProfileCard() {

    return(
        <Paper className={styles.container}>
            <EditProfileForm/>
        </Paper>
    )
}