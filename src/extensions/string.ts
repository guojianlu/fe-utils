import isType from '@/type-check/is-type';
/**
 * 首字母大写，其余小写
 * @param target 目标字符串
 * @returns string
 * @example
 * ```
 * toCapitalized('john'); // John
 * ```
 */
export function toCapitalized(target: string) {
  if (isType(target, 'string')) {
    return `${target[0].toUpperCase()}${target.substring(1).toLocaleLowerCase()}`;
  }
  return '';
}

/**
 * 模板替换
 * @param template 待匹配的模板
 * @param values 填充模板的值
 * @returns string
 * @example
 * ```
 * toReplaceTemplate('{a}+{b}={c}',{a:1,b:2,c:3}); // 1+2=3
 * toReplaceTemplate('Welcome {name}!',{name:'John'}); // Welcome John!
 * ```
 */
export function toReplaceTemplate(template: string, values: Record<string, any>) {
  let res = template;
  if (isType(template, 'string')) {
    if (isType(values, 'object')) {
      const reg = /{([a-zA-Z0-9_-}]+)}/g;
      res = template.replace(reg, (matchStr, key) => {
        return values[key] || key;
      });
    }
  }
  return res;
}
