'use client'
import {
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import styles from "./navbar-items.module.css";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useAppSelector } from "@/features/store";


const adminItems = [
    {
    label: "Dashboard",
    href: "/admin/",
  },
]
const navItems = [
  {
    icon : < HomeIcon/>,
    label: "HOME",
    href: "/",
  },
  {
    icon : <AssignmentIcon/>,
    label : "TASKS",
    href : '/tasks'
  },

];
export default function NavbarItems() {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <Stack className={styles.container} direction={'row'}>

        { user?.role === 'admin' && adminItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles.link}>
            <ListItem
            >
              <ListItemText secondary={item.label} />
            </ListItem>
          </Link>
        ))}

        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles.link}>
            <ListItem
            >
              <ListItemText secondary={item.label} />
            </ListItem>
          </Link>
        ))}
    </Stack>
  );
}
