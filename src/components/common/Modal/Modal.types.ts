// src/components/common/Modal/Modal.types.ts
// Modal Props 타입 정리

import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg" | "full";
export type ModalPosition = "center" | "bottom";

export interface ModalProps {
    isOpen: boolean;                // 모달 열림/닫힘
    onClose: () => void;            // 모달 닫기 콜백

    title?: string;                 // 모달 제목
    children: ReactNode;            // 모달 본문

    footer?: ReactNode;             // 푸터 버튼 영역 (예: 확인/취소)

    size?: ModalSize;               // 모달 크기 (기본: 'md')
    position?: ModalPosition;       // 모달 위치 (기본: 'center')

    closeOnOverlayClick?: boolean;  // 배경 클릭 시 닫기 여부 (기본: true)
    closeOnEsc?: boolean;           // ESC 키로 닫기 여부 (기본: true)
}
