import { API_PATH } from '@/apis/api-path';
import { Post } from '@/apis/feed.api';
import { delayForDevelopment } from '@/mocks/handlers';
import {
  generateCommentsMockData,
  generateFeedsMockData,
} from '@/mocks/mock-data/feed.mock';
import { baseURL } from '@/utils/baseUrl';
import { HttpResponse, http } from 'msw';

export const feedHandler = [
  // 피드 상세 조회
  http.get(baseURL(API_PATH.feedDetail), async ({ params }) => {
    await delayForDevelopment(1000);
    const id = params.id;
    if (!id || Array.isArray(id)) {
      return new HttpResponse('Invalid ID', {
        status: 400,
      });
    }
    const data = generateFeedsMockData();
    const post = data.posts.find((post: Post) => post.postId === Number(id));
    console.log('msw post: ', post);
    if (!post) {
      return new HttpResponse('Feed Not Found', {
        status: 404,
      });
    }
    return HttpResponse.json({
      post,
      message: {
        code: 200,
        message: '개별 피드를 정상적으로 조회했습니다.',
      },
    });
  }),
  http.get(baseURL(API_PATH.feedChat), async ({ params }) => {
    await delayForDevelopment(5000);
    const id = params.id;
    if (!id || Array.isArray(id)) {
      return new HttpResponse('Invalid ID', {
        status: 400,
      });
    }
    const comments = generateCommentsMockData();
    if (!comments) {
      return new HttpResponse('Feed Not Found', {
        status: 404,
      });
    }
    return HttpResponse.json({
      comments,
      message: {
        code: 200,
        text: '개별 피드(댓글)를 정상적으로 조회했습니다.',
      },
    });
  }),
];
