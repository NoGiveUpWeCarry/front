// import { fetchHubs, HubsResponse } from '@/apis/hub.api';

// import { useQuery, UseQueryResult } from '@tanstack/react-query';

// export const useInfiniteFetchHubs = (): UseQueryResult<HubsResponse, Error> => {
//   return useQuery<HubsResponse>({
//     queryKey: ['projects'],
//     queryFn: () => fetchHubs(),
//     retry: 10,
//     staleTime: 60 * 1000,
//     gcTime: 5 * 60 * 1000,
//   });
// };

// // 피드 상세 불러오기
// export const useFetchHub = (): UseQueryResult<HubResponse, Error> => {
//   return useQuery<HubResponse>({
//     queryKey: ['hub'],
//     queryFn: () => fetchHub(),
//     retry: 10,
//     staleTime: 60 * 1000,
//     gcTime: 5 * 60 * 1000,
//   });
// };
