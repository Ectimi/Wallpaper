import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import {  useTheme,ThemeProvider } from '@mui/material/styles';
import customTheme from "@/theme";
import AppRoute from '@/routes';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'html,body,#root': { width: '100%', height: '100%' },
          '#root': { paddingTop: '83px' },
          '::-webkit-scrollbar': {
            width: '10px',
          },
          '::-webkit-scrollbar-thumb': {
            borderRadius: '2px',
            backgroundColor: '#2f3c63',
            cursor: 'pointer',
          },
          '::-webkit-scrollbar-track': {
            boxShadow: 'none',
            background: theme.palette.primary.main,
            borderRadius: '10px',
          },
        }}
      />
      <AppRoute />
    </ThemeProvider>
  );
}

export default App;
