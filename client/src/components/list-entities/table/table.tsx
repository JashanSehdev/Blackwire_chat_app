"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import { users } from "@/data/users.data";

export default function EntityTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>user</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <ListItemText 
                  primary={user.username}
                  secondary={user.email}
                />
              </ListItem>

              <TableCell>
                <Chip
                  label={user.role}
                  size="small"
                  variant="outlined"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={user.status}
                  size="small"
                  color={
                    user.status === "active"
                      ? "success"
                      : "error"
                  }
                />
              </TableCell>

              <TableCell>
                {user.createdAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}