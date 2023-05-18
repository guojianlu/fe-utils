import isType from './is-type';

/**
 * 是否为NaN
 * @param target 目标值
 * @returns boolean
 * @example
 * ```
 * isNaN('a'); // true
 * isNaN(NaN); // true
 * isNaN({}); // true
 * isNaN(undefined); // true
 * isNaN(null); // false
 * isNaN(true); // false
 * isNaN(0); // false
 * isNaN(‘0’); // false
 * isNaN([]); // false
 * isNaN(''); // false
 * ```
 */
export default function isNaN(target: any): boolean {
  return isType(target, 'number')
    ? window.isNaN(target)
    : window.isNaN(Number(target));
}
