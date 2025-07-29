import axios from 'axios';

export const logApiError = (error: unknown, context: string) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (!status) {
      console.error(`[${context}] 네트워크 오류 또는 응답 없음`);
      return;
    }

    switch (status) {
      case 400:
        console.error(`[${context}] 잘못된 요청 (400)`);
        break;
      case 401:
        console.error(`[${context}] 인증 실패 (401)`);
        break;
      case 403:
        console.error(`[${context}] 권한 없음 (403)`);
        break;
      case 404:
        console.error(`[${context}] 리소스를 찾을 수 없음 (404)`);
        break;
      case 500:
        console.error(`[${context}] 서버 내부 오류 (500)`);
        break;
      default:
        console.error(`[${context}] 알 수 없는 오류 (${status})`, error.response?.data);
    }
  } else {
    console.error(`[${context}] 예기치 않은 오류`, error);
  }
};
