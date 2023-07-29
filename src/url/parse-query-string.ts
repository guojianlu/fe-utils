import isNotEmpty from '@/type-check/is-not-empty';

export interface ParseQueryOptions{
  /**
   * 字符是否做解码处理
   * 即decodeURIComponent处理
   * @default true
   */
  decode?: boolean;
}
/**
 * 将查询参数字符串转为对象
 * @param queryString 查询参数字符串
 * @returns Record<string,any>
 * @example
 * ```
 * parseQueryString('a=1&b=2'); // {a:1,b:2}
 * parseQueryString('a=1&b='); // {a:1,b:''}
 * parseQueryString(`?a=1&b=2&c=${encodeURIComponent('https://b.aa.com/a-b/c?p=1&c=1#/ss/a=1')}`); // {a: '1', b: '2', c: 'https://b.aa.com/a-b/c?p=1&c=1#/ss/a=1'}
 * parseQueryString(`?a=1&b=2&c=${encodeURIComponent('https://b.aa.com/a-b/c?p=1&c=1#/ss/a=1')}`, { decode: false }); // {a: '1', b: '2', c: 'https%3A%2F%2Fb.aa.com%2Fa-b%2Fc%3Fp%3D1%26c%3D1%23%2Fss%2Fa%3D1'}
 * ```
 */
export default function parseQueryString(queryString: string, options?: ParseQueryOptions) {
  const res = {};
  if (isNotEmpty(queryString, 'string')) {
    const { decode = true } = { ...options };
    const reg = /([a-zA-Z0-9_]+)=([^=&]*)/g;
    let matches = reg.exec(queryString);
    while (matches) {
      res[matches[1]] = decode ? decodeURIComponent(matches[2]) : matches[2];
      matches = reg.exec(queryString);
    }
  }
  return res;
}
