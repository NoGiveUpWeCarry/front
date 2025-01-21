import { chatHandlers } from '@/mocks/handlers/chat.handler';
import { feedHandler } from '@/mocks/handlers/feedHandler.mock';
import { hubHandlers } from '@/mocks/handlers/hub.handler';

import { delay } from 'msw';

export const delayForDevelopment = async (ms = 1000) => {
  if (process.env.NODE_ENV === 'development') {
    await delay(ms);
  }
};

export const handlers = [...chatHandlers, ...feedHandler, ...hubHandlers];
