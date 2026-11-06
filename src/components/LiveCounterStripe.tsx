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
          observer.disconnect();
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
    let lastRenderTime = 0;
    const duration = 1600;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (currentTime - lastRenderTime >= 15 || progress === 1) {
        lastRenderTime = currentTime;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setApprovalCount(easeProgress * 98.4);
        setVisasCount(Math.floor(easeProgress * 12000));
      }

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
      className="w-full bg-white text-neutral-900 pt-2 sm:pt-4 pb-10 sm:pb-14 px-4 sm:px-8 select-none"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        {/* Stat 1: 98.4% Approval Rate */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1 sm:px-4">
          <div className="flex items-baseline justify-center tracking-tight leading-none whitespace-nowrap">
            <span className="font-sans font-bold text-neutral-950 tabular-nums text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {approvalCount.toFixed(1)}
            </span>
            <span className="font-sans font-bold text-[#2563EB] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl ml-0.5 sm:ml-1">
              %
            </span>
          </div>
          <span className="font-sans text-neutral-500 font-normal text-[11px] xs:text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2.5 leading-tight whitespace-nowrap">
            Approval Rate
          </span>
        </div>

        {/* Thin Vertical Divider */}
        <div className="w-[1px] h-10 sm:h-14 md:h-16 bg-neutral-200/90 shrink-0" />

        {/* Stat 2: 12,000+ Visas Processed */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1 sm:px-4">
          <div className="flex items-baseline justify-center tracking-tight leading-none whitespace-nowrap">
            <span className="font-sans font-bold text-neutral-950 tabular-nums text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {visasCount.toLocaleString()}
            </span>
            <span className="font-sans font-bold text-[#2563EB] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl ml-0.5 sm:ml-1">
              +
            </span>
          </div>
          <span className="font-sans text-neutral-500 font-normal text-[11px] xs:text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2.5 leading-tight whitespace-nowrap">
            Visas Processed
          </span>
        </div>

        {/* Thin Vertical Divider */}
        <div className="w-[1px] h-10 sm:h-14 md:h-16 bg-neutral-200/90 shrink-0" />

        {/* Stat 3: 24/7 Dedicated Case Officer */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1 sm:px-4">
          <div className="flex items-baseline justify-center tracking-tight leading-none whitespace-nowrap">
            <span className="font-sans font-bold text-neutral-950 tabular-nums text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              24
            </span>
            <span className="font-sans font-bold text-[#2563EB] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl ml-0.5 sm:ml-1">
              /7
            </span>
          </div>
          <span className="font-sans text-neutral-500 font-normal text-[11px] xs:text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2.5 leading-tight whitespace-nowrap">
            Dedicated Case Officer
          </span>
        </div>
      </div>
    </div>
  );
};
