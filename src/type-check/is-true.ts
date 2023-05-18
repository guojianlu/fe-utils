import { getType } from './is-type';

/**
 * 是否为true
 * @param target 目标值
 * @returns boolean
 * @examples
 * ```
 * isTrue(true); // true
 * isTrue('true'); // true
 * isTrue('TRUE'); // true
 * isTrue('false'); // false
 * isTrue('FALSE'); // false
 * isTrue('0'); // false
 * isTrue('null'); // false
 * isTrue('undefined'); // false
 * isTrue('NaN'); // false
 * isTrue('nan'); // true
 * isTrue({}); // true
 * isTrue([]); // true
 * isTrue(1); // true
 * isTrue(0); // false
 * isTrue(null); // false
 * isTrue('NULL'); // false
 * isTrue(undefined); // false
 * ```
 */
export default function isTrue(target: any): boolean {
  const targetType = getType(target);
  let flag: boolean;
  switch (targetType) {
    case 'boolean':
      flag = target;
      break;
    case 'string':
      flag = target.length > 0 && !['false', '0', 'null', 'undefined'].includes(target.toLowerCase()) && target !== 'NaN';
      break;
    default:
      flag = !!target;
  }
  return flag;
}
