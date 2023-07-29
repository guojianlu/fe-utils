// 类型判断
import isEmpty, { isEmptyArray, isEmptyObject, isEmptyString } from './type-check/is-empty';
import isType, { getType } from './type-check/is-type';
import isFalse from './type-check/is-false';
import isTrue from './type-check/is-true';
import isFunction from './type-check/is-function';
import isNotEmpty, {
  isNotEmptyArray,
  isNotEmptyObject,
  isNotEmptyString,
} from './type-check/is-not-empty';

// 基础类型扩展
import { filterInvalidProps, toLabelValueArray } from './extensions/object';
import { toCapitalized, toReplaceTemplate } from './extensions/string';
import { getObjectFromLabelValueArray, removeFromArray } from './extensions/array';
import { fixNumberPrecision, formatNumber } from './extensions/number';

// dom
import loadScript from './dom/load-script';
import loadCSS from './dom/load-css';
import download from './dom/download';
import copy from './dom/copy';

// url处理
import parseQueryString from './url/parse-query-string';
import composeUrlParams from './url/compose-url-params';
import getQueryString from './url/get-query-string';
import parseUrl from './url/parse-url';
import getUrlParams from './url/get-url-prams';

// 日期处理
import { formatDate, formatTime, getTimeStamp } from './date';

// json
import jsonParse from './json/json-parse';
import jsonStringify from './json/json-strify';

// 打印日志
import logger from './logger';
// 事件
import EventEmitter from './event-emitter';
// 唯一id
import uid from './uid';
// localStorage
import ls from './local-storage';
// request
import request from './fetch/request';

// 缓存
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  createLocalStorage,
} from './storage/local-storage';
import {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  createSessionStorage,
} from './storage/session-storage';

// 常用正则
export { default as REG_EXP } from './regexp';

// 自定义Hooks
export { default as useBoolean } from './hooks/useBoolean';
export { default as useAsyncCallback } from './hooks/useAsyncCallback';
export { default as useCheckGitRepo } from './hooks/useCheckGitRepo';

// 导出
export { parseQueryString, getUrlParams, parseUrl, getQueryString, composeUrlParams };
export { getLocalStorage, setLocalStorage, removeLocalStorage, createLocalStorage };
export { getSessionStorage, setSessionStorage, removeSessionStorage, createSessionStorage };
export { toCapitalized, toReplaceTemplate, filterInvalidProps as filterObject, toLabelValueArray };
export { getObjectFromLabelValueArray, removeFromArray };
export { formatNumber, fixNumberPrecision };
export { formatDate, formatTime, getTimeStamp };
export { loadScript, loadCSS, download, copy };
export { jsonParse, jsonStringify };
export { EventEmitter };
export { request };
export { logger };
export { uid };
export { ls };
export {
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isType,
  getType,
  isTrue,
  isFalse,
  isFunction,
  isNotEmpty,
  isNotEmptyArray,
  isNotEmptyObject,
  isNotEmptyString,
};
