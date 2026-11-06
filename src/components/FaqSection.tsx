import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Minus, X, ArrowRight, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

interface FaqSectionProps {
  countryName?: string;
  customCategories?: FaqCategory[];
  className?: string;
}

const DEFAULT_FAQ_CATEGORIES: FaqCategory[] = [
  {
    category: 'General Information',
    items: [
      {
        question: 'What is the visa issuance process through Globe Express?',
        answer:
          'Globe Express provides direct consular document pre-clearance and official submission for Pakistani passport holders. All documents are reviewed by senior visa officers before lodging with foreign consular authorities, ensuring guaranteed compliance and rapid turnaround.',
      },
      {
        question: 'Are embassy visits or biometric appointments required?',
        answer:
          'For e-visas and entry clearances (e.g. Malaysia, Maldives, Azerbaijan, UAE, Turkey), the entire procedure is 100% digital. No embassy visits, biometric center queues, or physical passport surrenders are needed.',
      },
      {
        question: 'How do I receive my approved visa grant?',
        answer:
          'Approved visas are issued as high-resolution cryptographic digital documents delivered directly to your registered WhatsApp and email, with verifiable QR codes for airport immigration scanning.',
      },
    ],
  },
  {
    category: 'Eligibility & Requirements',
    items: [
      {
        question: 'What minimum passport validity is mandatory for Pakistani travelers?',
        answer:
          'Your machine-readable Pakistani passport must possess at least 6 months remaining validity from your scheduled travel departure date, along with at least two completely blank pages.',
      },
      {
        question: 'What financial proof and bank statement balance are required?',
        answer:
          'Most Asian and European destinations require the last 3 to 6 months of signed and stamped bank statements showing steady financial stability and closing balances generally between PKR 300,000 and PKR 600,000 depending on the country.',
      },
      {
        question: 'Do infants and children require separate visa applications?',
        answer:
          'Yes. Every traveling minor, regardless of age, must have an individual Pakistani passport and an official separate visa application filed with parental consent documents.',
      },
    ],
  },
  {
    category: 'Application Process',
    items: [
      {
        question: 'How long does document verification take after online submission?',
        answer:
          'Our consular team completes preliminary document verification and photo background checks within 30 to 120 minutes of application submission.',
      },
      {
        question: 'Can I track my application status in real-time?',
        answer:
          'Yes, automated milestone tracking is enabled with direct SMS and WhatsApp alerts at each stage: Document Pre-Check, Consular Submission, Verification, and Grant Issuance.',
      },
      {
        question: 'What happens if there is an error in my submitted bio-data?',
        answer:
          'Our verification team contacts you via WhatsApp before government transmission to amend spelling errors or unclear scans without incurring government re-filing penalties.',
      },
    ],
  },
  {
    category: 'Entry & Exit Regulations',
    items: [
      {
        question: 'Are return or onward flight tickets mandatory at the boarding gate?',
        answer:
          'Yes. International airlines and destination border authorities strictly require confirmed return or onward flight tickets with verifiable PNR codes for Pakistani tourists.',
      },
      {
        question: 'Do I need hotel bookings or proof of accommodation?',
        answer:
          'Confirmed accommodation vouchers (resort, hotel, or host invitation letter) matching your flight dates are mandatory for airport immigration arrival clearance.',
      },
    ],
  },
  {
    category: 'Refunds, Rejections & Reapplications',
    items: [
      {
        question: 'What happens if a visa is refused by the immigration department?',
        answer:
          'In the rare event of refusal, our consular specialists review the official refusal note, rectify the deficiency (e.g. enhanced financial documentation or employer NOC), and file an expedited reconsideration appeal.',
      },
      {
        question: 'Are consular and government fees refundable upon rejection?',
        answer:
          'Government consular fees are non-refundable once processed by the respective foreign government. However, our Globe Express Guarantee provides free re-application assistance.',
      },
    ],
  },
  {
    category: 'Visa Extension & Overstays',
    items: [
      {
        question: 'Can a tourist e-visa be extended while staying abroad?',
        answer:
          'Extension policies vary by destination: Malaysia permits social visit extensions under specific circumstances; UAE allows in-country renewals; while Maldives permits tourist extension up to 90 days via Malé immigration.',
      },
      {
        question: 'What are the consequences of accidental overstaying?',
        answer:
          'Overstaying incurs daily government penalty fines and may result in border entry bans across destination partner countries. We advise departing on or before the visa validity expiration.',
      },
    ],
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({
  countryName,
  customCategories,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const categoriesData = useMemo(() => {
    return customCategories && customCategories.length > 0
      ? customCategories
      : DEFAULT_FAQ_CATEGORIES;
  }, [customCategories]);

  // Filter categories based on search and selected category
  const filteredCategories = useMemo(() => {
    return categoriesData
      .map((catGroup) => {
        if (activeCategory !== 'All' && catGroup.category !== activeCategory) {
          return null;
        }

        const matchedItems = catGroup.items.filter((item) => {
          if (!searchQuery.trim()) return true;
          const q = searchQuery.toLowerCase();
          return (
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q) ||
            catGroup.category.toLowerCase().includes(q)
          );
        });

        if (matchedItems.length === 0) return null;
        return {
          ...catGroup,
          items: matchedItems,
        };
      })
      .filter(Boolean) as FaqCategory[];
  }, [categoriesData, searchQuery, activeCategory]);

  const toggleCategory = (catName: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  return (
    <section id="faqs" className={`w-full bg-white text-[#0F172A] font-sans ${className}`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Heading matching user reference design */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          {/* Brand color underline bar in #1C232D */}
          <div className="w-10 h-[3px] bg-[#1C232D] rounded-full mt-2" />
        </div>

        {/* Search Pill Input with exact user screenshot placeholder */}
        <div className="w-full h-12 px-4 rounded-full bg-[#F4F6F9] border border-transparent focus-within:border-[#1C232D] focus-within:bg-white flex items-center gap-3 mb-5 transition shadow-xs">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Smart AI; Ask me anything..."
            className="text-xs sm:text-[13.5px] text-[#0F172A] placeholder:text-neutral-400 bg-transparent outline-none w-full font-normal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills - Horizontally scrollable with arrow on right as in user screenshot */}
        <div className="relative mb-6 flex items-center">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pr-10 py-1 w-full">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer shrink-0 ${
                activeCategory === 'All'
                  ? 'bg-[#1C232D] text-white shadow-xs'
                  : 'bg-[#F4F6F9] text-[#1C232D] hover:bg-[#E2E8F0]'
              }`}
            >
              All Topics
            </button>
            {categoriesData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer shrink-0 ${
                  activeCategory === cat.category
                    ? 'bg-[#1C232D] text-white shadow-xs'
                    : 'bg-[#F4F6F9] text-[#1C232D] hover:bg-[#E2E8F0]'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Right scroll indicator arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white via-white to-transparent pl-4 flex items-center pointer-events-none">
            <div className="w-7 h-7 rounded-full bg-[#F4F6F9] border border-neutral-200/80 flex items-center justify-center shadow-xs">
              <ArrowRight className="w-3.5 h-3.5 text-[#1C232D]" />
            </div>
          </div>
        </div>

        {/* 
          Unexpanded Accordion Rows matching user image:
          - Brand color #1C232D text
          - White fill background
          - Thin plus (+) icon on the right
          - Subtle divider line border-b between items
          - Smooth animated expand showing answers with white fill
        */}
        <div className="bg-white border-t border-[#F1F5F9]">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((group) => {
              const isOpen = Boolean(openCategories[group.category]) || Boolean(searchQuery.trim());
              return (
                <div key={group.category} className="border-b border-[#F1F5F9]">
                  {/* Category Header Row */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(group.category)}
                    className="w-full py-4 sm:py-4.5 flex items-center justify-between text-left group cursor-pointer transition select-none bg-white hover:bg-neutral-50/60 px-1 rounded-lg"
                  >
                    <span className="text-[15px] sm:text-[16px] font-semibold text-[#1C232D] group-hover:opacity-85 transition tracking-tight">
                      {group.category}
                    </span>
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 ml-3">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-[#1C232D] stroke-[2]" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#1C232D] stroke-[2]" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Items */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        style={{ willChange: 'height, opacity' }}
                        className="overflow-hidden pb-4 pt-1 space-y-3 px-1 transform-gpu"
                      >
                        {group.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1.5"
                          >
                            <h4 className="text-xs sm:text-[13px] font-bold text-[#1C232D] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1C232D] shrink-0" />
                              <span>{item.question}</span>
                            </h4>
                            <p className="text-[12px] sm:text-[12.5px] text-[#475569] leading-relaxed pl-3.5">
                              {item.answer}
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
            <div className="py-12 text-center text-xs text-[#64748B]">
              <HelpCircle className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p>No questions found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-2 text-[#1C232D] font-semibold underline text-xs cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
