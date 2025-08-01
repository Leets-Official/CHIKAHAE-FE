import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * == 약관 동의 상태를 URL 쿼리파라미터와 동기화하는 훅 ==
 *
 * - URL 파라미터로 약관 모달 오픈 여부(showTermsModal)와 각 약관 동의 여부(agreements)를 유지
 * - agreements: [약관1, 약관2, 약관3] 순서의 boolean 배열
 */

export const useAgreementParams = (defaultValue = [false, false, false]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [agreements, setAgreements] = useState<boolean[]>(defaultValue);

  // URL 쿼리파라미터로부터 agreements 값을 읽어와 상태 초기화/동기화
  useEffect(() => {
    const param = searchParams.get('agreements');
    if (param) {
      setAgreements(param.split(',').map((item) => item === 'true'));
    }
  }, [searchParams]);

  // agreements 상태를 URL 파라미터에 반영
  const updateParams = (showModal: boolean, newAgreements: boolean[]) => {
    const newSearchParams = new URLSearchParams();
    if (showModal) newSearchParams.set('showTermsModal', 'true');
    newSearchParams.set('agreements', newAgreements.join(','));
    setSearchParams(newSearchParams); // URL 갱신
  };

  // 특정 인덱스의 약관 동의 여부 토글
  const toggleAgreement = (idx: number) => {
    setAgreements((prev) => {
      const next = prev.map((val, i) => (i === idx ? !val : val));
      updateParams(true, next);
      return next;
    });
  };

  // 동의 상태 및 쿼리파라미터 초기화
  const reset = () => {
    setSearchParams(new URLSearchParams());
    setAgreements(defaultValue);
  };

  return {
    agreements, // 현재 동의 상태
    isCompleted: agreements[0] && agreements[1], // 필수 항목 2개 모두 동의했는지 여부
    toggleAgreement, // 동의 토글 함수
    reset, // 상태 초기화 함수
    isModalOpen: searchParams.get('showTermsModal') === 'true', // 모달 열림 여부
  };
};
