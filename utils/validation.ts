/**
 ** ID 길이 체크
 */

export const checkLength = (id: string): boolean => {
  const result = false;

  if (id.length < 4 || id.length > 16) {
    return result;
  }

  return !result;
};

/**
 ** Email 입력 여부 체크
 */

export const checkEmail = (id: string): boolean => {
  const result = false;

  if (id.indexOf("@") > -1) {
    return result;
  }

  return !result;
};
