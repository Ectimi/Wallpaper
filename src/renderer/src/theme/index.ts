import {createTheme} from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Theme {
        linearGradient: {
            main: string;
            detail:string;
            grounding:string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        linearGradient?: {
            main?: string;
            detail?: string;
            grounding?:string;
        };
    }
}

const customTheme = createTheme({
    linearGradient:{
        main:'linear-gradient(to right, #3874cb, #3874cb);',
        detail:'linear-gradient(to right, #457fca, #1976d2);',
        grounding:'linear-gradient(to right, #232526, #414345)'
    }
})

export default customTheme