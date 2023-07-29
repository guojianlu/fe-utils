import { ParseQueryOptions } from './parse-query-string';
import parseUrl from './parse-url';

export type ParamsPosition = 'search'|'hash';
export interface GetUrlParamsOptions extends ParseQueryOptions{
  /**
   * 参数位置
   * @default 'both''
   */
  position: ParamsPosition|'both';
  /**
   * 参数优先级
   * @default 'search'
   */
  priority: ParamsPosition;

}

/**
 * 获取页面路径参数
 * @param url 网页路径
 * @param options GetUrlParamsOptions
 * @returns Record<string, any>
 * @example
 * ```
 * getUrlParams('https://localhost:3000/a/b?a=1&b=2#/e/f?a=11&c=3'); // {a: '1', c: '3', b: '2'}
 * getUrlParams('https://localhost:3000/a/b?a=1&b=2#/e/f?a=11&c=3', { position: 'search' }); // {a: '1', b: '2'}
 * getUrlParams('https://localhost:3000/a/b?a=1&b=2#/e/f?a=11&c=3', { position: 'hash' }); // {a: '11', c: '3'}
 * getUrlParams('https://localhost:3000/a/b?a=1&b=2#/e/f?a=11&c=3', { position: 'both', priority: 'hash' }); // {a: '11', b: '2', c: '3'}
 * ```
 */
export default function getUrlParams(
  url?: string,
  options?: Partial<GetUrlParamsOptions>,
): Record<string, any> {
  const { position = 'both', priority = 'search', decode } = { ...options };

  let res = {};
  const { hashParams: hashQuery, params: query } = parseUrl(url, { decode });

  switch (position) {
    case 'hash':
      res = hashQuery;
      break;
    case 'search':
      res = query;
      break;
    case 'both':
    default:
      res = priority === 'search' ? { ...hashQuery, ...query } : { ...query, ...hashQuery };
  }

  return res;
}

