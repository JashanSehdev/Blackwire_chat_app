import { Box, Container, Typography } from "@mui/material";
import styles from './users.module.css'
import UserTable from "@/components/admin/users/user-table/user-table";

export default function Users() {
  return (
    <Container sx={{ pt: "2rem" }}>
      <Box sx={{ mb: "3rem" }}>
        <Typography variant="h3" className={styles.title}>
          Users
        </Typography>
        <Typography color={'textSecondary'} className={styles.subheader}>
          Manage and monitor registered users.
        </Typography>

      </Box>

      <UserTable/>

    </Container>
  );
}
