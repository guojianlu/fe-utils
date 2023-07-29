import isNotEmpty from '@/type-check/is-not-empty';
import getQueryString from './get-query-string';
import parseQueryString, { ParseQueryOptions } from './parse-query-string';

export interface ParsedUrl extends Omit<Location, 'ancestorOrigins'|'assign'|'reload'|'replace'|'href'>{
  /**
   * 路径查询参数
   */
  params: Record<string, any>;
  /**
   * 哈希路径部分查询参数
   */
  hashParams: Record<string, any>;
  /**
   * 哈希路径
   */
  hashPathname: string;
  /**
   * 哈希部分查询参数字符串
   */
  readonly hashSearch: string;
  /**
   * 查询参数字符串
   */
  readonly search: string;
}
/**
 * 将网页路径转为对象
 * @param url 网页路径
 * @returns ParsedUrl
 * @example
 * ```
 * parseUrl('https://localhost:3000/a/b?q=1#/c/d?h=2'); // {protocol:'https',port:'3000',pathname:'/a/b',search:'?q=1',hash:'#/c/d?h=2',query:{q:1},hashQuery:{h:2}}
 * ```
 */
export default function parseUrl(
  url = window.location.href,
  options?: ParseQueryOptions,
): ParsedUrl {
  let res: ParsedUrl = {} as any;
  if (isNotEmpty(url, 'string')) {
    const reg = /(https?)?(?::\/\/)?([a-zA-Z0-9\-.]+)?(?::(\d{4}))?(\/[^?#]*)?(\?[^#]*)?((#\/[^?]*)(\?.*)?)?/g;
    const matches = reg.exec(url);
    if (matches) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [href = '', protocol = '', hostname = '', port = '', pathname = '', search = '', hash = '', hashPathName = '', hashSearch = ''] = matches;
      const host = port ? `${hostname}:${port}` : hostname;
      res = {
        protocol,
        host,
        hostname,
        port,
        origin: getOrigin(protocol, host),
        pathname,
        search,
        params: parseQueryString(search, options),
        hash,
        hashPathname: hashPathName,
        hashSearch,
        hashParams: parseQueryString(hash, options),
        toString() {
          const queryString = isNotEmpty(this.params) ? `?${getQueryString(this.params)}` : '';
          const hashQueryString = isNotEmpty(this.hashParams) ? `?${getQueryString(this.hashParams)}` : '';
          return `${getOrigin(this.protocol, this.host)}${this.pathname}${queryString}${this.hashPathname}${hashQueryString}`;
        },
      };
    }
  }
  return res;
}


function getOrigin(p, h) { return h ? `${p ? `${p}://` : ''}${h}` : ''; }
