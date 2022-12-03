import { createTheme } from "@mui/material";

/**
 * @returns <returns the common theme components for the application>
 */

const customTheme = createTheme({
  typography: {
    fontFamily: ["Raleway"].join("sans-serif"),
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#002AA4", //Choose your primary and secondary colors , so you can use <Typography color="primary or color ="secondary"></Typography>
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          //   Some CSS
          background: "#0EB634",
          borderRadius: "4px",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#0EB634",
            color: "#FFFFFF",
            boxShadow: 20,
          },
        },
      },
    },
  },
});

export default customTheme;
