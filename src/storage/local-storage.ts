import { createStorage, Storage } from './storage';

const localStorage = new Storage(window.localStorage);

/**
 * 设置缓存
 * @param key 缓存key
 * @param value 缓存值
 */
export function setLocalStorage(key: string, value) {
  localStorage.setStorage(key, value);
}

/**
 * 读取缓存值
 * @param key 缓存key
 * @returns 缓存值
 */
export function getLocalStorage<T = any>(key: string): T | undefined {
  return localStorage.getStorage<T>(key);
}

/**
 * 移除缓存
 * @param key 缓存key，不指定则移除所有缓存
 */
export function removeLocalStorage(key?: string) {
  localStorage.removeStorage(key);
}

/**
 * 创建localStorage
 * @param key 缓存key
 * @returns localStorage
 */
export function createLocalStorage<T = any>(key: string) {
  return createStorage<T>(window.localStorage, key);
}
