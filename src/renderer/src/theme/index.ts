import {createTheme} from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Theme {
        linearGradient: {
            main: string;
            detail:string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        linearGradient?: {
            main?: string;
            detail?: string;
        };
    }
}

const customTheme = createTheme({
    linearGradient:{
        main:'linear-gradient(to right, #3874cb, #3874cb);',
        detail:'linear-gradient(to right, #457fca, #5691c8);'
    }
})

export default customTheme