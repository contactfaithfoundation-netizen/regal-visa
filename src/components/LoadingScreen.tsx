import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 1200,
}) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Preload the primary hero images & fonts
    const heroImageUrls = [
      'https://res.cloudinary.com/dacyy7rkn/image/upload/v1792480449/image_tqqmok.avif',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=85&w=2560&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2560&auto=format&fit=crop',
    ];

    const preloadPromises = heroImageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      });
    });

    const minTimerPromise = new Promise<void>((resolve) => {
      setTimeout(resolve, minDurationMs);
    });

    Promise.all([...preloadPromises, minTimerPromise]).then(() => {
      setIsFinished(true);
      if (onComplete) {
        onComplete();
      }
    });
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="initial-loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white pointer-events-auto"
        >
          {/* Subtle ambient luxury glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,78,216,0.04)_0%,transparent_70%)] pointer-events-none" />

          {/* Centered Logo Container with smooth scale & fade breathing animation */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              }}
              className="relative"
            >
              <img
                src="https://res.cloudinary.com/dacyy7rkn/image/upload/v1792480449/image_tqqmok.avif"
                alt="Regal Visa Solutions"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain select-none drop-shadow-sm"
                loading="eager"
                decoding="sync"
              />
            </motion.div>

            {/* Elegant minimalist hairline loader */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: 1,
                width: 72,
                transition: { delay: 0.2, duration: 0.4 },
              }}
              className="mt-6 h-[2.5px] rounded-full bg-slate-100 overflow-hidden"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: 'easeInOut',
                }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#1D4ED8] to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
