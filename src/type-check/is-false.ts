import isTrue from './is-true';
/**
 * 是否为false
 * @param target 目标值
 * @returns boolean
 * @examples
 * ```
 * isFalse('false'); // true
 * isFalse('FALSE'); // true
 * isFalse(0); // true
 * isFalse(null); // true
 * isFalse(undefined); // true
 * isFalse(true); // false
 * isFalse('true'); // false
 * isFalse('TRUE'); // false
 * isFalse('0'); // false
 * isFalse({}); // false
 * isFalse([]); // false
 * isFalse(1); // false
 * ```
 */
export default function isFalse(target): boolean {
  return !isTrue(target);
}
