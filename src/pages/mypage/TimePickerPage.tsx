import React from "react";
import ChikaAlramPage from "./ChikaAlramPage";
import TimePickerModal from "@/components/ui/Modal/TimePickerModal";

const TimePickerPage: React.FC = () => {

  return (
    <>
      {/* 배경: 알람 리스트 */}
      <ChikaAlramPage />

      {/* 모달: CustomTimePicker (확장) */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <TimePickerModal onClose={() => {}} />
      </div>  
    </>
  );
};

export default TimePickerPage;

