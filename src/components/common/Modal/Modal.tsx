// src/components/common/Modal/Modal.tsx

import React, { useEffect } from "react";
import type { ModalProps } from "./Modal.types";
import ModalPortal from "./ModalPortal";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  position = "center",
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  // ========== ESC 키로 모달 닫기 ========== //
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    full: "w-full h-full",
  }[size];

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
          className={`relative bg-white rounded-lg shadow-lg w-full ${sizeClasses}`}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ========== Header ========== */}
          <div className="px-6 pt-6 relative">
            
            {title && (
              <h2 className="text-center text-xl font-semibold">{title}</h2>
            )}
          </div>

          {/* ========== Body ========== */}
          <div className="px-6 py-4 text-center">{children}</div>

          {/* ========== Footer ========== */}
          {footer && (
            <div className="px-6 py-4 flex justify-end gap-2">
              {footer}
            </div>
          )}

        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
