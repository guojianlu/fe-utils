import isNotEmpty from '@/type-check/is-not-empty';
import isEmpty from '@/type-check/is-empty';
/**
 * 通过参数对象获取路径参数字符串
 * @param searchParams 页面路径参数对象
 * @returns string
 * @example
 * ```
 * getQueryString({a: '1', b: '2', c: 'https://b.aa.com/a-b/c?p=1&c=1#/ss/a=1'}); // a=1&b=2&c=https%3A%2F%2Fb.aa.com%2Fa-b%2Fc%3Fp%3D1%26c%3D1%23%2Fss%2Fa%3D1
 * ```
 */
export default function getQueryString(searchParams: Record<string, any> = {}) {
  if (isNotEmpty(searchParams, 'object')) {
    return Object.keys(searchParams).reduce((pre, cur) => {
      pre.push(`${cur}=${isEmpty(searchParams[cur]) ? '' : encodeURIComponent(searchParams[cur])}`);
      return pre;
    }, [] as string[]).join('&');
  }
  return '';
}
