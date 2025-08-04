import { useEffect, useState } from "react";
import { TIPS } from "@/constants/tips";

interface BrushingTipProps {
  isPlaying: boolean;
}

const BrushingTip = ({ isPlaying }: BrushingTipProps) => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTipIndex((prevTip) => {
        let next;
        do {
          next = Math.floor(Math.random() * TIPS.length);
        } while (next === prevTip);
        return next;
      });
    }, 10000); // 10초 간격

    return () => clearInterval(interval);
  }, [isPlaying]);

  // 마침표 기준으로 문장 나누고, 공백 trim + 빈 문자열 제외
  const sentences = TIPS[tipIndex]
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <div className="absolute bottom-[42px] w-full text-center z-20">
      <div className="text-center body-16-eb text-fg-gray-strong z-9999">
        <div>TIP:</div>
        {sentences.map((line, idx) => (
          <div key={idx}>{line}.</div>
        ))}
      </div>
    </div>
  );
};

export default BrushingTip;
