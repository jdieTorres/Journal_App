import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: "#008ad3"
        },
        secondary: {
            main: "#8AD300"
        },
        error: {
            main: red.A400
        }
    }
})