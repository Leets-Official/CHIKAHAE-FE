// src/examples/ModalExample.tsx

import React, { useState } from "react";
import { Modal } from "@/components/common/Modal";
import Button from "@/components/ui/Button";

const ModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        모달 열기
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="타이틀"
        footer={
          <>
            <Button
              variant="assistive"
              size={"medium" as const}
              className="w-[135px]"
              onClick={() => setIsModalOpen(false)}
            >
              버튼
            </Button>
            <Button
              variant="primary"
              size={"medium" as const}
              className="w-[135px]"
              onClick={() => {
                alert("확인되었습니다!");
                setIsModalOpen(false);
              }}
            >
              버튼
            </Button>
          </>
        }
      >
        설명 문구
      </Modal>
    </div>
  );
};

export default ModalExample;
