import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLatest } from 'ahooks';
import {styled} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { EventType } from 'main/event/event.type';

const ScHeader = styled(Box)(({theme})=>({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '35px',
  padding: '0 10px',
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  WebkitAppRegion: 'drag',
  '.MuiIconButton-root': {
    WebkitAppRegion: 'no-drag',
  },
}));

const { ipcRenderer } = window.electronApi;

export const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useLatest(location.pathname);

  return (
    <ScHeader>
      <Stack direction="row" alignItems="cneter">
        {currentPath.current !== '/' ? (
          <IconButton
            aria-label="back"
            color="inherit"
            sx={{ fontSize: '20px' }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        ) : null}
        <Typography
          variant="subtitle1"
          color="inherit"
          component="div"
          sx={{ lineHeight: '35px' }}
        >
          Wallpaper
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="minimize"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventType.WIN_MINIMIZE);
          }}
        >
          <HorizontalRuleIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="maxsize"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventType.WIN_MAXIMIZE);
          }}
        >
          <CropSquareIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="quit"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventType.APP_QUIT);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </ScHeader>
  );
};
