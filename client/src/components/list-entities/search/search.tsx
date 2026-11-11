import {
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Filters from "./filter-tray/filter-tray";

export default function Search() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: "streach", sm: "center" },
      }}
    >
      <TextField
        size="small"
        placeholder="Search..."
        sx={{ flex: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "small" }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack direction="row" spacing={1}>
        <Filters/>
      </Stack>
    </Stack>
  );
}
