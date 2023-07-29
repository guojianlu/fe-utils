import isNotEmpty from '@/type-check/is-not-empty';
import isFunction from '@/type-check/is-function';
import { LabelValue } from './object';

/**
 * 通过LabelValue数组获取对象
 * @param target 目标数组
 * @returns object
 * @example
 * ```
 * getObjectFromLabelValueArray([{label:'成功',value:'success'},{label:'失败',value:'fail'}]); // {success:'成功',fail:'失败'}
 * ```
 */
export function getObjectFromLabelValueArray(target: LabelValue[]) {
  if (isNotEmpty(target, 'array')) {
    return target.reduce((pre, cur) => {
      if (cur.value) {
        pre[cur.value] = cur.label;
      }
      return pre;
    }, {});
  }
  return {};
}

/**
 * 从数组中移除
 * @param source 源数组
 * @param target 要移除的目标或者查找函数
 * @example
 * ```
 * removeFromArray([1,2,3],2);// [1,3]
 * removeFromArray([1,2,3],item=>item===2);// [1,3]
 * removeFromArray([1,2,3],2,0);// [1,0,3]
 * ```
 */
export function removeFromArray(source: any[], target: ((item: any) => boolean) | any, ...items) {
  if (isNotEmpty(source, 'array')) {
    const idx = isFunction(target) ? source.findIndex(target) : source.indexOf(target);
    if (idx >= 0) {
      source.splice(idx, 1, ...items);
    }
  }
  return source;
}
