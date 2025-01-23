import { http, HttpResponse } from 'msw';
import { API_PATH } from '@/apis/api-path';
import { generateSingleHub } from '@/mocks/mock-data/hub.mock';
import { delayForDevelopment } from '@/mocks/handlers';

export const hubsHandlers = [
  http.get(
    `${import.meta.env.VITE_BASE_SERVER_URL}${API_PATH.connectionhub}`,
    async () => {
      await delayForDevelopment();
      const hub = generateSingleHub();
      return HttpResponse.json({
        hub,
        message: {
          code: 200,
          message: '커넥션 허브 전체 불러오기 성공.',
        },
      });
    }
  ),
];
