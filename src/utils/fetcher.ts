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
