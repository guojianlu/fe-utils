import { uid as _uid } from 'uid';

/**
 * 生成固定长度的唯一值字符串
 * @param len 字符长度，默认11
 * @returns string
 */
function uid(len?: number) {
  return _uid(len);
}
export default uid;

// import { customAlphabet } from 'nanoid';
// export function uuid(length = 6) {
//   const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length);
//   return nanoid();
// }
