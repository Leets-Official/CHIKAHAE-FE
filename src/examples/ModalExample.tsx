// src/examples/ModalExample.tsx

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
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
        title="모달 예제"
        footer={
          <>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setIsModalOpen(false)}
            >
              버튼
            </Button>
            <Button
              variant="primary"
              className="w-full"
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

// 개발 중 테스트 시 root에 렌더링
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ModalExample />
  </React.StrictMode>
);

export default ModalExample;
