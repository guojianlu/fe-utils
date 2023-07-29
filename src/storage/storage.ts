import jsonParse from '../json/json-parse';
import isNotEmpty from '../type-check/is-not-empty';

export class Storage {
  private source;
  constructor(source) {
    this.source = source || {};
  }
  /**
 * 设置缓存
 * @param key 缓存key
 * @param value 缓存值
 */
  setStorage(key, value) {
    if (isNotEmpty(key, 'string')) {
      this.source.setItem?.(key, JSON.stringify(value));
    } else {
      throw new Error('无效的缓存key');
    }
  }

  /**
 * 读取缓存值
 * @param key 缓存key
 * @returns 缓存值
 */
  getStorage<T=any>(key): T | undefined {
    if (isNotEmpty(key, 'string')) {
      return jsonParse(this.source.getItem?.(key) as string) ?? undefined;
    }
  }

  /**
 * 移除缓存
 * @param key 缓存key，不指定则移除所有缓存
 */
  removeStorage(key?: string) {
    if (isNotEmpty(key, 'string')) {
      this.source.removeItem?.(key as string);
    } else {
      this.source.clear();
    }
  }
}


/**
 * 创建Storage
 * @param source storage源
 * @param key 缓存key
 * @returns Storage
 */
export function createStorage<T=any>(source, key: string) {
  const storage = new Storage(source);
  return {
    get() {
      return storage.getStorage<T>(key);
    },
    set(value) {
      return storage.setStorage(key, value);
    },
    remove() {
      storage.removeStorage(key);
    },
  };
}
