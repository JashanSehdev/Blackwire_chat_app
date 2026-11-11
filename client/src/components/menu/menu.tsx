import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { SvgIconComponent } from "@mui/icons-material";

type Option = {
  Icon?: SvgIconComponent;
  label: string;
  action: () => void;
};

type FadedMenuProp = {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  options : Option[]
};
export default function FadedMenu({ anchorEl, setAnchorEl, options }: FadedMenuProp) {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Menu
        id="fade-menu"
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {
            options.map((option) => (
                <MenuItem key={option.label} onClick={option.action}>{option.label}</MenuItem>
            ))
        }
      
      </Menu>
    </div>
  );
}
