import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';
import AppRoute from '@/routes';

function App() {
  const theme = useTheme();
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'html,body,#root': { width: '100%', height: '100%' },
          '#root': { paddingTop: '80px' },
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
    </>
  );
}

export default App;
