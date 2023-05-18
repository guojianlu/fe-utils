import isEmpty, { EmptyTypes } from './is-empty';
import isType from './is-type';


/**
 * 判空
 * @param target 目标值
 * @param targetType 目标类型
 * @returns boolean
 * @example
 * ```
 * isNotEmpty([]);// false
 * isNotEmpty({});// false
 * isNotEmpty('');// false
 * isNotEmpty(new Set());// false
 * isNotEmpty(new Map());// false
 * isNotEmpty(null);// false
 * isNotEmpty(undefined);// false
 * isNotEmpty([1,2],'array');// true
 * isNotEmpty([1,2],'object');// false
 * isNotEmpty([1,2]);// true
 * isNotEmpty(1);// true
 * isNotEmpty(false);// true
 * ```
 */
export default function isNotEmpty(target: any, targetType?: EmptyTypes): boolean {
  return targetType ? isType(target, targetType) && !isEmpty(target) : !isEmpty(target);
}


export function isNotEmptyArray(target: any[]) {
  return isNotEmpty(target, 'array');
}

export function isNotEmptyObject(target: Record<string, any>) {
  return isNotEmpty(target, 'object');
}

export function isNotEmptyString(target: string) {
  return isNotEmpty(target, 'string');
}

