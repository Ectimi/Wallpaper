import { FC, PropsWithChildren, ReactNode } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import PublicIcon from '@mui/icons-material/Public';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppRoutes from '@/routes';
import { Header } from '@/components/Header';
import { useSafeState } from 'ahooks';

const IconMap: Record<string, ReactNode> = {
  Prefabs: <BorderAllIcon />,
  Popular: <PublicIcon />,
  Random: <ShuffleIcon />,
  Search: <SearchIcon />,
  Favorites: <FavoriteBorderIcon />,
  Divider: null,
  About: <InfoIcon />,
  Settings: <SettingsIcon />,
};
const RouteNames = Object.keys(IconMap);

const drawerWidth = 240;
const stableStyle = (theme: Theme): CSSObject => ({
  position: 'unset',
  backgroundColor: '#1976d2',
  color: '#fff',
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});
const openedMixin = (theme: Theme): CSSObject => ({
  ...stableStyle(theme),
  width: drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  ...stableStyle(theme),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  position: 'relative',
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  top: '35px',
  zIndex: theme.zIndex.drawer + 1,
}));

export const AppLayout = (props: { children: any }) => {
  const [routeName, setRouteName] = useSafeState(RouteNames[0]);
  const [open, setOpen] = useSafeState(true);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          height: '100%',
        }}
      >
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              {routeName}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <List>
            {RouteNames.map((name) =>
              IconMap[name] !== null ? (
                <ListItem key={name} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => setRouteName(name)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: '#fff',
                      }}
                    >
                      {IconMap[name]}
                    </ListItemIcon>
                    <ListItemText
                      primary={name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ) : null
            )}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
          {/* <AppRoutes /> */}
          {props.children}
        </Box>
      </Box>
    </>
  );
};
