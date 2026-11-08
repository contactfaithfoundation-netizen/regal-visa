import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Globe2,
  Building,
  Scale,
  Sparkles,
  PhoneCall,
  Briefcase,
  History,
  Target,
  FileCheck2,
} from 'lucide-react';
import { PillHeader } from './PillHeader';
import { LiveCounterStripe } from './LiveCounterStripe';
import { FaqSection } from './FaqSection';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';
import { ReadyToBeginCard } from './ReadyToBeginCard';

interface AboutPageProps {
  onBackToHome: () => void;
  onOpenVisaModal: () => void;
  onNavigateToVisas?: () => void;
  onNavigateToBlogs?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToProcess?: () => void;
  onNavigateToContact?: () => void;
}

const MILESTONES = [
  { year: '2014', title: 'Founded in Lahore & Islamabad', desc: 'Started as a boutique immigration and student visa advisory for Pakistani professionals.' },
  { year: '2017', title: 'Consular Pre-Clearance Framework', desc: 'Pioneered our proprietary 12-point forensic document audit system, reducing client refusal rates to under 3%.' },
  { year: '2020', title: 'Digital eVisa Platform Launch', desc: 'Automated digital submissions across GCC, Malaysia, and Türkiye, delivering grants directly to WhatsApp.' },
  { year: '2023', title: 'European & US Appeals Desk', desc: 'Established specialized administrative review and Section 214(b) refusal overturn legal desk.' },
  { year: '2026', title: '14,000+ Visas Delivered', desc: 'Over PKR 1.2B in verified funds audited, servicing travellers, families, and corporations nationwide.' },
];

const CORE_VALUES = [
  {
    title: 'Absolute Paperwork Forensics',
    desc: 'Visas are won or lost on paper. We treat every bank statement, tax slip, and cover letter like a formal court submission.',
    icon: Scale,
  },
  {
    title: 'Zero False Promises',
    desc: 'If your profile has genuine deficiencies, we tell you frankly and fix them first—rather than risking a permanent consular rejection stamp.',
    icon: ShieldCheck,
  },
  {
    title: 'Direct Caseworker Accountability',
    desc: 'You work directly with an assigned senior visa officer who knows your family, business, and travel timeline intimately.',
    icon: Users,
  },
  {
    title: 'End-to-End Clearance Guarantee',
    desc: 'From initial document scan to international boarding gate clearance, we stand by you 24/7 until you cross the border.',
    icon: Award,
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onOpenVisaModal,
  onNavigateToVisas,
  onNavigateToBlogs,
  onNavigateToServices,
  onNavigateToProcess,
  onNavigateToContact,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900 select-none">
      {/* Floating PillHeader */}
      <PillHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={setIsMenuOpen}
        isCallOpen={isCallOpen}
        onToggleCall={setIsCallOpen}
        onResetToHero={onBackToHome}
        onOpenVisaModal={onOpenVisaModal}
        onNavigateToExplore={onNavigateToVisas}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToServices={onNavigateToServices}
        onNavigateToProcess={onNavigateToProcess}
        onNavigateToAbout={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToContact={onNavigateToContact}
      />

      {/* Hero Header */}
      <header className="pt-28 sm:pt-36 pb-12 px-4 sm:px-8 xl:px-14 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>ESTABLISHED 2014 • PAKISTAN’S PREMIER VISA DESK</span>
          </div>

          <div className="relative flex flex-col items-center justify-center mb-6 sm:mb-8 text-center select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />
            <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase">
              ABOUT US
            </span>
            <h1 className="relative font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0F172A] leading-tight select-none">
              Engineering Approval For <span className="text-[#2563EB]">Pakistani Passport Holders</span>
            </h1>
            <div className="w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5" />
          </div>

          <p className="text-base sm:text-lg text-[#64748B] max-w-3xl leading-relaxed">
            Pakistani travellers routinely face rigorous scrutiny at foreign consulates. Most rejections are not caused by applicant background, but by flawed paperwork, unverified flight PNRs, and misunderstood tax statements. Regal Visa Solutions was built to solve this exact bottleneck.
          </p>
        </div>
      </header>

      {/* Live Counter Stripe */}
      <section className="w-full bg-white border-y border-neutral-100 py-2">
        <LiveCounterStripe />
      </section>

      {/* Our Mission & Philosophy Two Column Layout */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 xl:px-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
              OUR MISSION
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
              Transforming Complex Consular Red Tape Into Effortless Approvals
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Applying for an international visa on a Pakistani passport can be daunting. Strict financial checks, fluctuating embassy policies, and confusing form requirements often lead to avoidable rejections.
            </p>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              At Regal Visa Solutions, our team of former consular caseworkers, legal drafters, and financial analysts rigorously cross-checks every single page. We verify your bank statements, confirm genuine flight and hotel reservations, and draft bulletproof cover letters that address consular concerns before they arise.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>Zero Fake Documents Policy</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>FBR Tax Cross-Matching</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>100% Genuine GDS PNRs</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-2xl bg-[#1C232D] text-white flex items-center justify-center font-bold">
                  99.4%
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Overall Consular Clearance Rate
                  </h3>
                  <p className="text-xs text-[#64748B]">Across 14,200+ lodged applications</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                    <span>eVisa Fast-Track (GCC / ASEAN / Türkiye)</span>
                    <span className="text-[#059669]">99.8%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div className="h-full bg-[#059669] rounded-full w-[99.8%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                    <span>Schengen &amp; European Embassy Files</span>
                    <span className="text-[#2563EB]">96.4%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div className="h-full bg-[#2563EB] rounded-full w-[96.4%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                    <span>UK, USA &amp; Canada Visitor Filings</span>
                    <span className="text-[#2563EB]">94.8%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div className="h-full bg-[#2563EB] rounded-full w-[94.8%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                    <span>Refusal Overturn Appeals</span>
                    <span className="text-[#D97706]">88.6%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div className="h-full bg-[#D97706] rounded-full w-[88.6%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 px-4 sm:px-8 xl:px-14 max-w-7xl mx-auto bg-[#F8FAFC] rounded-3xl border border-[#E2E8F0] mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            THE REGAL STANDARD
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1">
            Built On Uncompromising Integrity
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2">
            We don’t cut corners. We believe Pakistani applicants deserve the highest quality legal preparation available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">{val.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-8 px-4 sm:px-8 xl:px-14 max-w-5xl mx-auto mb-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            OUR HISTORY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1">
            A Decade of Consular Milestones
          </h2>
        </div>

        <div className="space-y-6">
          {MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-xs"
            >
              <div className="px-3.5 py-1.5 rounded-xl bg-[#1C232D] text-white text-xs font-black shrink-0">
                {m.year}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-[#0F172A]">{m.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ready To Begin Callout */}
      <ReadyToBeginCard
        onOpenVisaModal={onOpenVisaModal}
        onNavigateToExplore={onNavigateToVisas}
      />

      {/* FAQs */}
      <section className="border-t border-neutral-100 bg-white">
        <FaqSection />
      </section>

      {/* Footer */}
      <SecondaryCtaBanner
        onOpenVisaModal={onOpenVisaModal}
        onNavigateHome={onBackToHome}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToServices={onNavigateToServices}
        onNavigateToProcess={onNavigateToProcess}
        onNavigateToAbout={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToContact={onNavigateToContact}
      />
    </div>
  );
};
export default AboutPage;