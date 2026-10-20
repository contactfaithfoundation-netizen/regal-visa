import React from 'react';
import { motion } from 'motion/react';
import { Slide } from '../types';

interface CardCarouselProps {
  queue: Slide[];
  firstCardRef: React.RefObject<HTMLDivElement | null>;
  onCardClick: (index: number) => void;
  isAnimating: boolean;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  queue,
  firstCardRef,
  onCardClick,
  isAnimating,
}) => {
  return (
    <div className="w-full relative overflow-visible select-none py-2">
      <div className="flex gap-4 md:gap-5 items-center">
        {queue.map((slide, index) => {
          const isFirst = index === 0;

          return (
            <motion.div
              key={slide.id}
              layout="position"
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              ref={isFirst ? firstCardRef : undefined}
              onClick={() => !isAnimating && onCardClick(index)}
              className="w-[160px] h-[230px] sm:w-[190px] sm:h-[280px] xl:w-[210px] xl:h-[310px] rounded-2xl overflow-hidden relative shrink-0 shadow-[0_20px_40px_rgba(0,0,0,0.45)] cursor-pointer group transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            >
              {/* Card Image */}
              <img
                src={slide.image}
                alt={slide.title.replace('\n', ' ')}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                loading="eager"
              />

              {/* Glass Rim Border */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/50 transition-colors pointer-events-none" />

              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Card Content Overlay (Bottom-Left) */}
              <div className="absolute bottom-0 left-0 p-3.5 sm:p-4 w-full z-10 flex flex-col justify-end pointer-events-none">
                {/* Short white line */}
                <div className="w-3 h-[1.5px] bg-white/80 mb-1.5 transition-all duration-300 group-hover:w-5 group-hover:bg-[#2563EB]" />

                {/* Region text */}
                <div className="text-[10px] text-white/85 truncate font-medium tracking-wide mb-0.5">
                  {slide.region}
                </div>

                {/* Title text */}
                <h3 className="font-oswald text-base sm:text-lg xl:text-xl font-bold uppercase leading-[1.05] text-white whitespace-pre-line tracking-tight drop-shadow-md">
                  {slide.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
