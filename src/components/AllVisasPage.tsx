import React, { useState, useEffect } from 'react';
import { PillHeader } from './PillHeader';
import { ExploreEventsSection } from './ExploreEventsSection';
import { FaqSection } from './FaqSection';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';

interface AllVisasPageProps {
  onBackToHome: () => void;
  onSelectCountry: (country: string) => void;
  onOpenVisaModal: () => void;
  onNavigateToBlogs: () => void;
  onNavigateToVisas?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToProcess?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToContact?: () => void;
}

export const AllVisasPage: React.FC<AllVisasPageProps> = ({
  onBackToHome,
  onSelectCountry,
  onOpenVisaModal,
  onNavigateToBlogs,
  onNavigateToVisas,
  onNavigateToServices,
  onNavigateToProcess,
  onNavigateToAbout,
  onNavigateToContact,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900 select-none">
      {/* Floating PillHeader with working sandwich menu & call directory */}
      <PillHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={setIsMenuOpen}
        isCallOpen={isCallOpen}
        onToggleCall={setIsCallOpen}
        onResetToHero={onBackToHome}
        onOpenVisaModal={onOpenVisaModal}
        onNavigateToExplore={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToVisas={onNavigateToVisas || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
        onNavigateToServices={onNavigateToServices}
        onNavigateToProcess={onNavigateToProcess}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
        isVisasPage={true}
      />

      {/* Main Container: Explore Visas Whole Section with appropriate top padding for floating header */}
      <main className="pt-24 sm:pt-32 bg-white">
        {/* Whole Explore & Events Visa Section */}
        <ExploreEventsSection onSelectCountry={onSelectCountry} />

        {/* FAQs Underneath (same as FAQ of home page) */}
        <section className="border-t border-neutral-100 bg-white">
          <FaqSection />
        </section>

        {/* Footer & CTA */}
        <SecondaryCtaBanner
          onOpenVisaModal={onOpenVisaModal}
          onNavigateHome={onBackToHome}
          onNavigateToBlogs={onNavigateToBlogs}
        />
      </main>
    </div>
  );
};
