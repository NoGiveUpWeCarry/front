import { fetchHubs, HubsResponse } from '@/apis/hub.api';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useFetchHubs = (): UseQueryResult<HubsResponse, Error> => {
  return useQuery<HubsResponse>({
    queryKey: ['feeds'],
    queryFn: () => fetchHubs(),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
