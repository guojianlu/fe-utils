import { useCallback } from 'react';
import useBoolean from './useBoolean';

export interface useAsyncCallbackResult {
  /**
   * 异步执行loading
   */
  loading: boolean;
  /**
   * 处理后的回调函数
   */
  callback: (...args: any[]) => any;
}

/**
 * 异步回调hook
 * @param fn 待执行函数
 * @param cb 执行完后的回调函数
 */
export default function useAsyncCallback<T>(
  fn: (...args: any[]) => Promise<T> | any,
  cb?: (options: { success?: boolean; data?: T; params?: any }) => void,
): useAsyncCallbackResult {
  const savingController = useBoolean();
  const run = useCallback(
    (...args) => {
      if (typeof fn === 'function') {
        savingController.setTrue();
        const res = fn.call(undefined, ...args);
        if (Object.prototype.toString.call(res) === '[object Promise]') {
          res
            ?.then((response) => {
              if (typeof cb === 'function') cb({ success: true, data: response, params: args });
            })
            .catch((ex) => {
              if (typeof cb === 'function') cb({ success: false, data: ex, params: args });
            })
            .finally(() => {
              savingController.setFalse();
            });
        } else {
          if (typeof cb === 'function') cb({ success: true, data: res, params: args });
          savingController.setFalse();
        }
      } else if (typeof cb === 'function') cb({ success: true });
    },
    [fn, cb],
  );

  return {
    loading: savingController.value,
    callback: run,
  };
}
