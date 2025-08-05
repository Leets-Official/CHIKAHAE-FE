import { useEffect, useState } from 'react';
import { TIPS } from '@/constants/tips';
import { motion } from 'framer-motion';

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
    }, 10000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const sentences = TIPS[tipIndex]
    .split('.')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <div className='absolute bottom-[42px] w-full flex justify-center z-20'>
      <motion.div
        key={tipIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-[480px] min-w-[360px] px-4 py-2 text-center body-16-eb text-fg-gray-strong bg-bg-tertiary-gray/50'
      >
        <div>TIP:</div>
        {sentences.map((line, idx) => (
          <div key={idx}>{line}.</div>
        ))}
      </motion.div>
    </div>
  );
};

export default BrushingTip;
