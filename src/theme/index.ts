import { createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    background: {
      default: "#EFF1F9"
    },
    primary: {
      contrastText: "#fff",
      dark: "#4a56b7",
      main: "#657ef8",
      light: "#e1e7ff"
    },
    secondary: {
      dark: "#4c4c4c",
      main: "#9e9e9e",
      light: "#b6b6b6"
    }
  },
  components: {

    MuiPaper: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  }
})

export default theme