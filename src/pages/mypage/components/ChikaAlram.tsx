import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chevron_right_grey from "@/assets/icons/chevron_right_grey.svg";

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
        className="w-[320px] h-[188px] rounded-[8px] border-[2px] border-solid flex gap-2"
        style={{
          background: "var(--CoolGrey-10, #F5F7FA)",
          borderColor: "var(--CoolGrey-25, #DCE3E8)",
          opacity: 1,
          position: "relative",
          top: "14px",
          transform: "rotate(0deg)"
        }}
      >
        <div className="fixed w-[320px] h-[160px] top-[14px] gap-[8px] flex rotate-[0deg] opacity-[1] flex-col">
          {alarms.map((alarm) => (

            <div
              key={alarm.id}
              className="w-[320px] h-[48px] flex justify-between rotate-[0deg] opacity-[1] pt-[12px] pr-[20px] pb-[12px] pl-[20px]"
            >
              <span
                className="flex items-center justify-center"
                style={{
                  fontFamily: "NanumSquareRound, sans-serif",
                  fontWeight: 800,
                  fontStyle: "ExtraBold",
                  fontSize: "16px",
                  lineHeight: "22px",
                  letterSpacing: "-0.01em",
                  opacity: 1,
                  transform: "rotate(0deg)"
                }}
              >
                {alarm.label}
              </span>
              <div
                className="flex items-center gap-1"
                style={{
                  width: "72px",
                  height: "24px",
                  opacity: 1,
                  gap: "4px",
                  transform: "rotate(0deg)"
                }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{
                    fontFamily: "NanumSquareRound, sans-serif",
                    fontWeight: 700,
                    fontStyle: "Bold",
                    fontSize: "16px",
                    lineHeight: "19px",
                    letterSpacing: "-0.01em",
                    opacity: 1,
                    borderRadius: "4px",
                    color: "#BAC3CB",
                    transform: "rotate(0deg)"
                  }}
                >
                  {alarm.time}
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/TimePickerPage")}
                  style={{ background: "none", border: "none", padding: 0, margin: 0 }}
                >
                  <img
                    src={chevron_right_grey}
                    style={{
                      position: "relative",
                      top: "2px",
                      left: "9px",
                      opacity: 1,
                      transform: "rotate(0deg)"
                    }}
                  />
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
