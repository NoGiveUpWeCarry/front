import { axiosInstance } from '@/apis/@core';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface FetcherOptions {
  url: string;
  method: HttpMethod;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface FetcherResponse<T> {
  message: {
    code: number;
    text: string;
  };
  data: T;
}

const fetcher = async <T>(
  options: FetcherOptions
): Promise<FetcherResponse<T>> => {
  const { url, method, data, params, headers } = options;

  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      params,
      headers,
    });
    return response.data as FetcherResponse<T>;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};

export default fetcher;
