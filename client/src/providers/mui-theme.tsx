// theme.ts
import { createTheme, alpha } from "@mui/material/styles";

// shadcn "zinc" dark tokens
const tokens = {
  background: "#09090b",
  paper: "#1d1d1d",       // --background / --card / --popover
  foreground: "#fafafa",       // --foreground
  primary: "#fafafa",          // --primary
  primaryForeground: "#18181b",// --primary-foreground
  secondary: "#27272a",        // --secondary / --muted / --accent / --border / --input
  mutedForeground: "#a1a1aa",  // --muted-foreground
  destructive: "#ef4444",
  ring: "#d4d4d8",             // --ring
  border: "#3a3a41",
};

const radius = 8; // --radius: 0.5rem

export const shadcnDarkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: tokens.background,
      paper: tokens.paper,
    },
    text: {
      primary: tokens.foreground,
      secondary: tokens.mutedForeground,
      disabled: alpha(tokens.mutedForeground, 0.5),
    },
    primary: {
      main: tokens.primary,
      contrastText: tokens.primaryForeground,
    },
    secondary: {
      main: tokens.secondary,
      contrastText: tokens.foreground,
    },
    error: { main: tokens.destructive },
    divider: tokens.border,
    action: {
      hover: tokens.secondary,
      selected: tokens.secondary,
      focus: tokens.secondary,
    },
  },

  shape: { borderRadius: radius },

  typography: {
    fontFamily:
      '"Geist", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    h1: { fontWeight: 800, letterSpacing: "-0.025em" },
    h2: { fontWeight: 600, letterSpacing: "-0.025em" },
    h3: { fontWeight: 600, letterSpacing: "-0.025em" },
    h4: { fontWeight: 600, letterSpacing: "-0.025em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },

  // shadcn uses almost no shadows
  shadows: Array(25).fill("none") as any,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.background,
          color: tokens.foreground,
          WebkitFontSmoothing: "antialiased",
        },
        "*::-webkit-scrollbar": { width: 8, height: 8 },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: tokens.secondary,
          borderRadius: 4,
        },
      },
    },

    MuiButtonBase: { defaultProps: { disableRipple: true } },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: radius + 3,
          padding: "2px 8px",
          transition: "background-color .15s, color .15s",
          "&:focus-visible": {
            outline: `2px solid ${tokens.ring}`,
            outlineOffset: 2,
          },
        },
        containedPrimary: {
          "&:hover": { backgroundColor: alpha(tokens.primary, 0.9) },
        },
        containedSecondary: {
          "&:hover": { backgroundColor: alpha(tokens.secondary, 0.8) },
        },
        containedError: {
          backgroundColor: "#7f1d1d",
          color: tokens.foreground,
          "&:hover": { backgroundColor: alpha("#7f1d1d", 0.9) },
        },
        outlined: {
          borderColor: tokens.border,
          color: tokens.foreground,
          "&:hover": {
            backgroundColor: tokens.secondary,
            borderColor: tokens.border,
          },
        },
        text: {
          color: tokens.foreground,
          "&:hover": { backgroundColor: tokens.secondary },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: radius - 2,
          "&:hover": { backgroundColor: tokens.secondary },
        },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: "none" ,backgroundColor : tokens.paper }, // removes MUI dark-mode overlay
        outlined: { borderColor: tokens.border },
        
      },
    },

    MuiCard: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          borderRadius: radius + 4, // shadcn cards use rounded-xl
          border: `1px solid ${tokens.border}`,
          backgroundColor: tokens.paper,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius - 2,
          backgroundColor: "transparent",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.border,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.border,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.ring,
            borderWidth: 1,
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 3px ${alpha(tokens.ring, 0.2)}`,
          },
        },
        input: { padding: "9px 12px" },
      },
    },

    MuiInputLabel: {
      styleOverrides: { root: { color: tokens.mutedForeground } },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: radius + 4,
          border: `1px solid ${tokens.border}`,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          border: `1px solid ${tokens.border}`,
          borderRadius: radius,
          marginTop: 4,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: radius - 4,
          margin: "0 4px",
          fontSize: 14,
          "&:hover, &.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: tokens.secondary,
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: tokens.foreground,
          color: tokens.primaryForeground,
          fontSize: 12,
          borderRadius: radius - 2,
        },
        arrow: { color: tokens.foreground },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 9999, fontWeight: 600, fontSize: 12 },
        outlined: { borderColor: tokens.border },
      },
    },

    MuiDivider: {
      styleOverrides: { root: { borderColor: tokens.border } },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.secondary,
          borderRadius: radius,
          minHeight: 36,
          padding: 4,
        },
        indicator: { display: "none" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 28,
          borderRadius: radius - 2,
          padding: "4px 12px",
          color: tokens.mutedForeground,
          "&.Mui-selected": {
            backgroundColor: tokens.background,
            color: tokens.foreground,
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: tokens.border },
        head: { color: tokens.mutedForeground, fontWeight: 500 },
      },
    },
  },
});