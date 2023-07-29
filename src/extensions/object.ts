import isNotEmpty from '@/type-check/is-not-empty';
/**
 * 过滤对象无效属性
 * @param target 目标对象
 * @returns any
 * @example
 * ```
 * filterInvalidProps({a:null,b:undefined,c:1}); // {c:1}
 * ```
 */
export function filterInvalidProps(target: Record<string, any>) {
  if (isNotEmpty(target, 'object')) {
    return Object.keys(target).reduce((pre, cur) => {
      if (![null, undefined].includes(target[cur])) {
        pre[cur] = target[cur];
      }
      return pre;
    }, {});
  }
  return {};
}

export interface LabelValue{
  label: string;
  value: any;
}

/**
 * 对象转LabelValue数组
 * @param target 目标对象
 * @returns LabelValue[]
 * @example
 * ```
 * toLabelValueArray({success:'成功',fail:'失败'}); // [{label:'成功',value:'success'},{label:'失败',value:'fail'}]
 * ```
 */
export function toLabelValueArray(target: Record<string, any>): LabelValue[] {
  if (isNotEmpty(target, 'object')) {
    return Object.keys(target).reduce((pre: LabelValue[], cur) => {
      const item = { label: target[cur], value: cur };
      pre.push(item);
      return pre;
    }, []);
  }
  return [];
}
