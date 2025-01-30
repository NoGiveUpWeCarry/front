import { axiosInstance } from '@/apis/@core';
import { AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface FetcherOptions {
  url: string;
  method: HttpMethod;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface FetcherMessage {
  code: number;
  message: string;
  text?: string;
}

const fetcher = async <T>(
  options: FetcherOptions
): Promise<AxiosResponse<T & { message: FetcherMessage }, any>> => {
  const { url, method, data, params, headers } = options;
  try {
    const response = await axiosInstance<T & { message: FetcherMessage }>({
      url,
      method,
      data,
      params,
      headers,
    });
    return response;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};

export default fetcher;
