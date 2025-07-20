import React from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "@/components/ui/TimePicker/TimePicker";

const TimePickerModal: React.FC = () => {
  const navigate = useNavigate();
  const closeModal = () => navigate(-1);

  return (
    <div
      className="bg-white shadow-lg"
      style={{
        width: "320px",
        height: "294px",
        borderRadius: "8px",
        opacity: 1,
        transform: "rotate(0deg)"
      }}
      >
        <div
          style={{
            width: "320px",
            height: "234px",
            gap: "30px",
            opacity: 1,
            paddingTop: "30px",
            paddingRight: "20px",
            paddingBottom: "30px",
            paddingLeft: "20px",
            transform: "rotate(0deg)"
          }}
        >
          <TimePicker />
        </div>
        <div
          className="flex"
          style={{
            width: "320px",
            height: "60px",
            gap: "10px",
            opacity: 1,
            paddingRight: "20px",
            paddingBottom: "20px",
            paddingLeft: "20px",
            transform: "rotate(0deg)"
          }}
        >
            <button
              onClick={closeModal}
              className="w-[135px] h-[40px] pl-[12px] pr-[12px] rounded-[8px] border-[#CBD5DC] shadow-[0px_4px_0px_0px_#9CA6AF] bg-[#E9EEF2] text-sm font-semibold"
            >
              취소
            </button>
            <button
              onClick={() => navigate("/logout")}
              className="w-[135px] h-[40px] pl-[12px] pr-[12px] rounded-[8px] bg-[#5FC6F0] shadow-[0px_4px_0px_0px_#3DAFD9] text-white text-sm font-semibold"
            >
              로그아웃
            </button>
        </div>
    </div>
  );
};

export default TimePickerModal;