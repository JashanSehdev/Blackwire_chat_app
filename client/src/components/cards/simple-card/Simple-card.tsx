import {
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { ReactNode } from "react";

interface Prop {
  title: string;
  description: string;
  children : ReactNode
}
export default function SimpleCard({ title, description, children }: Prop) {
  return (
    <Card sx={{ maxWidth: "200px" }}>
      <CardHeader title={title} subheader={description} />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
