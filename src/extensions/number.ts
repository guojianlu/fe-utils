import isType from '../type-check/is-type';

/**
 * 数字格式化
 * @param target 目标数值
 * @param format 格式化模板
 * @returns string
 * @example
 * ```
 * formatNumber(1000,'0,0'); // 1,000
 * formatNumber(0.85,'0%'); // 85%
 * formatNumber(122.8547,'0.00'); // 122.85
 * formatNumber(1000,'0,0.00'); // 1,000.00
 * ```
 */
export function formatNumber(target: number, format: string): string {
  let res: any = isNaN(target) ? 0 : Number(target);
  if (isType(format, 'string')) {
    const specialChars = getSpecialChars(format);
    if (specialChars.includes('%')) {
      res *= 100;
    }
    if (specialChars.includes('.')) {
      const matches = /\.([0]+)/g.exec(format);
      if (matches) {
        res = res.toFixed(matches[1].length);
      }
    } else {
      res = res.toFixed(0);
    }
    if (specialChars.includes(',')) {
      const parts = res.split('.');
      res = `${parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')}`;
      if (parts[1]) res = `${res}.${parts[1]}`;
    }
    if (specialChars.includes('%')) {
      res = `${res}%`;
    }
  }
  return res;
}

/**
 * 获取格式化模板中的标志符号
 * @param format 格式化模板
 * @returns string[]
 */
function getSpecialChars(format: string) {
  const chars: string[] = [];
  const reg = /0*([^0-9])0*/g;
  let matches = reg.exec(format);
  while (matches) {
    chars.push(matches[1]);
    matches = reg.exec(format);
  }
  return chars;
}

// 参考 https://www.npmjs.com/package/number-precision

/**
 * 修复数字精度问题，数字计算较多的话，建议使用[number-precision](https://www.npmjs.com/package/number-precision)
 * @param target 目标数值
 * @example
 * ```
 * fixNumberPrecision(0.3+0.6); // 0.9
 * fixNumberPrecision(0.1+0.3); // 0.4
 * ```
 */
export function fixNumberPrecision(target: number): number {
  if (!isNaN(target)) {
    return +Number(target).toPrecision(15);
  }
  return target;
}
