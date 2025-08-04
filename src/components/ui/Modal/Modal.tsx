import { useEffect, useState } from 'react';
import type { ModalProps } from './Modal.types';
import Button from '@/components/ui/Button';
import ModalPortal from './ModalPortal';
import clsx from 'clsx';

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  footer,
  confirmText = '확인',
  cancelText = '취소',
  position = 'center',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}: ModalProps) => {
  const [visible, setVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // ========== ESC 키로 모달 닫기 ========== //
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeOnEsc, onClose]);

  // 애니메이션용 상태 관리
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // 다음 프레임에서 showAnimation 켜기
      requestAnimationFrame(() => setShowAnimation(true));
    } else {
      setShowAnimation(false); // 사라지는 애니메이션 트리거
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  const posClasses = {
    center: 'items-center',
    bottom: 'items-end pb-6',
  }[position];

  return (
    <ModalPortal>
      {/* ========== Overlay (배경 어둡게) ========== */}
      <div
        className={`fixed inset-0 z-50 flex justify-center ${posClasses} px-4`}
        onClick={closeOnOverlayClick ? onClose : undefined}
      >
        <div className='absolute inset-0 bg-black opacity-30' />

        {/* 등장/퇴장 애니메이션 제어 */}
        <div
          className={clsx(
            'z-50 transition-all duration-200 transform',
            showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={clsx(
              'bg-bg-primary-white shadow-lg w-[320px] rounded-[8px] flex flex-col gap-[1px]',
              className, // 외부에서 전달된 스타일
            )}
          >
            {/* ========== Header + Body ========== */}
            <div className='flex flex-col items-center justify-center w-[320px] gap-[10px] pt-[30px] pr-[20px] pb-[32px] pl-[20px]'>
              {title && <h2 className='text-center text-fg-primary head-20-eb'>{title}</h2>}
              <div className='text-center text-fg-strong body-16-b'>{children}</div>
            </div>
            {/* ========== Footer ========== */}
            {footer ? (
              <div className='flex justify-center w-full'>{footer}</div>
            ) : (
              <div className='flex justify-center w-full px-[20px] pb-[20px] gap-[10px] items-center self-stretch'>
                <Button variant='assistive' size='medium' className='w-[135px]' onClick={onClose}>
                  {cancelText}
                </Button>
                <Button
                  variant='primary'
                  size='medium'
                  className='w-[135px]'
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                >
                  {confirmText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
