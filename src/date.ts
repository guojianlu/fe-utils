import dayjs from 'dayjs';

export function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  return time ? dayjs(time).format(format) : '—';
}

export function formatDate(time, format = 'YYYY-MM-DD') {
  return time ? dayjs(time).format(format) : '—';
}

export function getTimeStamp(time) {
  return time ? dayjs(time).valueOf() : dayjs().valueOf();
}
