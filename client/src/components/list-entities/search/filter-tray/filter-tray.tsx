"use client";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Filters() {
  const [open, setOpen] = useState<boolean>();
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>

      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        <Box
          sx={{
            width: { xs: "100vw", sm: 360 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Set Filters</Typography>

            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              p: 2,
              flex: 1,
            }}
          >
            <TextField
              select
              size="small"
              defaultValue={"createdAt"}
              fullWidth
              label="Sort by"
            >
              <MenuItem value={"createdAt"}>Created at</MenuItem>

              <MenuItem value={"username"}>name</MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              defaultValue={"DESC"}
              fullWidth
              label="Order By"
            >
              <MenuItem value={"DESC"}>latest first</MenuItem>

              <MenuItem value={"ASC"}>Older first</MenuItem>
            </TextField>

            <TextField
              select
              label="Role"
              defaultValue="all"
              size="small"
              fullWidth
            >
              <MenuItem value="all">All roles</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </TextField>
{/* 
            <TextField
              select
              label="Status"
              defaultValue="all"
              size="small"
              fullWidth
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
            </TextField> */}

          </Stack>

          <Divider />
          <Stack direction="row" sx={{ p: 2 }} spacing={1}>
            <Button variant="outlined" fullWidth>
              Reset
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpen(false)}
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
