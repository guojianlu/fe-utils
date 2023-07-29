import { useState, useCallback } from 'react';

const gitDomain = 'http://example.com';
const service = {
  /**
   * 检查Git仓库是否存在
   * @param options 配置项
   * @returns boolean
   */
  checkProjectExists({ gitUrl }) {
    console.log(gitUrl);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  },
  /**
   * 检查Git仓库是否授权
   * @param options 配置项
   * @returns boolean
   */
  checkProjectIsAuthorized({ gitUrl }) {
    console.log(gitUrl);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  },
};

export type ValidateStateEnum = 'error' | 'success' | 'loading';

export interface useCheckGitRepoResult {
  /**
   * 校验状态
   */
  validateState: ValidateStateEnum | undefined;
  /**
   * 校验函数
   */
  validator: (rule, value) => Promise<any>;
  /**
   * 错误提示
   */
  errMessage: string;
}

/**
 * Git仓库校验Hook
 */
export default function useCheckGitRepo(): useCheckGitRepoResult {
  const [validateState, setValidateState] = useState<ValidateStateEnum>();
  const [errMessage, setErrMessage] = useState<string>('');
  const validator = useCallback((rule, value) => {
    const checkStart = () => {
      setValidateState('loading');
    };
    const checkParamFormat = () => {
      const [group, project] = value?.split('/');
      if (!group || !project) {
        throw new Error('格式要求：group/project，且只能包含小写字母，数字，_，- ，不能以 - 开头');
      }
    };
    const checkProjectExists = () => {
      return service
        .checkProjectExists({
          gitUrl: `${gitDomain}/${value}`,
        })
        .then((projectIsExist) => {
          if (!projectIsExist) {
            throw new Error(`检测到仓库 ${value} 不存在，请自行排查后输入正确仓库地址`);
          }
        });
    };
    const checkProjectIsAuthorized = () => {
      return service
        .checkProjectIsAuthorized({
          gitUrl: `${gitDomain}/${value}`,
        })
        .then((projectIsAuthorized) => {
          if (!projectIsAuthorized) {
            throw new Error('检测到该仓库没有admin或您当前账号权限，请先给相关账号赋权后再操作');
          }
        });
    };
    const checkPassed = () => {
      setErrMessage('');
      setValidateState('success');
    };
    const checkFailed = (error) => {
      setErrMessage(error.message);
      setValidateState('error');
      throw error;
    };
    if (value) {
      return Promise.resolve()
        .then(checkStart)
        .then(checkParamFormat)
        .then(checkProjectExists)
        .then(checkProjectIsAuthorized)
        .then(checkPassed)
        .catch(checkFailed);
    } else {
      return Promise.resolve().then(checkPassed);
    }
  }, []);

  return {
    validator,
    errMessage,
    validateState,
  };
}
