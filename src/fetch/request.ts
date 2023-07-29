import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { Message } from '@alifd/next';

// 设置axios默认baseUrl
axios.defaults.baseURL = window.location.origin;

/**
 * 请求失败返回类型
 */
export interface ErrorResponse {
  code: number;
  success: boolean;
  message: string;
}

/**
 * 请求成功返回类型
 */
export interface Response<T> extends ErrorResponse {
  data?: T;
}

export interface RequestConfig<T = any> extends AxiosRequestConfig<T> {
  withFullResponse?: boolean;
  silence?: boolean;
}

export interface RequestProps {
  get: <ResponseData = any, RequestData = any>(
    url: string,
    config?: RequestConfig<RequestData>,
  ) => Promise<Response<ResponseData> | AxiosResponse>;
  post: <ResponseData = any, RequestData = any>(
    url: string,
    data?: RequestData,
    config?: RequestConfig<RequestData>,
  ) => Promise<Response<ResponseData> | AxiosResponse>;
}

export interface Request extends RequestProps {
  <T = any, D = any>(options: RequestConfig<D>): Promise<Response<T> | AxiosResponse>;
  <T = any, D = any>(url: string, config?: RequestConfig<D>): Promise<Response<T> | AxiosResponse>;
}

function request<
  // 返回数据中的data类型
  ResponseData = any,
  // 请求入参data类型
  RequestData = any,
  // 返回数据类型
  R extends Response<ResponseData> = Response<ResponseData>,
>(options: RequestConfig<RequestData>): Promise<R | AxiosResponse> {
  const {
    method = 'GET',
    data,
    url,
    silence = false,
    withFullResponse = false,
    ...others
  } = options || {};

  const payload: AxiosRequestConfig = { method, url, ...others };
  if (method.toUpperCase() === 'GET') {
    payload.params = data;
  } else {
    payload.data = data;
  }

  return new Promise((resolve, reject) => {
    const errorHandler = ({ code, message, success = false }) => {
      if (message && !silence) {
        Message.error(message);
      }
      const errorPayload: ErrorResponse = {
        code,
        message,
        success,
      };
      reject(errorPayload);
    };

    axios(payload)
      .then((response) => {
        const { data: resData } = response;
        const { success = false } = resData;
        if (withFullResponse) {
          resolve(response);
        } else if (success) {
          resolve(resData);
        } else {
          errorHandler(resData);
        }
      })
      .catch(errorHandler);
  });
}

// Provide aliases for supported request methods
// methods: get、delete、head、options
['get'].forEach((method) => {
  request[method] = function <ResponseData = any, RequestData = any>(
    url: string,
    config: RequestConfig<RequestData>,
  ) {
    return request<ResponseData, RequestData>(
      Object.assign(config || {}, {
        method,
        url,
      }),
    );
  };
});

// methods: post、put、patch
['post'].forEach((method) => {
  request[method] = function <ResponseData = any, RequestData = any>(
    url: string,
    data: RequestData,
    config: RequestConfig<RequestData>,
  ) {
    return request<ResponseData, RequestData>(
      Object.assign(config || {}, {
        method,
        url,
        data,
      }),
    );
  };
});

export default request as Request;
