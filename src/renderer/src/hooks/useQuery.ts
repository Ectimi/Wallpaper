import { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useSafeState } from 'ahooks';
import { fetchPhoto } from '@/api';
import { PhotosWithTotalResults, ErrorResponse } from 'pexels';
import { IFetchParams } from '@/api/type';

export function useSearch(params: IFetchParams) {
  const query = params.query;
  const per_page = params.per_page || 30;
  const page = useRef(params.page || 0);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useSafeState(false);

  const [data, setData] = useSafeState<PhotosWithTotalResults['photos']>([]);
  const [error, setError] = useSafeState('');
  const [hasMore, setHasMore] = useSafeState(true);

  const loadData = async function () {
    if (loading) return;
    console.log('load data');
    setLoading(true);
    page.current += 1;
    const fetchData = await fetchPhoto({ query, per_page, page: page.current });
    if ((fetchData as ErrorResponse).error) {
      const errorText =
        (fetchData as ErrorResponse).error || 'request went wrong';
      setError(errorText);
      enqueueSnackbar(errorText, {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        onClose() {
          setError('');
        },
      });
    } else {
      const { photos } = fetchData as PhotosWithTotalResults;
      if (Array.isArray(photos) && photos.length > 0) {
        setData([...data, ...photos]);
      } else {
        setHasMore(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return { loading, error, setError, data, hasMore, loadData };
}
