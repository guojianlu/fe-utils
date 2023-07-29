/**
 * 获取cookie
 * @param key 要获取的cookie键
 * @returns any
 */
export default function getCookie(key: string): string | undefined {
  const matches = new RegExp(`${key}=([^=;]+);`, 'g').exec(document.cookie);
  if (matches) {
    const result = decodeURIComponent(matches[1]);
    return result ? unescape(result.replace(/\\u/g, '%u')) : '';
  }
}
