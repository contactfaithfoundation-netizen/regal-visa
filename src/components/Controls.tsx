import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TransitionDirection } from '../types';

interface ControlsProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  isAnimating: boolean;
  direction?: TransitionDirection;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  isAnimating,
  direction = 'next',
  isPaused,
  onTogglePause,
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <div className="flex items-center gap-4 sm:gap-6 mt-6 pr-6 md:pr-14 select-none">
      {/* Prev / Next Buttons */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Prev Button */}
        <button
          onClick={onPrev}
          disabled={isAnimating}
          aria-label="Previous Slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/35 flex items-center justify-center text-white/90 hover:border-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group shadow-md"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={isAnimating}
          aria-label="Next Slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/35 flex items-center justify-center text-white/90 hover:border-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group shadow-md"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Optional quick pause/play toggle */}
        <button
          onClick={onTogglePause}
          title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
          aria-label="Toggle auto-play"
          className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/5 transition hidden sm:flex text-xs"
        >
          {isPaused ? <Play className="w-2.5 h-2.5 fill-white" /> : <Pause className="w-2.5 h-2.5" />}
        </button>
      </div>

      {/* Progress Line */}
      <div className="flex-1 h-[1px] bg-white/25 relative overflow-hidden rounded-full">
        <div
          className="h-[2px] bg-[#2563EB] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(37,99,235,0.7)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Animated Slide Counter */}
      <div className="relative h-9 sm:h-11 w-12 sm:w-14 overflow-hidden flex items-center justify-end">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentFormatted}
            initial={{
              y: direction === 'next' ? 30 : -30,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: direction === 'next' ? -30 : 30,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wider text-right tabular-nums drop-shadow-md select-none"
          >
            {currentFormatted}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
