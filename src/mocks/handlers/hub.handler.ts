import { http } from 'msw';
import { API_PATH } from '@/apis/api-path';
import { hubMocks } from '@/mocks/mock-data/hub';
import { HubPost, HubsResponse } from '@/apis/hub/hub.api';

export const hubHandlers = [
  http.get(API_PATH.connectionhub, (req) => {
    const mappedData: HubPost[] = hubMocks.map((hub, idx) => {
      // ...
      return {
        /* HubPost에 맞게 매핑 */
      };
    });

    const responseData: HubsResponse = {
      hubposts: mappedData,
    };

    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      // body는 반드시 string이어야 에러가 나지 않음
      body: JSON.stringify(responseData),
    };
  }),
];