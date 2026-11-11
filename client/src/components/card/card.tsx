
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
};

export function DashboardCard({
  title,
  value,
  icon,
  description,
}: DashboardCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>

          <Avatar>
            {icon}
          </Avatar>
        </Box>

        <Typography variant="h4" sx={{fontWeight:700, mt:2 }}>
          {value}
        </Typography>

        {description && (
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
