import logger from './logger';
import isFunction from './type-check/is-function';
import isNotEmpty from './type-check/is-not-empty';

interface EventCallback{
  callback: Function;
  once?: boolean;
}
export default class EventEmitter {
  readonly eventMap: Record<string, EventCallback[]> = {};

  /**
   * 触发事件
   * @param name 事件名称
   * @param payload 传参
   */
  emit(name: string, payload?: any) {
    if (!isNotEmpty(name, 'string')) {
      logger.warn(`无效的参数name：${name}，必须为非空字符串`);
      return;
    }
    const callbacks = this.eventMap[name] || [];
    let onceCallbackCount = 0;
    if (!callbacks.length) {
      logger.warn(`没有找到相关事件绑定：${name}`);
      return;
    }
    callbacks.forEach((item) => {
      try {
        item.callback(payload);
        if (item.once) onceCallbackCount++;
      } catch (error) {
        logger.error(error);
      }
    });
    if (onceCallbackCount) {
      this.eventMap[name] = callbacks.filter((item) => !item.once);
    }
  }
  /**
   * 绑定监听事件
   * @param name 事件名称
   * @param callback 事件回调
   * @param once 是否为单次回调
   */
  on(name: string, callback: Function, once?: boolean) {
    if (!isNotEmpty(name, 'string')) {
      logger.warn(`无效的参数name：${name}，必须为非空字符串`);
      return;
    }
    if (!this.eventMap[name]) {
      this.eventMap[name] = [];
    }
    const callbacks = this.eventMap[name];
    if (!callbacks.some((item) => item.callback === callback)) {
      callbacks.push({ callback, once });
    }
  }
  /**
   * 解绑事件监听
   * @param name 事件名称
   * @param callback 事件回调，不指定即移除所有事件监听
   */
  off(name: string, callback?: Function) {
    if (isFunction(callback)) {
      const callbacks = this.eventMap[name] || [];
      if (callbacks.some((item) => item.callback === callback)) {
        this.eventMap[name] = callbacks.filter((d) => d.callback !== callback);
      }
    } else {
      this.eventMap[name] = [];
    }
  }
  /**
   * 事件单次监听
   * @param name 事件名称
   * @param callback 事件回调
   */
  once(name: string, callback: Function) {
    this.on(name, callback, true);
  }
}
