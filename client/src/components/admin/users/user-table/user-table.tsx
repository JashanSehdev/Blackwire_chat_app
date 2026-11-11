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
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Pagination,
  IconButton,
} from "@mui/material";
import styles from "./user-table.module.css";
import UserToolbar from "../user-toolbar/user-toolbar";
import useUsers from "@/hooks/admin/useUsers";
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import BlockAlert from "../alerts/block-alert/block-alert";
import AlertBox from "../../alert/alertBox";
import { BlockUser, EditUserType } from "./user-table";
import EditUser from "../edit-user/edit-user";
import { AdminUser } from "@/type/user.type";




export default function UserTable() {
  const {users, totalPages, page, setPage, handleFiltersChange, changeAccess, editUserbyAdmin} = useUsers()
  const [blockedUser, setBlockedUser] = useState<BlockUser | null>();
  const [editUser, setEditUser] = useState< AdminUser | null> (null)
  const handleOpen = (id : number, username: string, status : 'active' | 'blocked') => {
    setBlockedUser({username, status, id})
  }

  const handleClose = () => {
    setBlockedUser(null)
  }
  const handleEditClose = () => {
    setEditUser(null)
  }

  const HandleAccess = () => {
    if(!blockedUser) return
    if (blockedUser.status == 'active') {
      changeAccess(blockedUser.id, true)
    } else {
      changeAccess(blockedUser.id, false)
    }
  }
 
  return (
    <Box className={styles.container}>
      <UserToolbar handleFiltersChange={handleFiltersChange} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="center">User</TableCell>

              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  {user.id}
                </TableCell>
                <TableCell>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.username}
                      secondary={user.email}
                    />
                  </ListItem>
                </TableCell>

                <TableCell>
                  <Chip label={user.role} size="small" variant="outlined" />
                </TableCell>

                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    color={user.status === "active" ? "success" : "error"}
                  />
                </TableCell>

                <TableCell>{user.createdAt.slice(0,10)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => setEditUser(user)}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton onClick={() => setBlockedUser({username: user.username, status: user.status, id: user.id})}>
                    <BlockIcon/>
                  </IconButton>
                </TableCell>
                
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
            <Pagination page={page ?? 1} onChange={(_, page)=> (setPage(page))} color="primary" count={totalPages}/> 

            <AlertBox open={!!blockedUser} handleClose={handleClose}>

                <BlockAlert onSuccess={HandleAccess} action={blockedUser?.status === 'blocked' ? 'unblock' : 'block'} username={blockedUser?.username ?? 'undefined'} handleClose={handleClose}/>
            </AlertBox>
            <EditUser editUserbyAdmin={editUserbyAdmin} user={editUser} open={!!editUser} handleClose={handleEditClose}/>
      </TableContainer>
      

      
    </Box>
  );
}
