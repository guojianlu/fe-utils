export type BaseTypes =
  | 'string'
  | 'number'
  | 'object'
  | 'array'
  | 'null'
  | 'map'
  | 'set'
  | 'promise'
  | 'undefined'
  | 'boolean'
  | 'function'
  | 'symbol';

/**
 * 类型判断
 * @param target 目标值
 * @param targetTpe 目标类型
 * @returns boolean
 * @example
 * ```
 * isType({},'object'); // true
 * isType({},'array'); // false
 * ```
 */
export default function isType(target: any, targetTpe: BaseTypes): boolean {
  return getType(target) === targetTpe;
}

/**
 * 获取值类型
 * @param target 目标值
 * @returns BaseTypes
 * @example
 * ```
 * getType({}); // object
 * getType([]); // array
 * getType('a'); // string
 * getType(1); // number
 * getType(null); // null
 * getType(undefined); // undefined
 * ```
 */
export function getType(target: any): BaseTypes {
  const type: string = Object.prototype.toString.call(target);
  const matches = /\[(.*) (.*)\]/.exec(type) as RegExpExecArray;
  return matches[2].toLowerCase() as BaseTypes;
}
