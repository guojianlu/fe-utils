/**
 * 通过execCommand方式实现复制文本
 */
const execCopy = (text) => {
  const parentDom = document.body;
  const inputDom = document.createElement('input');
  const inputStyle = { opacity: 0, position: 'fixed', 'pointer-events': 'none', top: 0, left: 0 };
  Object.keys(inputStyle).forEach((key) => { inputDom.style[key] = inputStyle[key]; });
  inputDom.value = text;
  parentDom.appendChild(inputDom);
  return new Promise((resolve, reject) => {
    inputDom.focus();
    if (inputDom?.select) {
      inputDom.select();
    } else {
    // 兼容IOS
      inputDom.setSelectionRange(0, inputDom.value?.length);
    }
    const res = document.execCommand('copy');
    inputDom.blur();
    if (res) {
      resolve(true);
    } else {
      reject();
    }
    parentDom.removeChild(inputDom);
  });
};

/**
 * 通过Clipboard API实现复制文本
 */
const clipboardCopy = (text) => {
  return navigator.clipboard.writeText(text);
};

/**
 * 复制文本到剪切板
 * @param text string
 * @returns Promise
 */
export default function copy(text) {
  return text && navigator.clipboard ? clipboardCopy(text) : execCopy(text);
}

