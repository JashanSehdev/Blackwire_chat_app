"use client";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Control, UseFormReset } from "react-hook-form";
import SelectController from "@/components/form/select/selectController";
import { FilterInput } from "../user-toolbar.type";

interface FilterTrayProp {
  control: Control<FilterInput>;
  reset : UseFormReset<FilterInput>;
  onApply: ()=> void
}

const sortByOptions = [
  {
    label: "Created at",
    value: "createdAt",
  },
  {
    label: "name",
    value: "name",
  },
];

const OrderbyOptions = [
  {
    label : "Latest first",
    value : 'DESC'
  },
  {
    label : "Older first",
    value : 'ASC'
  }
]

const RoleOptions = [
  {
    label : 'Admin',
    value : 'admin'
  },
  {
    label : 'User',
    value : 'user'
  }
]

const StatusOptions = [
  {
    label : 'Active',
    value : 'active'
  },
  {
    label : 'Block',
    value : 'blocked'
  }
]



export default function FiltersTray({ control, reset, onApply }: FilterTrayProp) {
  const [open, setOpen] = useState<boolean>();

  const handleApply = async () => {
    await onApply();
    setOpen(false);
  };
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
            <SelectController
              name="sortBy"
              control={control}
              options={sortByOptions} 
              label="Sort by"
              size="small"
            />

            <SelectController
              name="orderBy"
              control={control}
              options={OrderbyOptions} 
              label="Order by"
              size="small"
            />


            <SelectController
              name="role"
              control={control}
              options={RoleOptions} 
              label="Role"
              size="small"
            />

            <SelectController
              name="status"
              control={control}
              options={StatusOptions} 
              label="Status"
              size="small"
            />

          </Stack>

          <Divider />
          <Stack direction="row" sx={{ p: 2 }} spacing={1}>
            <Button variant="outlined" fullWidth
            
              onClick={() => {
                reset({
                  orderBy : undefined,
                  sortBy : undefined,
                  role : undefined
                })
              }}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={handleApply}
              type="submit"
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
