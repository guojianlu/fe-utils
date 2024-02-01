import chalk from 'chalk';
import dayjs from 'dayjs';

const { log } = console;

const logger = {
  info(...args) {
    log(`[${dayjs().format('HH:mm:ss')}]`, chalk.green('INFO'), ...args);
  },
  warn(...args) {
    log(`[${dayjs().format('HH:mm:ss')}]`, chalk.yellow('WARN'), ...args);
  },
  error(...args) {
    log(`[${dayjs().format('HH:mm:ss')}]`, chalk.red('ERROR'), ...args);
  },
  debug(...args) {
    log(`[${dayjs().format('HH:mm:ss')}]`, chalk.blue('DEBUG'), ...args);
  },
};

export default logger;
