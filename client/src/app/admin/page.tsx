import DisplayCard from "@/components/admin/dashboard/display-cards/display-card";
import { Box, Container, Stack, Typography } from "@mui/material";
import styles from "./admin-dashboard.module.css";

export default function AdminDashboard() {
  return (
    <Container sx={{ pt: "2rem" }}>
      <Box sx={{ mb: "3rem" }}>
        <Typography variant="h2" className={styles.title}>
          Hi Admin!
        </Typography>
        <Typography className={styles.subheader}>
          Your Controls are Ready
        </Typography>
      </Box>
      <Stack>
        <DisplayCard />
      </Stack>
    </Container>
  );
}
