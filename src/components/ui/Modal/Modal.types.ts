// Modal Props 타입 정리

import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';
export type ModalPosition = 'center' | 'bottom';

export interface ModalProps {
  isOpen: boolean; // 모달 열림/닫힘
  onClose: () => void; // 모달 닫기 콜백

  title?: string; // 모달 제목
  children: ReactNode; // 모달 본문

  footer?: ReactNode; // 커스텀 푸터 (있으면 이걸 우선)
  confirmText?: string; // 기본 확인 버튼 텍스트
  cancelText?: string; // 기본 취소 버튼 텍스트
  onConfirm?: () => void; // 확인 버튼 클릭 시

  size?: ModalSize; // 모달 크기 (기본: 'md')
  position?: ModalPosition; // 모달 위치 (기본: 'center')

  closeOnOverlayClick?: boolean; // 배경 클릭 시 닫기 여부 (기본: true)
  closeOnEsc?: boolean; // ESC 키로 닫기 여부 (기본: true)

  className?: string;
}
