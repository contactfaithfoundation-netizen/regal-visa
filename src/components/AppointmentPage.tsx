import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  FileCheck2,
  Building2,
  MapPin,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Briefcase,
  Users,
  Compass,
  Laptop,
} from 'lucide-react';
import { PillHeader } from './PillHeader';
import { FaqSection } from './FaqSection';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';

export type AppointmentType = 'visit' | 'business';

interface AppointmentData {
  type: AppointmentType;
  title: string;
  badge: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  centres: string[];
  features: { title: string; desc: string }[];
  steps: { step: string; title: string; desc: string }[];
  documents: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

const APPOINTMENT_CONFIGS: Record<AppointmentType, AppointmentData> = {
  visit: {
    type: 'visit',
    title: 'Visit Visa Appointment',
    badge: 'Priority Consular & Biometric Booking',
    subtitle: 'Fast-track biometric slot scheduling for tourist, family & general visit applications.',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85',
    overview:
      'We coordinate urgent biometric interview and fingerprinting submission appointments across official diplomatic centers including VFS Global, Gerry’s Visa Centers, BLS International, TLScontact, and US Consulates in Islamabad, Lahore, and Karachi.',
    centres: ['VFS Global (Islamabad, Lahore, Karachi)', 'Gerry’s Visa Drop Box', 'BLS International (Spain)', 'TLScontact (UK / Europe)', 'US Embassy Islamabad & Karachi'],
    features: [
      { title: 'Immediate Slot Monitoring', desc: 'Continuous 24/7 scanning for released cancellation dates and emergency consular biometric slots.' },
      { title: 'Document Dossier Pre-Audit', desc: 'Full review of appointment submission forms, passport bio-data, and sponsor invitations before center attendance.' },
      { title: 'Biometric Day Briefing', desc: 'Personalized instructions on required original documents, token collection, and center protocol.' },
    ],
    steps: [
      { step: 'Step 1', title: 'Submit Booking Request', desc: 'Share your destination country, visa category, and target travel dates.' },
      { step: 'Step 2', title: 'Slot Lock & Date Matching', desc: 'Our consular desk reserves the earliest available slot matching your timeline.' },
      { step: 'Step 3', title: 'Biometric Appointment Letter', desc: 'Receive your official appointment letter with appointment barcoded confirmation.' },
      { step: 'Step 4', title: 'Center Attendance & Submission', desc: 'Attend the center in Islamabad, Lahore, or Karachi for fingerprint capture and submission.' },
    ],
    documents: [
      { title: 'Original Valid Passport', desc: 'Minimum 6 months validity with at least 2 blank visa endorsement pages.' },
      { title: 'Appointment Confirmation Slip', desc: 'Official printed confirmation letter issued by the biometric facilitation partner.' },
      { title: 'Completed Visa Application Form', desc: 'Signed consular application dossier matching your passport credentials.' },
      { title: 'Passport-Sized Photographs', desc: 'ICAO standard biometric photos on pure white background (35mm x 45mm).' },
    ],
    faqs: [
      {
        question: 'How quickly can a visit visa appointment be secured?',
        answer: 'Depending on the target mission (e.g., UKVI, Schengen, or US Consular), urgent expedited slots can often be secured within 48 to 72 hours through official consular cancellation monitoring.',
      },
      {
        question: 'Which cities can I attend for biometric appointments in Pakistan?',
        answer: 'Appointments are routinely arranged in Islamabad, Lahore, and Karachi at accredited centers like VFS Global, Gerry’s, and diplomatic missions.',
      },
      {
        question: 'Do all family members need individual appointments?',
        answer: 'Yes, every applicant including infants and minors must have a confirmed individual biometric token and slot reservation.',
      },
    ],
  },
  business: {
    type: 'business',
    title: 'Business Visa Appointment',
    badge: 'Business Appointment Booking',
    subtitle: 'Priority biometric & consular interview scheduling for trade delegations, executives & founders.',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85',
    overview:
      'Executive-tier appointment securing for business founders, corporate executives, and trade delegates traveling for exhibitions, commercial negotiations, or corporate conferences across Europe, North America, UK, and East Asia.',
    centres: ['VFS Global Executive Lounge', 'US Commercial & B1/B2 Interview Desk', 'Gerry’s Premium Lounge', 'Chamber of Commerce Facilitated Desks'],
    features: [
      { title: 'Corporate Invitation Verification', desc: 'Validation of foreign corporate host letters, Chamber of Commerce credentials, and TE codes.' },
      { title: 'Executive Priority Slots', desc: 'Arrangement of premium lounge biometric slots and urgent commercial mission scheduling.' },
      { title: 'Mock Interview Briefing', desc: 'Comprehensive briefing for embassy interviews focusing on commercial rationale and company financial standing.' },
    ],
    steps: [
      { step: 'Step 1', title: 'Corporate Dossier Review', desc: 'Audit of business registration (SECP/NTN), company bank statements, and formal host invitation.' },
      { step: 'Step 2', title: 'Priority Biometric Allocation', desc: 'Immediate reservation of priority or premium corporate biometric appointment.' },
      { step: 'Step 3', title: 'Executive Dossier Packet', desc: 'Compilation of fully indexed application dossier with company resolution letter.' },
      { step: 'Step 4', title: 'Submission & Fast-Track Processing', desc: 'Expedited processing with real-time tracking until passport collection.' },
    ],
    documents: [
      { title: 'Official Foreign Invitation Letter', desc: 'Signed company invitation stating the commercial agenda, conference, or fair attendance.' },
      { title: 'Company NTN & SECP / Chamber Certificate', desc: 'Proof of commercial activity and Pakistani enterprise standing.' },
      { title: 'Corporate Bank Statements (6 Months)', desc: 'Official bank turnover with bank maintenance letter and auditor verification.' },
      { title: 'Original Valid Passport', desc: 'Machine-readable passport with minimum 6 months validity.' },
    ],
    faqs: [
      {
        question: 'Can business appointments be expedited for urgent trade fairs?',
        answer: 'Yes, official business delegations presenting verified exhibition passes, TE invitations, or corporate letters can qualify for fast-track business appointment allocations.',
      },
      {
        question: 'Is premium lounge booking available at visa centers?',
        answer: 'Yes, premium lounge biometric access can be arranged at VFS Global and Gerry’s in Islamabad, Lahore, and Karachi for executive privacy.',
      },
      {
        question: 'Do you assist with commercial Chamber of Commerce letters?',
        answer: 'Yes, our corporate advisory desk drafts and formats Chamber endorsement requests and employer sponsorship letters compliant with embassy mandates.',
      },
    ],
  },
};

interface AppointmentPageProps {
  type: AppointmentType;
  onBackToHome: () => void;
  onOpenVisaModal: () => void;
  onNavigateToVisas?: () => void;
  onNavigateToBlogs?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToProcess?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToContact?: () => void;
  onSelectAppointmentType?: (type: AppointmentType) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({
  type,
  onBackToHome,
  onOpenVisaModal,
  onNavigateToVisas,
  onNavigateToBlogs,
  onNavigateToServices,
  onNavigateToProcess,
  onNavigateToAbout,
  onNavigateToContact,
  onSelectAppointmentType,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [city, setCity] = useState('Lahore');
  const [submitted, setSubmitted] = useState(false);

  const data = APPOINTMENT_CONFIGS[type] || APPOINTMENT_CONFIGS.visit;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [type]);

  const waInquiryUrl = `https://wa.me/923224252883?text=${encodeURIComponent(
    `Hello RegalVisa Solutions, I want to book a ${data.title} for my visa application. Please guide me with slot availability.`
  )}`;

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setIsLeadModalOpen(false);
      setSubmitted(false);
      setName('');
      setPhone('');
      setDestination('');
    }, 2500);
  };

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
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
        onNavigateToAppointments={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Main Content */}
      <main className="pt-24 sm:pt-32 pb-20 px-4 sm:px-8 xl:px-14 max-w-[1340px] mx-auto font-sans">
        {/* Top Breadcrumb & Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#2563EB] transition-colors cursor-pointer"
          >
            ← Back to Home
          </button>

          {/* Quick Switch between Visit and Business Appointment */}
          <div className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => onSelectAppointmentType && onSelectAppointmentType('visit')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                type === 'visit'
                  ? 'bg-[#1C232D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visit Appointment
            </button>
            <button
              type="button"
              onClick={() => onSelectAppointmentType && onSelectAppointmentType('business')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                type === 'business'
                  ? 'bg-[#1C232D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Business Appointment
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-[26px] sm:rounded-[32px] overflow-hidden min-h-[300px] sm:min-h-[380px] flex items-center justify-center p-6 sm:p-12 mb-12 shadow-sm bg-neutral-900">
          <img
            src={data.heroImage}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35 pointer-events-none" />

          <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {data.title}
            </h1>

            <div className="flex items-center justify-center gap-2.5 mt-6 w-full">
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] sm:text-xs font-bold tracking-tight shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Book Appointment</span>
              </button>
              <a
                href={waInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-[11px] sm:text-xs font-bold tracking-tight shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (8 cols): Relevant Details only */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview & Mission */}
            <section className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  Appointment Protocol &amp; Coverage
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {data.overview}
              </p>

              {/* Supported Centers Pills */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-2.5">
                  Authorized Facilitation Centers:
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.centres.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#1C232D] shadow-2xs"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Advantages */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                Why Book Through Our Appointment Desk?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-2 shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#1C232D] flex items-center justify-center text-xs font-bold">
                      0{idx + 1}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">{feat.title}</h3>
                    <p className="text-[11.5px] text-[#64748B] leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Step-by-Step Scheduling Process */}
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                Appointment Booking Process
              </h2>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#CBD5E1] space-y-6 ml-2">
                {data.steps.map((st, i) => (
                  <div key={i} className="relative">
                    <div className="w-3 h-3 rounded-full bg-[#1C232D] ring-4 ring-slate-100 absolute -left-[31px] sm:-left-[39px] top-1.5 shadow-xs" />
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
                      <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">
                        {st.step}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">{st.title}</h3>
                      <p className="text-[11.5px] text-[#64748B] leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mandatory Biometric Day Checklist */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#2563EB]" />
                Documents Required on Appointment Day
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A]">{doc.title}</h4>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="space-y-4 pt-4 border-t border-[#E2E8F0]">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2563EB]" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {data.faqs.map((f, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">{f.question}</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (4 cols): Sticky Quick Booking Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div className="rounded-3xl bg-white border border-[#CBD5E1] p-6 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#2563EB]">
                  Fast-Track Scheduling
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] mt-0.5">
                  Book Your Appointment
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Guaranteed slot lock for Pakistani applicants in Islamabad, Lahore &amp; Karachi.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#475569]">
                  <span>Category:</span>
                  <span className="font-bold text-[#0F172A] capitalize">{type} Appointment</span>
                </div>
                <div className="flex justify-between items-center text-[#475569]">
                  <span>Pricing:</span>
                  <span className="font-bold text-[#0F172A]">Price on call</span>
                </div>
                <div className="flex justify-between items-center text-[#475569]">
                  <span>Confirmation:</span>
                  <span className="font-bold text-[#10B981]">Instant Receipt</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-full bg-[#1C232D] hover:bg-[#141A22] text-white text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Earliest Date</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={waInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Direct WhatsApp Helpline</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {isLeadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLeadModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10"
            >
              <h3 className="text-lg font-extrabold text-[#0F172A]">
                Reserve {data.title}
              </h3>
              <p className="text-xs text-[#64748B] mt-1 mb-5">
                Our specialized booking desk will confirm slot availability within 30 minutes.
              </p>

              {submitted ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#10B981] mx-auto animate-bounce" />
                  <h4 className="text-sm font-bold text-[#0F172A]">Inquiry Submitted!</h4>
                  <p className="text-xs text-[#64748B]">
                    A consular caseworker is checking open slots for your request.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[#0F172A] font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Usman"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0F172A] font-bold mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0321-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0F172A] font-bold mb-1">Destination Country *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UK, USA, Germany, Italy"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0F172A] font-bold mb-1">Preferred City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#2563EB] bg-white"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Karachi">Karachi</option>
                    </select>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsLeadModalOpen(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold cursor-pointer hover:bg-[#1D4ED8]"
                    >
                      Confirm Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <SecondaryCtaBanner
        onOpenVisaModal={onOpenVisaModal}
        onNavigateHome={onBackToHome}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToServices={onNavigateToServices}
        onNavigateToProcess={onNavigateToProcess}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
        onNavigateToAppointments={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
};

export default AppointmentPage;
