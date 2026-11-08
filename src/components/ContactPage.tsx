import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  Send,
  Building2,
  Sparkles,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import { PillHeader } from './PillHeader';
import { FaqSection } from './FaqSection';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';
import { ReadyToBeginCard } from './ReadyToBeginCard';

interface ContactPageProps {
  onBackToHome: () => void;
  onOpenVisaModal: () => void;
  onNavigateToVisas?: () => void;
  onNavigateToBlogs?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToProcess?: () => void;
  onNavigateToAbout?: () => void;
}

const SUPPORT_NUMBERS = [
  { number: '03246883359', name: 'Consular Casework Desk', hours: '24/7 Priority Support' },
  { number: '03224252883', name: 'eVisa & Digital Desk', hours: '9:00 AM – 10:00 PM' },
  { number: '03490449109', name: 'US, UK & Schengen Desk', hours: '9:00 AM – 9:00 PM' },
  { number: '0302195335', name: 'Umrah & Hajj Desk', hours: '24/7 Pilgrim Support' },
];

const LAHORE_OFFICE = {
  name: 'Regal Visa Solutions',
  building: 'Office 208, 2nd Floor, Al-Hafeez Business Centre',
  street: 'Firdous Market Rd, 89-B/3 Block B 3 Gulberg III',
  city: 'Lahore, 54660, Pakistan',
  plusCode: 'G932+73 Lahore, Pakistan',
  phone: '0324-6883359',
  hours: 'Monday – Saturday: 9:00 AM – 8:00 PM',
  mapsUrl: 'https://maps.app.goo.gl/zarnRvTpJFNF2SaD7',
  embedUrl: 'https://maps.google.com/maps?q=Regal+Visa+Solutions+Al-Hafeez+Business+Centre+Gulberg+III+Lahore&t=&z=16&ie=UTF8&iwloc=&output=embed',
};

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  onOpenVisaModal,
  onNavigateToVisas,
  onNavigateToBlogs,
  onNavigateToServices,
  onNavigateToProcess,
  onNavigateToAbout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('United Kingdom');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        onNavigateToContact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Hero Header */}
      <header className="pt-28 sm:pt-36 pb-8 px-4 sm:px-8 xl:px-14 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="relative flex flex-col items-center justify-center text-center select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />
            <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase">
              CONTACT
            </span>
            <h1 className="relative font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0F172A] leading-tight select-none">
              Contact
            </h1>
            <div className="w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5" />
          </div>
        </div>
      </header>

      {/* Direct Contact Cards & Interactive Form */}
      <section className="py-8 px-4 sm:px-8 xl:px-14 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Telephone Desks (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                Direct Telephone Directory
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Call or WhatsApp our specialized desks directly. No robotic switchboards.
              </p>
            </div>

            <div className="space-y-3">
              {SUPPORT_NUMBERS.map((item, idx) => {
                const rawPhone = item.number.replace(/^0/, '');
                const waUrl = `https://wa.me/92${rawPhone}`;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition shadow-xs flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-[#0F172A]">{item.name}</div>
                      <div className="text-base font-bold text-[#2563EB] tracking-tight">
                        {item.number}
                      </div>
                      <div className="text-[10.5px] text-[#64748B]">{item.hours}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center transition active:scale-95 shadow-xs"
                        title="Chat on WhatsApp"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.37 7.35 9.1 7.41 8.88 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.27C9.15 12.44 10.74 14.9 13.21 15.96C15.26 16.84 15.68 16.66 16.12 16.63C16.57 16.59 17.55 16.05 17.76 15.48C17.96 14.9 17.96 14.41 17.9 14.31C17.84 14.21 17.68 14.15 17.44 14.03C17.2 13.91 16.01 13.33 15.79 13.25C15.57 13.17 15.41 13.13 15.25 13.37C15.09 13.61 14.62 14.15 14.48 14.31C14.34 14.47 14.2 14.49 13.96 14.37C13.72 14.25 12.95 14 12.03 13.18C11.31 12.54 10.83 11.76 10.69 11.52C10.55 11.28 10.67 11.14 10.79 11.02C10.9 10.91 11.04 10.73 11.16 10.59C11.28 10.45 11.32 10.35 11.4 10.19C11.48 10.03 11.44 9.89 11.38 9.77C11.32 9.65 10.85 8.5 10.65 8.03C10.46 7.57 10.26 7.63 10.11 7.63C9.97 7.62 9.81 7.35 9.53 7.35Z"/>
                        </svg>
                      </a>
                      <a
                        href={`tel:${item.number}`}
                        className="w-9 h-9 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center transition active:scale-95 shadow-xs"
                        title="Call directly"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Priority Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-5 sm:p-7">
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                  ONLINE APPOINTMENT DESK
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight mt-0.5">
                  Book a Free Consular Call
                </h2>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] mx-auto flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    Consultation Scheduled!
                  </h3>
                  <p className="text-xs text-[#475569] max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your inquiry for <strong>{destination}</strong> has been received. A caseworker will call you at <strong>{phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-full bg-[#1C232D] text-white text-xs font-semibold hover:bg-[#141A22] transition cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#0F172A]">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Muhammad Usman"
                        className="w-full h-9 px-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:border-[#2563EB] focus:bg-white outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#0F172A]">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0324 1234567"
                        className="w-full h-9 px-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:border-[#2563EB] focus:bg-white outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#0F172A]">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full h-9 px-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:border-[#2563EB] focus:bg-white outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#0F172A]">Target Destination *</label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:border-[#2563EB] focus:bg-white outline-none transition cursor-pointer"
                      >
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States (B1/B2)</option>
                        <option value="Canada">Canada (Visitor / Super Visa)</option>
                        <option value="Schengen">Schengen Area (Europe)</option>
                        <option value="Malaysia">Malaysia eVisa</option>
                        <option value="Saudi Arabia">Saudi Arabia (Umrah / Tourist)</option>
                        <option value="UAE">UAE (Dubai 30/60 Days)</option>
                        <option value="Türkiye">Türkiye</option>
                        <option value="Australia">Australia</option>
                        <option value="Refusal Overturn">Visa Refusal Appeal / Overturn</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#0F172A]">
                      Case Details or Question (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your travel dates or questions..."
                      className="w-full p-2.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:border-[#2563EB] focus:bg-white outline-none transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-tight shadow-[0_4px_14px_rgba(37,99,235,0.28)] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 mt-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Free Consular Call</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lahore Office Location & Interactive Google Map */}
      <section className="py-12 px-4 sm:px-8 xl:px-14 max-w-7xl mx-auto mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            VISIT OUR OFFICE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1">
            Lahore Consular Liaison Headquarters
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
            Visit our Gulberg III office for in-person document handover, biometric verification, and interview coaching.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Detailed Address & CTA Details (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-white">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>HEADQUARTERS</span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">
                    {LAHORE_OFFICE.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#2563EB] mt-0.5">
                    {LAHORE_OFFICE.building}
                  </p>
                </div>

                <div className="space-y-3 text-xs text-[#334155]">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#0F172A]">Complete Address</div>
                      <div className="text-[#475569] leading-relaxed">
                        {LAHORE_OFFICE.building}, {LAHORE_OFFICE.street}, {LAHORE_OFFICE.city}
                      </div>
                      <div className="text-[11px] font-mono text-[#2563EB] pt-1">
                        Plus Code: {LAHORE_OFFICE.plusCode}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <div>
                      <div className="font-bold text-[#0F172A]">Operating Hours</div>
                      <div className="text-[#475569]">{LAHORE_OFFICE.hours}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <div>
                      <div className="font-bold text-[#0F172A]">Direct Helpline</div>
                      <a href={`tel:${LAHORE_OFFICE.phone.replace(/[^0-9]/g, '')}`} className="text-[#2563EB] font-bold hover:underline">
                        {LAHORE_OFFICE.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Open in Google Maps CTA Button */}
              <div className="pt-2">
                <a
                  href={LAHORE_OFFICE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold tracking-tight shadow-[0_4px_14px_rgba(37,99,235,0.28)] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Right Column: Embedded Interactive Google Map (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-full bg-neutral-100 border-t lg:border-t-0 lg:border-l border-[#E2E8F0] overflow-hidden">
              <iframe
                title="Regal Visa Solutions Lahore Location"
                src={LAHORE_OFFICE.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
};
export default ContactPage;