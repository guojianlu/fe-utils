import isNotEmpty from '@/type-check/is-not-empty';

export interface DownloadOptions{
  /**
   * 下载文件名
   */
  fileName?: string;
}

/**
 * 下载文件
 * @param link 下载链接
 * @param param DownloadOptions
 */
export default function download(
  link: string,
  options?: DownloadOptions,
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (isNotEmpty(link, 'string')) {
      const filePath = link.split('/').pop() as any;
      const matches = /([^./]+)\.([^/_-]+)([^/]*)$/g.exec(filePath);
      let defaultFileName;
      if (matches) {
        defaultFileName = `${matches[1]}${matches[3]}.${matches[2]}`;
      } else {
        reject(new Error('无效的下载链接'));
        return;
      }
      const { fileName = defaultFileName } = { ...options };

      // content-type 为二进制类型数据时（如octet-stream），浏览器不能直接预览，会唤起下载弹窗
      // 如果是常规的content-type，如image/png可以直接预览；
      // 要实现下载文件，可以借助a标签download属性实现
      fetch(link).then((res) => {
        if (res.status === 200) { return res.blob(); }
        throw new Error(res.status.toString());
      }).then((blob) => {
      // 跨域文件链接转为同源链接
        const url = URL.createObjectURL(new Blob([blob]));
        _download(url, fileName);
        resolve(true);
      }).catch((err) => {
        try {
          if (err.message === 'Failed to fetch') {
            // 有可能是因为访问资源不支持跨域，通过a标签方式重试
            _download(link, fileName);
            resolve(true);
          } else {
            reject(err);
          }
        } catch (error) {
          reject(error);
        }
      });
    } else {
      reject(new Error('无效的下载链接'));
    }
  });
}


/**
 * 文件下载
 * @param url 待下载文件链接
 * @param fileName 默认文件名
 */
function _download(url, fileName) {
  const a = document.createElement('a');
  const event = new MouseEvent('click');
  a.href = url;
  a.download = fileName;
  a.dispatchEvent(event);
  URL.revokeObjectURL(url);
}
