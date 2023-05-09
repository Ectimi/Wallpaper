import { FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSearch } from '@/hooks/useQuery';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';
import { styled } from '@mui/material';

import useCols from '@/hooks/useCols';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MuiImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const ImageList = styled(MuiImageList)({
  width: '100%',
  height: '100%',
  margin: 0,
  gap: 2,
});

const SkeletonList = () => {
  const cols = useCols();

  return (
    <ImageList cols={cols} sx={{ height: 'unset' }}>
      {new Array(30).fill('').map((_, index) => (
        <ImageListItem key={index}>
          <Skeleton variant="rectangular" width="100%" height={210} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export const List: FC = () => {
  const params = useParams();
  const cols = useCols();
  const {
    data: imageList,
    loading,
    hasMore,
    loadData,
  } = useSearch({ query: params.type || '' });

  useEffect(() => {
    console.log('data', imageList);
  }, [imageList]);

  const listRef = useRef(null);
  useScrollToBottom(listRef, () => {
    loadData();
  });

  return (
    <Box
      ref={listRef}
      sx={{
        backgroundImage: 'var(--background-image)',
        paddingBottom: '10px',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {imageList.length > 0 ? (
        <ImageList cols={cols} sx={{ height: 'unset' }}>
          {imageList.map((photo) => (
            <ImageListItem key={photo.id}>
              <img src={photo.src.original} alt={photo.alt || ''} />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <>
          <SkeletonList />
        </>
      )}

      {imageList.length > 0 && loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <CircularProgress sx={{ color: '#3b83f7' }} size={20} />
        </Box>
      )}

      {!hasMore && !loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Typography variant="subtitle2" gutterBottom color="#321d1d">
            No more
          </Typography>
        </Box>
      )}
    </Box>
  );
};
