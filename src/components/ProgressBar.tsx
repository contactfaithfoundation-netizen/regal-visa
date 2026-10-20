import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  slideKey: number | string;
  isPaused: boolean;
  duration?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  slideKey,
  isPaused,
  duration = 4.5,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full h-[4px] z-50 pointer-events-none bg-white/10 backdrop-blur-xs">
      <motion.div
        key={slideKey}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: duration,
          ease: 'linear',
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        className={`h-full bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.8)] ${
          isPaused ? 'opacity-70' : 'opacity-100'
        }`}
      />
    </div>
  );
};
