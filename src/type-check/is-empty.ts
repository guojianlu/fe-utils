import { getType } from './is-type';

export type EmptyTypes = 'string'|'object' | 'array' | 'map' | 'set' | 'null' | 'undefined';

/**
 * 判空
 * @param target 目标值
 * @param targetType 目标类型
 * @returns boolean
 * @example
 * ```
 * isEmpty([]);// true
 * isEmpty({});// true
 * isEmpty('');// true
 * isEmpty(new Set());// true
 * isEmpty(new Map());// true
 * isEmpty(null);// true
 * isEmpty(undefined);// true
 * isEmpty([1,2],'array');// false
 * isEmpty([1,2],'object');// false
 * isEmpty([1,2]);// false
 * isEmpty(1);// false
 * isEmpty(false);// false
 * ```
 */
export default function isEmpty(target: any, targetType?: EmptyTypes): boolean {
  const type = getType(target);
  let empty = false;
  switch (type) {
    case 'array':
    case 'string':
      empty = target.length === 0;
      break;
    case 'object':
      empty = Object.keys(target).length === 0;
      break;
    case 'map':
    case 'set':
      empty = target.size === 0;
      break;
    case 'null':
    case 'undefined':
      empty = true;
      break;
    default:
      empty = false;
  }
  // @ts-ignore
  if (targetType) return empty && type === targetType;
  return empty;
}

/**
 * 是否为空数组
 * @param target 目标数组
 * @returns boolean
 */
export function isEmptyArray(target: any[]) {
  return isEmpty(target, 'array');
}

/**
 * 是否为空对象
 * @param target 目标对象
 * @returns boolean
 */
export function isEmptyObject(target: Record<string, any>) {
  return isEmpty(target, 'object');
}

/**
 * 是否为空字符串
 * @param target 目标字符串
 * @returns boolean
 */
export function isEmptyString(target: string) {
  return isEmpty(target, 'string');
}
