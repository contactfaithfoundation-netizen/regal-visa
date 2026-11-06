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
    <div className="fixed top-0 left-0 right-0 w-full h-[4px] z-50 pointer-events-none bg-white/10 backdrop-blur-xs overflow-hidden">
      <div
        key={slideKey}
        style={{
          transformOrigin: '0% 50%',
          animation: `progressBarFill ${duration}s linear forwards`,
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: 'transform',
        }}
        className={`h-full w-full bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.8)] transform-gpu origin-left transition-opacity duration-200 ${
          isPaused ? 'opacity-70' : 'opacity-100'
        }`}
      />
    </div>
  );
};
