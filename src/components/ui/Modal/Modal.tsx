import { useEffect } from 'react';
import type { ModalProps } from './Modal.types';
import Button from '@/components/ui/Button';
import ModalPortal from './ModalPortal';

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
}: ModalProps) => {
  // ========== ESC 키로 모달 닫기 ========== //
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

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
        <div
          className='bg-bg-primary-white shadow-lg w-[320px] h-[173px] rounded-[8px] flex flex-col gap-[1px]'
          onClick={(e) => e.stopPropagation()}
        >
          {/* ========== Modal Window ========== */}
          <div className={`fixed inset-0 flex justify-center ${posClasses} z-50 px-4`}>
            <div
              className={`
            w-[320px]
            h-[173px]
            rounded-[8px]
            opacity-100
            bg-bg-primary-white
            flex
            flex-col
            gap-[1px]
          `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ========== Header + Body ========== */}
              <div className='flex flex-col items-center justify-center w-[320px] h-[112px] gap-[10px] opacity-100 pt-[30px] pr-[20px] pb-[32px] pl-[20px]'>
                {title && <h2 className='text-center text-fg-primary head-20-eb'>{title}</h2>}
                <div className='text-center text-fg-strong body-16-b'>{children}</div>
              </div>

              {/* ========== Footer ========== */}
              {!footer && (
                <div className='w-full px-[20px] pb-[20px] flex gap-[10px] items-center justify-center self-stretch'>
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
      </div>
    </ModalPortal>
  );
};

export default Modal;
