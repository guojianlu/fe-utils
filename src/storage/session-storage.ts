import { createStorage, Storage } from './storage';

const sessionStorage = new Storage(window.sessionStorage);

/**
 * 设置缓存
 * @param key 缓存key
 * @param value 缓存值
 */
export function setSessionStorage(key: string, value) {
  sessionStorage.setStorage(key, value);
}

/**
* 读取缓存值
* @param key 缓存key
* @returns 缓存值
*/
export function getSessionStorage<T=any>(key: string): T|undefined {
  return sessionStorage.getStorage<T>(key);
}

/**
* 移除缓存
* @param key 缓存key，不指定则移除所有缓存
*/
export function removeSessionStorage(key?: string) {
  sessionStorage.removeStorage(key);
}

/**
 * 创建sessionStorage
 * @param key 缓存key
 * @returns sessionStorage
 */
export function createSessionStorage<T=any>(key: string) {
  return createStorage<T>(window.sessionStorage, key);
}
