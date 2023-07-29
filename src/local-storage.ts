const ls = window.localStorage;
const listeners: { [key: string]: Function[] } = {};
let listening = false;

function get(key: string) {
  return JSON.parse(ls.getItem(key));
}

function set(key: string, value: any) {
  try {
    ls.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

function remove(key: string) {
  return ls.removeItem(key);
}

function clear() {
  return ls.clear();
}

function listen() {
  window.addEventListener(
    'storage',
    (event) => {
      const all = listeners[event.key];
      if (all) {
        all.forEach((listener) => {
          listener(JSON.parse(event.newValue), JSON.parse(event.oldValue), event.url);
        });
      }
    },
    false,
  );
}

function on(key: string, fn: Function) {
  if (listeners[key]) {
    listeners[key].push(fn);
  } else {
    listeners[key] = [fn];
  }
  if (listening === false) {
    listen();
    listening = true;
  }
}

function off(key: string, fn: Function) {
  const ns = listeners[key];
  if (ns.length > 1) {
    ns.splice(ns.indexOf(fn), 1);
  } else {
    listeners[key] = [];
  }
}

function accessor(key: string, value: any) {
  if (arguments.length === 1) {
    return get(key);
  }
  return set(key, value);
}

accessor.set = set;
accessor.get = get;
accessor.remove = remove;
accessor.clear = clear;
accessor.on = on;
accessor.off = off;

export default accessor;
