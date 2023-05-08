import { createClient } from 'pexels';

const token = 'nuG7ybKE4sSVMGGhs1EfU22cHknAKEF2kquAFQ8vcHP6OM2GNSphpDGt';
const client = createClient(token);

interface FetchParams {
  query: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  size?: 'large' | 'medium' | 'small';
  color?: string;
  locale?: string;
  page?: number;
  per_page?: number;
}

const defaultParams: FetchParams = {
  query: 'Ocean',
  orientation: 'landscape',
  size: 'large',
  color: '',
  locale: '',
  page: 1,
  per_page: 30,
};

export async function fetchPhoto({ query }: FetchParams) {
  const params = {
    ...defaultParams,
    query,
  };
  const data = await client.photos.search(params);
  return data;
}
