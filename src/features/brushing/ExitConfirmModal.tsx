import { Modal } from '@/components/ui/Modal';

interface ExitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ExitConfirmModal = ({ isOpen, onClose, onConfirm }: ExitConfirmModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title='정말 나가시겠어요?'
    cancelText='취소'
    confirmText='나가기'
    onConfirm={onConfirm}
  >
    지금 나가면 보상을 받을 수 없어요.
  </Modal>
);

export default ExitConfirmModal;
