import { createClient, PhotosWithTotalResults, ErrorResponse } from 'pexels';
import { IFetchParams, ISearchResponse } from './type';
const token = 'nuG7ybKE4sSVMGGhs1EfU22cHknAKEF2kquAFQ8vcHP6OM2GNSphpDGt';
const client = createClient(token);

const defaultParams: IFetchParams = {
  query: 'Ocean',
  orientation: 'landscape',
  size: 'large',
  color: '',
  locale: '',
  page: 1,
  per_page: 30,
};

export async function fetchPhoto({ query }: IFetchParams) {
  const params = {
    ...defaultParams,
    query,
  };
  const data = await client.photos.search(params);
  return data;
}
