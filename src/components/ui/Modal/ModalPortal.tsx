// src/components/common/Modal/ModalPortal.tsx
import React from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  return createPortal(children, document.body);  // 임시로 body에 직접 렌더링
};

export default ModalPortal;
