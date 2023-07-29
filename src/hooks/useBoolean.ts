import { useState } from 'react';

export interface useBooleanOptions {
  /**
   * 设置false时的回调
   */
  onSetFalse?: () => void;
  /**
   * 设置true时的回调
   */
  onSetTrue?: (payload?: any) => void;
}

export interface useBooleanResult {
  /**
   * 设置true
   */
  setTrue: (payload?: any) => void;
  /**
   * 设置false
   */
  setFalse: () => void;
  /**
   * 切换值
   */
  toggle: (payload?: any) => void;
  /**
   * 设置值
   */
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * 当前值
   */
  value: boolean;
}

/**
 * 布尔hook
 * @param defaultValue 默认值
 * @param options 可以配置值变化时的回调
 */
export default function useBoolean(
  defaultValue?: boolean,
  options?: useBooleanOptions,
): useBooleanResult {
  const { onSetFalse, onSetTrue } = options || {};
  const [value, setValue] = useState(!!defaultValue);
  const setTrue = (payload) => {
    onSetTrue && onSetTrue(payload);
    setValue(true);
  };
  const setFalse = () => {
    onSetFalse && onSetFalse();
    setValue(false);
  };
  const toggle = (payload) => {
    setValue((val) => {
      if (!val) {
        onSetTrue && onSetTrue(payload);
      } else {
        onSetFalse && onSetFalse();
      }
      return !val;
    });
  };
  return { value, setTrue, setFalse, setValue, toggle };
}
