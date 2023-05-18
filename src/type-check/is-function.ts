import isType from './is-type';

/**
 * 是否为函数
 * @param target 目标值
 * @returns boolean
 * @example
 * ```
 * isFunction(()=>{}); // true
 * isFunction({}); // false
 * ```
 */
export default function isFunction(target: any) {
  return isType(target, 'function');
}
