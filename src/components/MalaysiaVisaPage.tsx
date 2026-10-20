import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Landmark,
  Sparkles,
  Wallet,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Search,
  CheckCircle2,
  ShieldCheck,
  BookX,
  Scale,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  FileText,
  Check,
  X,
  MessageCircle,
  Share2,
  HelpCircle,
  Send,
  Calendar,
  Plane,
  MapPin,
  User,
  Phone,
  FileCheck2,
  Info,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

interface MalaysiaVisaPageProps {
  onBackToHome?: () => void;
  onOpenVisaModal?: () => void;
}

interface ReviewItem {
  id: string;
  name: string;
  initials: string;
  country: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Jashanpreet Kaur',
    initials: 'JK',
    country: 'Malaysia',
    rating: 5,
    text: 'Seamless experience applying from Lahore! The documents verification team called me within 30 minutes of submission to verify my passport bio-data and bank statement. Got the official Malaysian eVisa approved exactly on schedule without visiting any consulate.',
    date: '18 Oct 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Ahsanul Awan',
    initials: 'AA',
    country: 'Malaysia',
    rating: 5,
    text: 'Highly recommended for Pakistani travelers visiting Kuala Lumpur for business or holiday. Zero embassy visits needed, transparent government fee breakdown, and instantaneous WhatsApp updates throughout the entire process.',
    date: '14 Oct 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Kamran Khan',
    initials: 'KK',
    country: 'Malaysia',
    rating: 5,
    text: 'Applied for 4 family members together. The real-time consular tracking gave complete peace of mind. Every eVisa barcode was verified at Islamabad airport immigration with zero hassle. Will definitely use for my next trip!',
    date: '9 Oct 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Zainab Tariq',
    initials: 'ZT',
    country: 'Malaysia',
    rating: 5,
    text: 'Super fast and completely professional service. I was stressed about my return flight ticket and hotel voucher requirements, but their senior visa officer guided me step-by-step. Approved in just 48 hours!',
    date: '5 Oct 2026',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Bilal Siddiqui',
    initials: 'BS',
    country: 'Malaysia',
    rating: 5,
    text: 'Best visa platform for Pakistan passport holders. Very clear pricing in PKR with no surprise charges. Received the high-res PDF eVisa on WhatsApp and email simultaneously.',
    date: '28 Sep 2026',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Fatima Noor',
    initials: 'FN',
    country: 'Malaysia',
    rating: 5,
    text: 'Traveled to Penang for a photography conference. The dedicated consular desk reviewed my photo dimensions so they complied with the Malaysian Immigration standards on the first try.',
    date: '21 Sep 2026',
    verified: true,
  },
];

interface FAQCategory {
  category: string;
  items: {
    question: string;
    answer: string;
  }[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    category: 'General Information',
    items: [
      {
        question: 'What is a Malaysia e-visa for Pakistani citizens?',
        answer: 'The Malaysia e-visa is an official digital entry clearance issued by the Immigration Department of Malaysia allowing Pakistani passport holders to enter and travel within Malaysia for tourism, business meetings, or social visits for up to 30 consecutive days.',
      },
      {
        question: 'Is the e-visa valid across all Malaysian territories including Sabah and Sarawak?',
        answer: 'Yes, the eVisa is valid for entry into Peninsular Malaysia as well as Sabah and Sarawak, subject to the local state immigration checks upon arrival at international border checkpoints.',
      },
      {
        question: 'Do I need to visit the Malaysian High Commission in Islamabad or Karachi?',
        answer: 'No. The entire process is 100% online. You do not need to attend an in-person interview, surrender your physical passport, or visit any consulate or VFS center.',
      },
    ],
  },
  {
    category: 'Eligibility & Requirements',
    items: [
      {
        question: 'What are the exact mandatory documents needed for Pakistan passport holders?',
        answer: 'You need: (1) Valid Pakistani Passport with minimum 6 months validity from intended entry date, (2) Recent digital passport-size photograph with white background, (3) Confirmed round-trip flight booking with PNR, (4) Confirmed hotel reservation or invitation letter, and (5) Bank statement showing sufficient funds (recommended PKR 300,000+ equivalent).',
      },
      {
        question: 'What are the photo specifications for Malaysia eVisa?',
        answer: 'The photo must be 35mm x 50mm, taken within the last 6 months against a pure plain white background, with no headgear (unless religious, where the face from forehead to chin must remain clearly visible) and neutral facial expression.',
      },
      {
        question: 'Can minors or children travel on their parent’s eVisa?',
        answer: 'No. Each applicant, including infants and children of all ages, must have their own valid individual passport and separate eVisa application with certified birth certificate copy.',
      },
    ],
  },
  {
    category: 'Application Process',
    items: [
      {
        question: 'How long does it take to process the Malaysia e-visa?',
        answer: 'Standard processing takes 2 to 3 business days from the moment your documents pass initial internal consular verification. Expedited queue applications can be processed in as fast as 24-36 hours.',
      },
      {
        question: 'How will I receive my approved eVisa?',
        answer: 'Once granted, your official e-visa is delivered directly to your registered email address as a high-resolution PDF document with cryptographic digital verification barcodes and QR codes, and also pushed via WhatsApp notification.',
      },
      {
        question: 'Do I need to print the eVisa in color?',
        answer: 'Yes. The Immigration Department of Malaysia requires Pakistani travelers to print the eVisa on a clean A4 sheet in color. You should keep this printout alongside your passport and boarding passes throughout your trip.',
      },
    ],
  },
  {
    category: 'Status Tracking',
    items: [
      {
        question: 'How can I track the live consular status of my application?',
        answer: 'You can check your status anytime using your Application Reference Number on our real-time tracker or directly through our automated WhatsApp bot, which sends live milestone alerts at every immigration review stage.',
      },
      {
        question: 'What do the status stages mean (Verification, Consular, Approved)?',
        answer: 'Verification means our visa case barristers are verifying document legibility and specs. Consular means your application has been securely transmitted to the Immigration Department of Malaysia server. Approved means your visa has been digitally generated and issued.',
      },
    ],
  },
  {
    category: 'Refunds, Rejections & Reapplications',
    items: [
      {
        question: 'Can I reapply if my Malaysia e-visa was previously refused?',
        answer: 'Yes. Our specialized refusal case officers will review your previous rejection notice, identify the exact deficiency (such as insufficient financial ties or mismatched itinerary), rectify the paperwork, and file a clean resubmission.',
      },
      {
        question: 'Is the government visa fee refundable in case of refusal?',
        answer: 'Government fees collected by the Immigration Department of Malaysia are strictly non-refundable once an application has been processed by the authorities. However, our internal processing fee is covered under our approval guarantee policy.',
      },
    ],
  },
  {
    category: 'Visa Extension & Overstays',
    items: [
      {
        question: 'Can I extend my 30-day tourist e-visa while in Malaysia?',
        answer: 'Tourist eVisas cannot typically be extended beyond 30 days except in documented emergency medical circumstances. To stay longer, travelers must exit the country before the 30-day validity expires.',
      },
      {
        question: 'What are the penalties for overstaying in Malaysia?',
        answer: 'Overstaying in Malaysia is a serious immigration violation resulting in heavy daily compound fines, mandatory detention, deportation, and potential multi-year blacklisting from entering all ASEAN nations.',
      },
    ],
  },
];

export const MalaysiaVisaPage: React.FC<MalaysiaVisaPageProps> = ({
  onBackToHome,
}) => {
  // Timeline toggle in Section A
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Reviews Carousel state
  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 3;
  const maxPages = Math.ceil(REVIEWS.length / reviewsPerPage);

  // FAQ states
  const [faqSearch, setFaqSearch] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'General Information': true,
    'Eligibility & Requirements': false,
  });

  // Interactive Checklist & Checkout Modals
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Checkout form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantPassport, setApplicantPassport] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);

  const toggleAccordion = (cat: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handleNextReview = () => {
    setReviewPage((prev) => (prev + 1) % maxPages);
  };

  const handlePrevReview = () => {
    setReviewPage((prev) => (prev - 1 + maxPages) % maxPages);
  };

  // Filter FAQ items
  const filteredFaqData = useMemo(() => {
    return FAQ_DATA.map((catGroup) => {
      if (activeFaqCategory !== 'All' && catGroup.category !== activeFaqCategory) {
        return null;
      }
      const matchedItems = catGroup.items.filter((item) => {
        if (!faqSearch.trim()) return true;
        const q = faqSearch.toLowerCase();
        return (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        );
      });
      if (matchedItems.length === 0) return null;
      return {
        ...catGroup,
        items: matchedItems,
      };
    }).filter(Boolean) as FAQCategory[];
  }, [faqSearch, activeFaqCategory]);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans pb-24 selection:bg-[#1D4ED8]/10 selection:text-[#1D4ED8]">
      {/* Top Navigation Bar with Back link & Fast Status */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]/80">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#1D4ED8] p-2 rounded-full hover:bg-[#F8FAFC] transition cursor-pointer"
                title="Return to Main Portal"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
            )}
            <div className="h-4 w-[1px] bg-[#E2E8F0] hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E2E8F0] shadow-xs">
                <img
                  src="https://flagcdn.com/w80/my.png"
                  alt="Malaysia Flag"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                Malaysia eVisa
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]/60">
                Pakistan Passport Eligible
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#10B981] border border-[#A7F3D0] text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#10B981]" />
              <span className="hidden sm:inline">WhatsApp Help</span>
            </button>

            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="px-4 sm:px-5 py-2 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold shadow-[0_4px_16px_rgba(29,78,216,0.3)] transition cursor-pointer active:scale-95"
            >
              Start Application
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb row */}
        <div className="flex items-center gap-2 text-[11px] text-[#64748B] mb-5">
          <button
            onClick={onBackToHome}
            className="hover:text-[#1D4ED8] transition cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span>Explore Visas</span>
          <span>/</span>
          <span className="text-[#0F172A] font-semibold">Malaysia eVisa for Pakistan</span>
        </div>

        {/* 
          Section 2: Top Rounded Hero Banner
          w-full h-[320px] sm:h-[380px] rounded-[28px] overflow-hidden relative shadow-lg mb-12 flex items-center justify-center text-center px-6
        */}
        <div className="w-full h-[320px] sm:h-[380px] rounded-[28px] overflow-hidden relative shadow-[0_12px_35px_-8px_rgba(29,78,216,0.12)] mb-12 flex items-center justify-center text-center px-6">
          {/* High-res Batu Caves, Malaysia Photography */}
          <img
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=85"
            alt="Batu Caves, Malaysia"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Atmospheric Rich Navy Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/55 via-[#0F172A]/45 to-[#0F172A]/75 pointer-events-none" />

          {/* Centered Stack */}
          <div className="relative z-10 flex flex-col items-center max-w-2xl">
            {/* Country Flag Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold mb-3.5 shadow-sm">
              <img
                src="https://flagcdn.com/w40/my.png"
                alt="MY"
                className="w-4 h-3 rounded-[2px] object-cover"
              />
              <span>Immigration Department of Malaysia Certified</span>
            </div>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-white tracking-tight mb-3 drop-shadow-md">
              Malaysia Visa from Pakistan
            </h1>

            {/* Delivery Subtitle */}
            <p className="text-sm sm:text-base font-medium text-white/90 mb-6 flex items-center gap-2 drop-shadow-xs">
              <Clock className="w-4 h-4 text-blue-300 shrink-0" />
              <span>e-visa on 30 Oct 2026</span>
            </p>

            {/* Primary CTA Pill */}
            <button
              onClick={() => setIsChecklistModalOpen(true)}
              className="px-7 py-3 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs sm:text-sm font-semibold shadow-[0_8px_25px_rgba(29,78,216,0.45)] transition cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Check Required Documents</span>
            </button>
          </div>
        </div>

        {/* 
          Section 3: Two-Column Main Layout
          grid grid-cols-1 lg:grid-cols-12 gap-10 items-start
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 
            LEFT CONTENT COLUMN (8 Cols)
            Section A -> Section B -> Section C -> Section D -> Section E
          */}
          <div className="lg:col-span-8 flex flex-col gap-14">
            {/* ========================================================
                SECTION A: e-visa Information & Get your e-visa by
            ======================================================== */}
            <section id="evisa-information" className="scroll-mt-24">
              {/* Heading with royal blue accent bar underneath */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  e-visa Information
                </h2>
                <div className="w-8 h-[3px] bg-[#1D4ED8] rounded-full mt-1.5" />
              </div>

              {/* 4-Item Spec Grid (grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-8">
                {/* 1. Type */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-[#64748B]">Type:</span>
                    <span className="text-xs font-bold text-[#0F172A] underline decoration-[#CBD5E1] underline-offset-2">
                      e-visa
                    </span>
                  </div>
                </div>

                {/* 2. Length of Stay */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center shrink-0 border border-[#BAE6FD]/60">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-[#64748B]">Length of Stay:</span>
                    <span className="text-xs font-bold text-[#0F172A]">
                      30 days
                    </span>
                  </div>
                </div>

                {/* 3. Validity */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 border border-[#A7F3D0]/60">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-[#64748B]">Validity:</span>
                    <span className="text-xs font-bold text-[#0F172A]">
                      6 months
                    </span>
                  </div>
                </div>

                {/* 4. Entry */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-[#64748B]">Entry:</span>
                    <span className="text-xs font-bold text-[#0F172A]">
                      Single
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Timeline Box (Get your e-visa by) */}
              <div className="border-l-2 border-[#BFDBFE] pl-5 ml-2 relative mt-4">
                {/* Header Node: Blue Glowing Dot */}
                <div className="w-3 h-3 rounded-full bg-[#1D4ED8] ring-4 ring-[#EFF6FF] -left-[7px] top-1 absolute shadow-sm" />

                <h3 className="text-sm font-bold text-[#0F172A] mb-3">
                  Get your e-visa by
                </h3>

                {/* Expandable Card */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-[0_8px_25px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                      30 Oct 2026 at 09:00 PM
                    </span>
                    <span className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]/60 ml-auto">
                      Guaranteed Dispatch
                    </span>
                  </div>

                  {/* Interactive Toggle Link */}
                  <button
                    onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                    className="text-[11px] font-semibold text-[#1D4ED8] mt-2.5 flex items-center gap-1 hover:text-[#1E40AF] transition cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isTimelineOpen ? 'Hide Timeline' : 'View Timeline'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isTimelineOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Timeline Stages */}
                  <AnimatePresence>
                    {isTimelineOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 mt-3 border-t border-[#E2E8F0]/80 space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0F172A]">Document Pre-Check & Quality Assessment</p>
                            <p className="text-[11px] text-[#64748B]">Immediate review of passport scan, photograph, and ticket booking within 2 hours.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0F172A]">Immigration Portal Dispatch</p>
                            <p className="text-[11px] text-[#64748B]">Formal submission to the Malaysian Consular Visa System (eVisa Hub).</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                            <Clock className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0F172A]">eVisa Grant Issued</p>
                            <p className="text-[11px] text-[#64748B]">Delivered with encrypted security barcode ready for airport check-in.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* ========================================================
                SECTION B: Reviews (Top Rated Carousel)
            ======================================================== */}
            <section id="reviews" className="scroll-mt-24">
              {/* Heading with royal blue accent bar underneath */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Reviews
                </h2>
                <div className="w-8 h-[3px] bg-[#1D4ED8] rounded-full mt-1.5" />
              </div>

              {/* Centered Laurel Banner */}
              <div className="text-center mb-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 shadow-xs">
                {/* Left & Right Minimalist Laurel Framing */}
                <div className="flex items-center justify-center gap-3 mb-1">
                  {/* Left Laurel */}
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" className="text-[#1D4ED8]">
                    <path
                      d="M12 2C8 6 4 11 3 17C2.5 19 3 21 4 22C4.5 21 5 19 6 17C7.5 13 10 9 14 6C13 4.5 12.5 3 12 2Z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <path
                      d="M18 5C14 8 10 13 8 18C7.5 19.5 8 21 9 22C10 20 11 18 12.5 15C14.5 11 17 8 20 6C19.5 5.5 18.5 5 18 5Z"
                      fill="currentColor"
                      opacity="0.5"
                    />
                  </svg>

                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
                    Top rated across all platforms
                  </h3>

                  {/* Right Laurel */}
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" className="text-[#1D4ED8] -scale-x-100">
                    <path
                      d="M12 2C8 6 4 11 3 17C2.5 19 3 21 4 22C4.5 21 5 19 6 17C7.5 13 10 9 14 6C13 4.5 12.5 3 12 2Z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <path
                      d="M18 5C14 8 10 13 8 18C7.5 19.5 8 21 9 22C10 20 11 18 12.5 15C14.5 11 17 8 20 6C19.5 5.5 18.5 5 18 5Z"
                      fill="currentColor"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                <p className="text-xs text-[#64748B] mb-4">
                  Loved by travelers everywhere in Pakistan
                </p>

                {/* Platform Badges Row */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold text-[#475569]">
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E2E8F0] shadow-xs">
                    <span className="text-[#00B67A] font-bold">★</span>
                    <span>Trustpilot</span>
                    <span className="text-[#0F172A] font-bold">4.9 / 5</span>
                  </div>

                  <span className="text-[#CBD5E1] hidden sm:inline">|</span>

                  <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E2E8F0] shadow-xs">
                    <span className="text-[#0F172A]"></span>
                    <span>App Store</span>
                    <span className="text-[#0F172A] font-bold">4.8</span>
                  </div>

                  <span className="text-[#CBD5E1] hidden sm:inline">|</span>

                  <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E2E8F0] shadow-xs">
                    <span className="text-[#EA4335] text-[10px]">▶</span>
                    <span>Google Play</span>
                    <span className="text-[#0F172A] font-bold">4.9</span>
                  </div>
                </div>
              </div>

              {/* 3-Card Review Carousel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {REVIEWS.slice(
                  reviewPage * reviewsPerPage,
                  reviewPage * reviewsPerPage + reviewsPerPage
                ).map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* Top: Avatar, Name, Country pill, Star boxes */}
                      <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold flex items-center justify-center mb-2.5 border border-[#BFDBFE]/60">
                        {review.initials}
                      </div>

                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#0F172A]">
                          {review.name}
                        </h4>
                        <span className="text-[10px] text-[#94A3B8]">{review.date}</span>
                      </div>

                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] px-2 py-0.5 rounded-md inline-block w-fit my-1.5 text-[#475569] font-medium">
                        {review.country}
                      </div>

                      {/* 5 Green Star Boxes */}
                      <div className="flex items-center gap-1 my-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3.5 h-3.5 rounded-[2px] bg-[#00B67A] text-white flex items-center justify-center text-[9px] font-bold leading-none"
                          >
                            ★
                          </div>
                        ))}
                      </div>

                      {/* Body quote */}
                      <p className="text-[11px] text-[#475569] leading-relaxed my-2.5 line-clamp-4">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Footer link */}
                    <div className="pt-2 border-t border-[#F1F5F9]">
                      <a
                        href="https://www.trustpilot.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-[#1D4ED8] hover:underline flex items-center gap-1"
                      >
                        <span>Read on Trustpilot</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Carousel Arrows */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handlePrevReview}
                  className="w-9 h-9 rounded-full border border-[#CBD5E1] text-[#0F172A] hover:border-[#1D4ED8] hover:text-[#1D4ED8] flex items-center justify-center transition cursor-pointer active:scale-95 shadow-xs"
                  aria-label="Previous Reviews"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 px-2">
                  {[...Array(maxPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setReviewPage(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        reviewPage === idx
                          ? 'w-6 bg-[#1D4ED8]'
                          : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                      }`}
                      aria-label={`Go to review page ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextReview}
                  className="w-9 h-9 rounded-full border border-[#CBD5E1] text-[#0F172A] hover:border-[#1D4ED8] hover:text-[#1D4ED8] flex items-center justify-center transition cursor-pointer active:scale-95 shadow-xs"
                  aria-label="Next Reviews"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* ========================================================
                SECTION C: How e-visa Process Works (4-Step Connected Stepper)
            ======================================================== */}
            <section id="how-it-works" className="scroll-mt-24">
              {/* Heading with royal blue accent bar underneath */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  How e-visa Process Works
                </h2>
                <div className="w-8 h-[3px] bg-[#1D4ED8] rounded-full mt-1.5" />
              </div>

              {/* Vertical Timeline Container */}
              <div className="relative pl-7 border-l-2 border-[#BFDBFE] ml-2 space-y-6">
                {/* Step 1 */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] ring-4 ring-[#EFF6FF] absolute -left-[34px] top-4 shadow-xs" />
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
                    <span className="text-[11px] font-bold text-[#1D4ED8] block mb-0.5">
                      Step 1
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1">
                      Apply Online
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Submit your documents online — only pay government fee.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] ring-4 ring-[#EFF6FF] absolute -left-[34px] top-4 shadow-xs" />
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
                    <span className="text-[11px] font-bold text-[#1D4ED8] block mb-0.5">
                      Step 2
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1">
                      Your Documents Are Verified
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Our visa specialists verify your documents and submit to Immigration.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] ring-4 ring-[#EFF6FF] absolute -left-[34px] top-4 shadow-xs" />
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
                    <span className="text-[11px] font-bold text-[#1D4ED8] block mb-0.5">
                      Step 3
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1">
                      Your e-visa Gets Processed
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      We work with Immigration to ensure you get your e-visa on time.
                    </p>

                    {/* Inner Sub-Card */}
                    <div className="mt-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-3.5 space-y-3">
                      {/* Item 1 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-[#E2E8F0]/70">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="text-[11px] font-medium text-[#0F172A]">
                            Application has been sent to immigration supervisor
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pl-4 sm:pl-0">
                          <span className="text-[10px] text-[#64748B]">9 Jan, 5:45 AM</span>
                          <span className="bg-[#ECFDF5] text-[#10B981] text-[9px] font-bold px-2 py-0.5 rounded border border-[#A7F3D0]/50">
                            ON TIME
                          </span>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="text-[11px] font-medium text-[#0F172A]">
                            Application has been sent to internal intelligence
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pl-4 sm:pl-0">
                          <span className="text-[10px] text-[#64748B]">9 Jan, 5:45 AM</span>
                          <span className="bg-[#ECFDF5] text-[#10B981] text-[9px] font-bold px-2 py-0.5 rounded border border-[#A7F3D0]/50">
                            ON TIME
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-4 ring-[#ECFDF5] absolute -left-[34px] top-4 shadow-xs" />
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
                    <span className="text-[11px] font-bold text-[#10B981] block mb-0.5">
                      Step 4
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">
                      Get Your e-visa on{' '}
                      <span className="text-[#1D4ED8] font-extrabold underline decoration-[#BFDBFE]">
                        30 Oct, 09:00 PM
                      </span>
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      Download your verified Malaysian eVisa and fly with full peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                SECTION D: Malaysia e-visa Rejection Reasons
            ======================================================== */}
            <section id="rejection-reasons" className="scroll-mt-24">
              {/* Heading with subtitle */}
              <div className="mb-5">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Malaysia e-visa Rejection Reasons
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Factors that can get your e-visa rejected
                </p>
              </div>

              {/* 4-Row Clean List */}
              <div className="divide-y divide-[#F1F5F9] border-t border-b border-[#F1F5F9]">
                {/* 1. Expired Passport */}
                <div className="py-4 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                    <BookX className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A]">
                      Expired Passport
                    </h3>
                    <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">
                      Applying with a passport that has expired or expires within 6 months.
                    </p>
                  </div>
                </div>

                {/* 2. Insufficient Funds */}
                <div className="py-4 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A]">
                      Insufficient Funds
                    </h3>
                    <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">
                      Failing to demonstrate enough financial resources to support your stay.
                    </p>
                  </div>
                </div>

                {/* 3. Criminal Record */}
                <div className="py-4 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A]">
                      Criminal Record
                    </h3>
                    <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">
                      Having a criminal history that disqualifies you from obtaining a visa.
                    </p>
                  </div>
                </div>

                {/* 4. Previous Visa Violations */}
                <div className="py-4 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A]">
                      Previous Visa Violations
                    </h3>
                    <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">
                      Having overstayed or violated the terms of a previous visa.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                SECTION E: Frequently Asked Questions
            ======================================================== */}
            <section id="faqs" className="scroll-mt-24">
              {/* Heading with royal blue accent bar underneath */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Frequently Asked Questions
                </h2>
                <div className="w-8 h-[3px] bg-[#1D4ED8] rounded-full mt-1.5" />
              </div>

              {/* Search Input */}
              <div className="w-full h-11 px-4 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5 mb-4 focus-within:border-[#1D4ED8] focus-within:bg-white transition shadow-xs">
                <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Ask a question..."
                  className="text-xs sm:text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] bg-transparent outline-none w-full"
                />
                {faqSearch && (
                  <button
                    onClick={() => setFaqSearch('')}
                    className="p-1 text-[#94A3B8] hover:text-[#0F172A] transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['All', ...FAQ_DATA.map((g) => g.category)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFaqCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition cursor-pointer ${
                      activeFaqCategory === cat
                        ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs'
                        : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Expandable Accordion List */}
              <div className="divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
                {filteredFaqData.length > 0 ? (
                  filteredFaqData.map((group) => {
                    const isOpen = openAccordions[group.category] ?? true;
                    return (
                      <div key={group.category} className="py-2">
                        {/* Group Category Header */}
                        <div
                          onClick={() => toggleAccordion(group.category)}
                          className="py-3.5 flex items-center justify-between cursor-pointer group"
                        >
                          <span className="text-xs sm:text-[13px] font-semibold text-[#1D4ED8] group-hover:text-[#1E40AF] transition flex items-center gap-2">
                            <span>{group.category}</span>
                            <span className="text-[10px] text-[#64748B] font-normal">
                              ({group.items.length})
                            </span>
                          </span>
                          <div className="w-6 h-6 rounded-full bg-[#F8FAFC] group-hover:bg-[#EFF6FF] flex items-center justify-center transition">
                            {isOpen ? (
                              <Minus className="w-3.5 h-3.5 text-[#1D4ED8]" />
                            ) : (
                              <Plus className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#1D4ED8]" />
                            )}
                          </div>
                        </div>

                        {/* Q&A Accordion Items under this Category */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pb-4 space-y-3"
                            >
                              {group.items.map((faqItem, idx) => (
                                <div
                                  key={idx}
                                  className="p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5"
                                >
                                  <h4 className="text-xs font-bold text-[#0F172A] leading-snug">
                                    {faqItem.question}
                                  </h4>
                                  <p className="text-[11.5px] text-[#475569] leading-relaxed">
                                    {faqItem.answer}
                                  </p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-[#64748B]">
                    No questions found matching "{faqSearch}". Try searching for passport, fees, or photo.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* 
            RIGHT STICKY SIDEBAR COLUMN (4 Cols)
            Section 4: Sticky Pricing & Checkout Card
          */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            {/* Outer Shell */}
            <div className="rounded-[24px] bg-[#EFF6FF] p-1.5 border border-[#BFDBFE]/70 shadow-[0_15px_40px_rgba(29,78,216,0.08)]">
              {/* Top Banner */}
              <div className="px-4 py-2.5 flex items-center gap-2 text-[#1D4ED8] text-xs font-semibold">
                <Clock className="w-4 h-4" />
                <span>e-visa by 30 Oct, 21:00 PM</span>
              </div>

              {/* Inner White Breakdown Card */}
              <div className="bg-white rounded-[20px] p-5 shadow-sm border border-[#E2E8F0]/60">
                {/* Government Fees */}
                <div className="flex justify-between items-center text-xs text-[#475569] mb-3">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>Government Fees</span>
                  </div>
                  <span className="font-semibold text-[#0F172A]">PKR 15,200</span>
                </div>

                {/* Processing Fees */}
                <div className="flex justify-between items-center text-xs text-[#475569] pb-4 border-b border-dashed border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>Processing Fees</span>
                  </div>
                  <span className="font-semibold text-[#0F172A]">PKR 2,518</span>
                </div>

                {/* Total Amount Row */}
                <div className="flex justify-between items-center pt-4 mb-5">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#1D4ED8]" />
                    <span className="text-sm font-bold text-[#0F172A]">Total Amount</span>
                  </div>
                  <span className="text-base font-extrabold text-[#1D4ED8]">
                    PKR 17,718
                  </span>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold shadow-[0_6px_20px_rgba(29,78,216,0.3)] transition cursor-pointer active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Start Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust guarantee micro badges */}
                <div className="mt-4 pt-3.5 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-center text-[10px] text-[#64748B]">
                  <div className="flex items-center justify-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Govt Accredited</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Support Row Directly Beneath the Card */}
            <div className="mt-4 px-2 flex items-center justify-between bg-white rounded-2xl p-3 border border-[#E2E8F0] shadow-xs">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0F172A]">Have Queries?</span>
                <span className="text-[11px] text-[#64748B]">
                  Connect on WhatsApp with us
                </span>
              </div>
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-9 h-9 rounded-full bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] flex items-center justify-center hover:scale-105 transition cursor-pointer shadow-xs active:scale-95"
                title="Open WhatsApp Support"
                aria-label="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4 fill-[#10B981]" />
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* ========================================================
          INTERACTIVE MODAL 1: Required Documents Checklist
      ======================================================== */}
      <AnimatePresence>
        {isChecklistModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChecklistModalOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      Malaysia eVisa Documents Checklist
                    </h3>
                    <p className="text-[11px] text-[#64748B]">
                      Pakistan Passport Requirement Standards
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChecklistModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-[#64748B] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3.5 text-xs">
                <div className="p-3 rounded-2xl bg-[#EFF6FF]/60 border border-[#BFDBFE]/60 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0F172A] block">1. Original Passport Bio-Data Scan</span>
                    <span className="text-[11px] text-[#64748B]">Clear color scan of pages 1-3. Must have minimum 6 months validity from departure date.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0F172A] block">2. Recent Passport-Sized Photograph</span>
                    <span className="text-[11px] text-[#64748B]">White background, 35mm x 50mm, taken within 6 months, no reflections on spectacles.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0F172A] block">3. Confirmed Return Flight Ticket</span>
                    <span className="text-[11px] text-[#64748B]">Verifiable airline PNR booking showing arrival and departure from Malaysia.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0F172A] block">4. Hotel Accommodation Booking</span>
                    <span className="text-[11px] text-[#64748B]">Confirmed hotel voucher or sponsor letter if staying with relatives in Malaysia.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0F172A] block">5. Bank Account Statement</span>
                    <span className="text-[11px] text-[#64748B]">Last 3 to 6 months bank statement showing closing balance of at least PKR 300,000.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsChecklistModalOpen(false);
                    setIsCheckoutModalOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                >
                  Proceed to Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          INTERACTIVE MODAL 2: Checkout & Application Workflow
      ======================================================== */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Start Malaysia eVisa Application
                  </h3>
                  <p className="text-[11px] text-[#64748B]">
                    Total payable: <strong className="text-[#1D4ED8]">PKR 17,718</strong>
                  </p>
                </div>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-[#64748B] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {checkoutSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] mx-auto flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A]">
                    Application Docket Initialized!
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed max-w-xs mx-auto">
                    Reference docket #MY-PK-{Math.floor(100000 + Math.random() * 900000)} created for {applicantName || 'Applicant'}. Our consular verification officer will contact you via WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => {
                      setCheckoutSubmitted(false);
                      setIsCheckoutModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutSubmitted(true);
                  }}
                  className="py-4 space-y-3 text-xs"
                >
                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">
                      Applicant Full Name (As per Passport)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ali Khan"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">
                      Pakistani Passport Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AB1234567"
                      value={applicantPassport}
                      onChange={(e) => setApplicantPassport(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition uppercase"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">
                      WhatsApp Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition"
                    />
                  </div>

                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1 text-[11px] text-[#64748B]">
                    <div className="flex justify-between">
                      <span>Government Consular Fee:</span>
                      <span className="font-bold text-[#0F172A]">PKR 15,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Verification & Processing Fee:</span>
                      <span className="font-bold text-[#0F172A]">PKR 2,518</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-[#E2E8F0] font-bold text-[#0F172A]">
                      <span>Total:</span>
                      <span className="text-[#1D4ED8]">PKR 17,718</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold shadow-[0_4px_16px_rgba(29,78,216,0.3)] transition cursor-pointer"
                  >
                    Confirm & Proceed to Payment
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          INTERACTIVE MODAL 3: WhatsApp Support Dialog
      ======================================================== */}
      <AnimatePresence>
        {isWhatsAppModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWhatsAppModalOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 z-10 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] mx-auto flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 fill-[#10B981]" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">
                Malaysia Visa WhatsApp Desk
              </h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Connect directly with our senior consular case officer for Pakistani citizens. Typical response time under 3 minutes.
              </p>
              <div className="my-4 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#10B981]">Dedicated Officer</span>
                <p className="font-bold text-[#0F172A]">Consular Officer Farhan (Kuala Lumpur & Lahore Desk)</p>
                <p className="text-[11px] text-[#64748B]">+92 300 8472910</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsWhatsAppModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-[#CBD5E1] text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Connecting to WhatsApp: +92 300 8472910 for Malaysia eVisa consultation.');
                    setIsWhatsAppModalOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Chat</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
