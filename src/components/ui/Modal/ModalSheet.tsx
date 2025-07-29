import ModalPortal from './ModalPortal';
import { useEffect } from 'react';

type ModalSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
};

const ModalSheet = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalSheetProps) => {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      {/* Overlay */}
      <div
        className='fixed inset-0 z-50 flex items-end justify-center'
        onClick={closeOnOverlayClick ? onClose : undefined}
      >
        <div className='absolute inset-0 bg-black opacity-40' />
        {/* Sheet */}
        <div
          className='relative z-10  max-w-[480px] min-w-[360px] rounded-t-[16px] bg-white p-5'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle Bar */}
          <div className='w-9 h-1.25 bg-fg-gray-weak-weak rounded-full mx-auto mb-4' />
          {title && <h2 className='text-lg font-bold text-center mb-2.5'>{title}</h2>}
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalSheet;
