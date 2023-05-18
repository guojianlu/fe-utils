
export interface LoadScriptOptions{
  /**
   * 超时报错
   * @default 3000
   */
  timeout?: number;
}


/**
 * 加载脚本
 * @param href 待加载的脚本链接
 * @param param LoadScriptOptions
 * @returns Promise
 */
export default function loadCSS(
  href: string,
  options?: LoadScriptOptions,
): Promise<HTMLLinkElement|undefined> {
  const { timeout = 3000 } = { ...options };
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.href = href;
    link.crossOrigin = 'anonymous';
    link.rel = 'stylesheet';
    const timer = setTimeout(() => {
      reject(new Error('资源加载超时'));
    }, timeout);
    link.onerror = function () {
      clearTimeout(timer);
      const err = new Error(`加载${href}失败`);
      reject(err);
    };
    link.onload = function () {
      clearTimeout(timer);
      resolve(link);
    };
    const el = document.head;
    el.appendChild(link);
  });
}
