// src/components/common/Modal/Modal.tsx

import React, { useEffect } from "react";
import type { ModalProps } from "./Modal.types";
import ModalPortal from "./ModalPortal";

  const Modal = ({
    isOpen,
    onClose,
    title,
    children,        
    footer,
    position = "center",
    closeOnOverlayClick = true,
    closeOnEsc = true,
  }: ModalProps) => {
  // ========== ESC 키로 모달 닫기 ========== //
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const posClasses = {
    center: "items-center",
    bottom: "items-end pb-6",
  }[position];

  return (
    <ModalPortal>

      {/* ========== Overlay (배경 어둡게) ========== */}
      <div
        className="fixed inset-0 bg-gray-100 bg-opacity-70 z-40"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* ========== Modal Window ========== */}
      <div
        className={`fixed inset-0 flex justify-center ${posClasses} z-50 px-4`}
      >
        <div
          className={`
            fixed
            top-[20px]
            left-[20px]
            w-[320px]
            h-[173px]
            rounded-[8px]
            opacity-100
            bg-white
            shadow-lg
            flex
            flex-col
            gap-[1px]
          `}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ========== Header + Body ========== */}
          <div
            className="flex flex-col items-center justify-center w-[320px] h-[112px] gap-[10px] opacity-100 pt-[30px] pr-[20px] pb-[32px] pl-[20px]"
          >
            {title && (
              <h2 className="text-center text-xl font-semibold mb-0">{title}</h2>
            )}
            <div className="text-center text-gray-500 text-sm w-full">{children}</div>
          </div>

          {/* ========== Footer ========== */}
          {footer && (
            <div className="w-[320px] h-[60px] px-[20px] pb-[20px] flex justify-end items-end gap-[10px]">
              {footer}
            </div>
          )}

        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
