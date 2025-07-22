import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as RightIcon } from "@/assets/icons/chevron_right.svg";

const ChikaAlram = () => {
  const navigate = useNavigate();

  const [alarms] = useState([
    { id: "morning", label: "아침", time: "08:00" },
    { id: "lunch", label: "점심", time: "12:00" },
    { id: "dinner", label: "저녁", time: "18:00" },
  ]);

  return (
    <div>
      {/* 알람 리스트 */}
      <div
        className="w-[320px] h-[188px] bg-[#F5F7FA] border-[2px] border-[#DCE3E8] rounded-[8px] border-solid flex gap-[2px] relative top-[14px]"
      >
        <div className="relative w-[320px] h-[160px] top-[14px] gap-[8px] flex flex-col">
          {alarms.map((alarm) => (

            <div
              key={alarm.id}
              className="w-[320px] h-[48px] flex justify-between pt-[12px] pr-[20px] pb-[12px] pl-[20px]"
            >
              <span className="flex items-center justify-center body-16-eb">
                {alarm.label}
              </span>
              <div className="w-[72px] h-[24px] flex items-center gap-1">
                <span className="flex items-center justify-center body-16-b"
                  style={{ color: "var(--color-fg-medium)" }}
                >
                  {alarm.time}
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/mypage/timepicker")}
                >
                  <RightIcon className='text-gray-500' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ChikaAlram;