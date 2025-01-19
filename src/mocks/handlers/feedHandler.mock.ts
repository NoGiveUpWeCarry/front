import { API_PATH } from '@/apis/api-path';
import { delayForDevelopment } from '@/mocks/handlers';
import { generateMockData } from '@/mocks/mock-data/feed.mock';
import { HttpResponse, http } from 'msw';

const feedMockData = generateMockData();

export const feedHandler = [
  http.get(API_PATH.feed, async () => {
    await delayForDevelopment();
    return HttpResponse.json(feedMockData);
  }),
  http.get(API_PATH.feedDetail, async () => {
    await delayForDevelopment();
  }),
];
