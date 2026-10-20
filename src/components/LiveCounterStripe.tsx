import React, { useState, useEffect, useRef } from 'react';

export const LiveCounterStripe: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [approvalCount, setApprovalCount] = useState(0);
  const [visasCount, setVisasCount] = useState(0);
  const stripeRef = useRef<HTMLDivElement>(null);

  // Trigger counter animation when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (stripeRef.current) {
      observer.observe(stripeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth count-up animation
  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 1600;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease out
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setApprovalCount(easeProgress * 98.4);
      setVisasCount(Math.floor(easeProgress * 12000));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setApprovalCount(98.4);
        setVisasCount(12000);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView]);

  return (
    <div
      ref={stripeRef}
      className="w-full bg-[#1C232D] text-white py-5 xs:py-6 sm:py-9 lg:py-11 px-3 xs:px-5 sm:px-10 lg:px-16 select-none rounded-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* 
          3 Stats in a Single Line across all viewports (grid-cols-3):
          - Centered alignment
          - Thinner, refined typography
          - Scaled down font size on mobile to fit onto a single line without wrapping
        */}
        <div className="grid grid-cols-3 gap-x-2 xs:gap-x-4 sm:gap-x-8 lg:gap-12 items-center">
          {/* Stat 1: 98.4% Approval Rate */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-semibold text-white text-[19px] xs:text-[23px] sm:text-4xl lg:text-[46px] xl:text-[52px] tracking-tight leading-none whitespace-nowrap">
              {approvalCount.toFixed(1)}%
            </span>
            <span className="font-sans font-medium text-white/75 text-[8px] xs:text-[9.5px] sm:text-[11px] lg:text-[12.5px] tracking-wider uppercase mt-1.5 sm:mt-2.5 leading-tight whitespace-nowrap">
              Approval Rate
            </span>
          </div>

          {/* Stat 2: 12,000+ Visas Processed */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-semibold text-white text-[19px] xs:text-[23px] sm:text-4xl lg:text-[46px] xl:text-[52px] tracking-tight leading-none whitespace-nowrap">
              {visasCount.toLocaleString()}+
            </span>
            <span className="font-sans font-medium text-white/75 text-[8px] xs:text-[9.5px] sm:text-[11px] lg:text-[12.5px] tracking-wider uppercase mt-1.5 sm:mt-2.5 leading-tight whitespace-nowrap">
              Visas Processed
            </span>
          </div>

          {/* Stat 3: 24/7 Dedicated Case Officer */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-semibold text-white text-[19px] xs:text-[23px] sm:text-4xl lg:text-[46px] xl:text-[52px] tracking-tight leading-none whitespace-nowrap">
              24/7
            </span>
            <span className="font-sans font-medium text-white/75 text-[8px] xs:text-[9.5px] sm:text-[11px] lg:text-[12.5px] tracking-wider uppercase mt-1.5 sm:mt-2.5 leading-tight whitespace-nowrap">
              Dedicated Case Officer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
