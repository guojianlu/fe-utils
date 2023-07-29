import isNotEmpty from '@/type-check/is-not-empty';
import getQueryString from './get-query-string';
import { ParamsPosition } from './get-url-prams';
import parseUrl from './parse-url';

/**
 * 组合查询参数至给定路径
 * @param url 原始页面路径
 * @param params 路径参数
 * @returns string
 * @example
 * ```
 * composeUrlParams('https://test.com#/index?aa=11', { a: '1', b: '2', c: 'https://b.aa.com/a-b/c?p=1&c=1#/ss/a=1' }, 'hash'); // https://test.com#/index?aa=11&a=1&b=2&c=https%3A%2F%2Fb.aa.com%2Fa-b%2Fc%3Fp%3D1%26c%3D1%23%2Fss%2Fa%3D1
 * composeUrlParams('https://test.com#/index?aa=11', { a: '1', b: '2', c: 'https://b.aa.com/a-b/c?p=1&c=1#/ss/a=1' }, 'search'); // https://test.com?a=1&b=2&c=https%3A%2F%2Fb.aa.com%2Fa-b%2Fc%3Fp%3D1%26c%3D1%23%2Fss%2Fa%3D1#/index?aa=11
 * composeUrlParams('https://test.com', { a: '1', b: '2', c: 'https://b.aa.com/a-b/c?p=1&c=1#/ss/a=1' }, 'hash'); // https://test.com?a=1&b=2&c=https%3A%2F%2Fb.aa.com%2Fa-b%2Fc%3Fp%3D1%26c%3D1%23%2Fss%2Fa%3D1
 * composeUrlParams('https://test.com', { a: '1', b: '2', c: 'https://b.aa.com/a-b/c?p=1&c=1#/ss/a=1' }); // https://test.com?a=1&b=2&c=https%3A%2F%2Fb.aa.com%2Fa-b%2Fc%3Fp%3D1%26c%3D1%23%2Fss%2Fa%3D1
 * ```
 */
export default function composeUrlParams(url: string, params?: Record<string, any>, position: ParamsPosition = 'search') {
  const queryString = getQueryString(params);
  if (isNotEmpty(url, 'string')) {
    const parsedUrl = parseUrl(url);
    if (position === 'hash' && parsedUrl.hash) {
      parsedUrl.hashParams = { ...parsedUrl.hashParams, ...params };
    } else {
      parsedUrl.params = { ...parsedUrl.params, ...params };
    }
    return parsedUrl.toString();
  }
  return queryString;
}

