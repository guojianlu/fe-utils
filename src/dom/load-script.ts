
export interface LoadScriptOptions{
  /**
   * 是够应该加载
   */
  shouldLoad?: () => boolean;
  /**
   * 校验是否加载成功
   */
  successValidator?: () => boolean;
  /**
   * 超时报错
   * @default 3000
   */
  timeout?: number;
}


/**
 * 加载脚本
 * @param src 待加载的脚本链接
 * @param param LoadScriptOptions
 * @returns Promise
 */
export default function loadScript(
  src: string,
  options?: LoadScriptOptions,
): Promise<HTMLScriptElement|undefined> {
  const { shouldLoad, successValidator, timeout = 3000 } = { ...options };
  return new Promise((resolve, reject) => {
    if (shouldLoad?.() === false) resolve(undefined);
    else {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.crossOrigin = 'anonymous';
      const timer = setTimeout(() => {
        reject(new Error('资源加载超时'));
      }, timeout);
      script.onerror = function () {
        clearTimeout(timer);
        const err = new Error(`加载${src}失败`);
        reject(err);
      };
      script.onload = function () {
        clearTimeout(timer);
        if (successValidator?.() === false) reject();
        else resolve(script);
      };
      const el = document.body;
      el.appendChild(script);
    }
  });
}
