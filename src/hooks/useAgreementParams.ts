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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL 쿼리파라미터로부터 agreements 값을 읽어와 상태 초기화/동기화
  useEffect(() => {
    const param = searchParams.get('agreements');
    const showModal = searchParams.get('showTermsModal') === 'true';

    if (param) {
      setAgreements(param.split(',').map((item) => item === 'true'));
    }
    setIsModalOpen(showModal);
  }, [searchParams]);

  // agreements 상태를 URL 파라미터에 반영
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (isModalOpen) newSearchParams.set('showTermsModal', 'true');
    newSearchParams.set('agreements', agreements.join(','));
    setSearchParams(newSearchParams);
  }, [agreements, isModalOpen]);

  // 특정 인덱스의 약관 동의 여부 토글
  const toggleAgreement = (idx: number) => {
    if (idx === -1) {
      // 전체보기 클릭한 경우 → 모달 열기만
      setIsModalOpen(true);
    } else {
      setAgreements((prev) => prev.map((val, i) => (i === idx ? !val : val)));
    }
  };

  // 동의 상태 및 쿼리파라미터 초기화
  const reset = () => {
    setAgreements(defaultValue);
    setIsModalOpen(false);
    setSearchParams(new URLSearchParams());
  };

  return {
    agreements, // 현재 동의 상태
    isCompleted: agreements[0] && agreements[1], // 필수 항목 모두 동의했는지
    toggleAgreement, // 개별 약관 토글 또는 전체보기
    reset, // 상태 초기화
    isModalOpen, // 모달 열림 여부
  };
};
