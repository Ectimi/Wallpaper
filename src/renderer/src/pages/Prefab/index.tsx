import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import ImageAbstract from '@/assets/prefabs/Abstract.jpg';
import ImageArchitecture from '@/assets/prefabs/Architecture.jpg';
import ImageBeach from '@/assets/prefabs/Beach.jpg';
import ImageCar from '@/assets/prefabs/Car.jpg';
import ImageCartoon from '@/assets/prefabs/Cartoon.jpg';
import ImageCat from '@/assets/prefabs/Cat.jpg';
import ImageDog from '@/assets/prefabs/Dog.jpg';
import ImageLandscape from '@/assets/prefabs/Landscapes.jpg';
import ImageNature from '@/assets/prefabs/Nature.jpg';
import ImageSpace from '@/assets/prefabs/Space.jpg';
import ImageSunset from '@/assets/prefabs/Sunset.jpg';

const gallery: Record<string, any> = {
  Abstract: ImageAbstract,
  Architecture: ImageArchitecture,
  Beach: ImageBeach,
  Car: ImageCar,
  Cartoon: ImageCartoon,
  Cat: ImageCat,
  Dog: ImageDog,
  Landscape: ImageLandscape,
  Nature: ImageNature,
  Space: ImageSpace,
  Sunset: ImageSunset,
};

export const Prefab: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up('xs'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const cols = useMemo(() => {
    if (isXl) return 5;
    if (isLg) return 4;
    if (isMd) return 3;
    if (isSm) return 2;
    if (isXs) return 1;
  }, [isXs, isSm, isMd, isLg, isXl]);

  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <ImageList
        cols={cols}
        style={{
          height: '100%',
          margin: 0,
          gap: 0,
          background: 'linear-gradient(to right, #3874cb, #3874cb)',
        }}
      >
        {Object.keys(gallery).map((imageName) => (
          <ImageListItem
            key={imageName}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/list/${imageName}`)}
          >
            <img src={gallery[imageName]} alt={imageName} />
            <ImageListItemBar title={imageName} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
