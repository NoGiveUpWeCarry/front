import { axiosInstance } from '@/apis/@core';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface FetcherOptions {
  url: string; // 요청할 URL
  method: HttpMethod; // HTTP 메서드
  data?: unknown; // 요청에 필요한 데이터
  params?: Record<string, unknown>; // 쿼리 파라미터
  headers?: Record<string, string>; // 추가 헤더
}

export interface FetcherResponse<T> {
  message: {
    code: number;
    text: string;
  };
  data: T;
}

export const fetcher = async <T>({
  url,
  method,
  data,
  params,
  headers,
}: FetcherOptions): Promise<FetcherResponse<T>> => {
  let response;

  switch (method) {
    case 'GET':
      response = await axiosInstance.get(url, { params, headers });
      break;
    case 'POST':
      response = await axiosInstance.post(url, data, { headers });
      break;
    case 'PUT':
      response = await axiosInstance.put(url, data, { headers });
      break;
    case 'DELETE':
      response = await axiosInstance.delete(url, { params, headers });
      break;
    default:
      throw new Error(`HTTP 메서드 오류: ${method}`);
  }

  const { message, ...rest } = response.data;
  return {
    message,
    data: rest as T,
  };
};
