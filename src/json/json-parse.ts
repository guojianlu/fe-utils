
export interface JsonParseOptions<T=any>{
  /**
     * 兜底默认值
     * @default {}
     */
  defaultValue?: T;
  /**
   * 转换遇错误时的回调
   */
  onError?: (error: any) => void;
}

/**
 * Json字符串转对象
 * @param options Json转换时的配置项
 * @param onError 错误回调
 * @returns
 */
export default function jsonParse<T=any>(target: string, options?: JsonParseOptions<T>): T {
  const { defaultValue = {}, onError } = options || {};
  let res = defaultValue as T;
  try {
    res = JSON.parse(target);
  } catch (ex) {
    if (typeof onError === 'function') onError(ex);
  }
  return res;
}
