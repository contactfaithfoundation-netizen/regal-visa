import React from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Slide } from '../types';

interface HeroContentProps {
  slide: Slide;
}

const childVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroContent: React.FC<HeroContentProps> = ({ slide }) => {
  return (
    <div className="w-full lg:w-[48%] pl-6 sm:pl-10 md:pl-16 pr-6 z-20 flex flex-col justify-center min-h-[45vh] lg:min-h-auto relative">
      <div className="grid grid-cols-1 grid-rows-1 w-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
              transition: {
                duration: 0.8,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
                delayChildren: 0.18,
                staggerChildren: 0.05,
              },
            }}
            exit={{
              opacity: 0,
              filter: 'blur(6px)',
              scale: 1.01,
              transition: { duration: 0.5, ease: [0.4, 0, 1, 1] },
            }}
            className="col-start-1 row-start-1 flex flex-col justify-center w-full"
          >
            {/* Decorative Line */}
            <motion.div variants={childVariants} className="w-6 h-[2px] bg-white/80 mb-3" />

            {/* Region Subtitle */}
            <motion.div
              variants={childVariants}
              className="text-sm md:text-lg font-medium text-white/90 mb-1 tracking-wide"
            >
              {slide.region}
            </motion.div>

            {/* Main Display Title */}
            <motion.h1
              variants={childVariants}
              className="font-oswald text-3xl sm:text-5xl xl:text-[84px] font-bold uppercase leading-[0.95] tracking-tight text-white whitespace-pre-line mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            >
              {slide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={childVariants}
              className="text-xs md:text-sm text-white/75 max-w-md leading-relaxed line-clamp-2 md:line-clamp-3"
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
