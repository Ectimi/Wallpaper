import {ReactNode} from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import {styled, Theme, CSSObject} from '@mui/material/styles';
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
import {Header} from '@/components/Header';
import {useSafeState} from 'ahooks';
import {useUpdateEffect} from "ahooks/es";

const routeItems: Array<{ name: string; icon: ReactNode; path: string }> = [
    {
        name: '预设',
        icon: <BorderAllIcon/>,
        path: '/'
    }, {
        name: '受欢迎',
        icon: <PublicIcon/>,
        path: '/favorite'
    }, {
        name: '随机',
        icon: <ShuffleIcon/>,
        path: '/random'
    }, {
        name: '搜索',
        icon: <SearchIcon/>,
        path: '/search'
    }, {
        name: '收藏',
        icon: <FavoriteBorderIcon/>,
        path: '/collect'
    }, {
        name: '关于',
        icon: <InfoIcon/>,
        path: '/about'
    }, {
        name: '设置',
        icon: <SettingsIcon/>,
        path: '/setting'
    },
]

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
})(({theme, open}) => ({
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
})(({theme}) => ({
    top: '35px',
    zIndex: theme.zIndex.drawer + 1,
}));

export const AppLayout = (props: { children: any }) => {
    const [routeName, setRouteName] = useSafeState(routeItems[0].name);
    const [open, setOpen] = useSafeState(true);
    const {pathname} = useLocation()
    const params = useParams<{ type?: string }>()
    const navigate = useNavigate()

    useUpdateEffect(() => {
        if (pathname.startsWith('/list')) {
            setRouteName(params.type!)
        }else if(pathname === '/detail'){
            setRouteName('详情')
        } else {
            const item = routeItems.find(item => item.path === pathname)
            setRouteName(item!.name)
        }
    }, [pathname])

    return (
        <>
            <Header/>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => setOpen(!open)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        {routeName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    height: '100%',
                }}
            >
                <Drawer variant="permanent" open={open}>
                    <List>
                        {routeItems.map(({name, icon, path}) =>
                            <ListItem key={name} disablePadding sx={{display: 'block'}}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={() => navigate(path)}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#fff',
                                        }}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={name}
                                        sx={{opacity: open ? 1 : 0}}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Drawer>

                <Box component="main" sx={{flexGrow: 1, overflow: 'auto'}}>
                    {/* <AppRoutes /> */}
                    {props.children}
                </Box>
            </Box>
        </>
    );
};
