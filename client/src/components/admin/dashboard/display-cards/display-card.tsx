import { Box, Stack } from "@mui/material";
import styles from "./display-card.module.css";
import DashboardCard from "./card/card";
import Person2Icon from "@mui/icons-material/Person2";

export default function DisplayCard() {
  return (
    <Stack direction='row'>

        <DashboardCard Icon={Person2Icon} title="Users" description="Active Users" count={100} />

    </Stack>
  );
}
