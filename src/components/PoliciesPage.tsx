import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, ArrowLeft, Lock, RefreshCcw, AlertCircle, CheckCircle2, Scale } from 'lucide-react';
import { PillHeader } from './PillHeader';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';

export type PolicyTab = 'terms' | 'privacy' | 'refund' | 'disclaimer';

interface PoliciesPageProps {
  initialTab?: PolicyTab;
  onBackToHome: () => void;
  onOpenVisaModal: () => void;
  onNavigateToVisas?: () => void;
  onNavigateToBlogs?: () => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({
  initialTab = 'terms',
  onBackToHome,
  onOpenVisaModal,
  onNavigateToVisas,
  onNavigateToBlogs,
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

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
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToVisas={onNavigateToVisas}
      />

      {/* Main Container */}
      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-8 xl:px-14 max-w-[1240px] mx-auto font-sans">
        {/* Back Link */}
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#1D4ED8] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Page Title & Eyebrow */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal, Compliance & Client Protections</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            Policies, Terms & Consular Regulations
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#64748B] max-w-2xl">
            Review the official terms of engagement, data privacy guarantees, refund regulations, and sovereign consular jurisdictional terms for Regal Visa Solutions.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#E2E8F0] mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'bg-slate-100 text-[#475569] hover:bg-slate-200 hover:text-[#0F172A]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'bg-slate-100 text-[#475569] hover:bg-slate-200 hover:text-[#0F172A]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('refund')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'refund'
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'bg-slate-100 text-[#475569] hover:bg-slate-200 hover:text-[#0F172A]'
            }`}
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Refund & Cancellation Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disclaimer')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'disclaimer'
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'bg-slate-100 text-[#475569] hover:bg-slate-200 hover:text-[#0F172A]'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Consular Disclaimer</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm leading-relaxed text-[#334155] space-y-6">
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                  Terms & Conditions of Service
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1">Last Updated: March 2026</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
                  1. Scope of Advisory Services
                </h3>
                <p className="text-sm">
                  Regal Visa Solutions provides professional document pre-clearance, eligibility audits, consular filing preparation, biometric appointment scheduling, and travel advisory for Pakistani citizens and international residents.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
                  2. Accuracy & Authenticity of Information
                </h3>
                <p className="text-sm">
                  The client represents and warrants that all documentation submitted—including bank statements, tax returns (FBR), employment letters, property certificates, and identity documents—is authentic, unaltered, and verifiable. Regal Visa Solutions strictly refuses to handle forged or fabricated documents.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
                  3. Case Officer Assignment & Turnaround Times
                </h3>
                <p className="text-sm">
                  Upon retainer, clients are assigned a dedicated consular case officer. Review times vary by visa stream (e.g., standard tourist audits: 24–48 hours; comprehensive appeal files: 3–5 working days). Processing timelines at sovereign embassies (e.g., US State Department, UKVI, VFS, Gerry’s) remain outside our direct control.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                  Privacy Policy & Confidentiality
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1">Last Updated: March 2026</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#1D4ED8]" />
                  1. Data Collection & Secure Handling
                </h3>
                <p className="text-sm">
                  We collect strictly necessary personal information to process your visa assessment: passport biodata, CNIC details, family composition, travel itinerary, and financial declarations. All files are handled under strict end-to-end encryption.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#1D4ED8]" />
                  2. Non-Disclosure & Third-Party Protections
                </h3>
                <p className="text-sm">
                  We never sell, rent, or monetize client data. Your documentation is transmitted exclusively to authorized consular portals, official application centers (e.g., VFS Global, Gerry&apos;s, TLScontact, BLS), or designated embassy portals with your explicit consent.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#1D4ED8]" />
                  3. Document Archival & Right to Erasure
                </h3>
                <p className="text-sm">
                  Upon completion of your visa processing cycle and consular clearance, clients may request the immediate purging of all uploaded digital attachments from our secure database by writing to our compliance officer.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                  Refund & Cancellation Policy
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1">Last Updated: March 2026</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4 text-[#1D4ED8]" />
                  1. Sovereign Embassy Fees Non-Refundable
                </h3>
                <p className="text-sm">
                  All government consular filing fees, embassy visa fees, biometric charges, and visa center service fees paid directly to foreign governments are non-refundable by those sovereign bodies under all circumstances.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4 text-[#1D4ED8]" />
                  2. Advisory & Clearance Fee Refunds
                </h3>
                <p className="text-sm">
                  If an application is cancelled by the client prior to file audit commencement, a full 100% refund of advisory fees is remitted within 5 working days. If file drafting and tax validation have commenced, a prorated administrative fee applies.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4 text-[#1D4ED8]" />
                  3. Remonstrance & Re-Application Guarantee
                </h3>
                <p className="text-sm">
                  In the rare event of a consular refusal on an application cleared by our senior officers, Regal Visa Solutions drafts your official Remonstrance appeal or second submission file without additional consultancy charges.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                  Consular Authority & Sovereign Disclaimer
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1">Last Updated: March 2026</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#1D4ED8]" />
                  1. Independent Advisory Status
                </h3>
                <p className="text-sm">
                  Regal Visa Solutions is an independent private consultancy specializing in consular documentation, tax verification, and visa case preparation. We are not a government embassy or consular diplomatic mission.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#1D4ED8]" />
                  2. Final Decision by Sovereign Visa Officers
                </h3>
                <p className="text-sm">
                  While our document compliance protocols achieve industry-leading clearance rates, the issuance and grant of entry clearance, visas, or residence permits is the sole sovereign prerogative of the respective foreign embassy or immigration department. No agency can legally guarantee embassy decisions.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <SecondaryCtaBanner
        onOpenVisaModal={onOpenVisaModal}
        onNavigateHome={onBackToHome}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToBlogs={onNavigateToBlogs}
      />
    </div>
  );
};

export default PoliciesPage;
