import {
  CardContent,
  CardHeader,
  Card,
  Typography,
  Stack,
} from "@mui/material";

import styles from './card.module.css'
import { SvgIconComponent } from '@mui/icons-material';

interface CardProp {
  title: string;
  description: string;
  count: number;
  Icon: SvgIconComponent
}
export default function DashboardCard({ title, description, count, Icon }: CardProp) {
  return (
    <Card sx={{minWidth:'200px'}}>
      <CardHeader title={title} subheader={description} />
      <CardContent>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
          }}
          spacing={1}
        >
          <Icon />
          <Typography variant="h4" className={styles.count}>{count}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
