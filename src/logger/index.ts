import { log, info, warn, error, setLevel, LogLevelDesc } from 'loglevel';
import isType from '../type-check/is-type';

export function setLogLevel(level?: LogLevelDesc) {
  if (level) {
    setLevel(level);
  } else {
    setLevel('ERROR');
  }
}

setLogLevel();

/**
 * 本地start调试打印所有日志，build构建后只打印error日志
 */
const logger = {
  log,
  warn,
  error,
  info: (...msgs) => {
    msgs.forEach((item) => {
      if (isType(item, 'string')) {
        info(`%c${item}`, 'color:dodgerblue');
      } else {
        info(item);
      }
    });
  },
  success: (...msgs) => {
    msgs.forEach((item) => {
      if (isType(item, 'string')) {
        log(`%c${item}`, 'color:forestgreen');
      } else {
        log(item);
      }
    });
  },
};

export default logger;
