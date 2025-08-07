const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

export const validateNickname = (nickname: string): string | null => {
  const trimmed = nickname.trim();

  // 1. 길이 검사
  if (trimmed.length < 2 || trimmed.length > 10) {
    return '닉네임은 2자 이상 10자 이하로 입력해주세요.';
  }

  // 2. 공백 포함 여부 검사
  if (/\s/.test(trimmed)) {
    return '닉네임에는 공백을 포함할 수 없어요.';
  }

  // 3. 허용 문자 외 사용 여부 검사
  if (!nicknameRegex.test(trimmed)) {
    return '닉네임은 한글, 영문, 숫자만 사용할 수 있어요.';
  }

  return null; // 유효한 닉네임
};

const nameRegex = /^[가-힣a-zA-Z]{2,}$/;

export const validateName = (name: string): string | null => {
  const trimmed = name.trim();

  if (!nameRegex.test(trimmed)) {
    return '이름은 한글 또는 영문 2자 이상으로 입력해 주세요.';
  }

  return null;
};
