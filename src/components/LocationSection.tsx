import React from 'react';
import { Building2, MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';
import { PatternWaves } from './PatternWaves';

interface LocationSectionProps {
  className?: string;
}

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

export const LocationSection: React.FC<LocationSectionProps> = ({ className = '' }) => {
  return (
    <section
      id="location-section"
      className={`relative w-full bg-white text-neutral-900 pt-14 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-10 border-t border-neutral-100 select-none overflow-hidden ${className}`}
    >
      {/* Background Pattern Waves matching brand aesthetic */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <PatternWaves
          preset="pond"
          color="#2563eb"
          backgroundColor="#ffffff"
          fade="edges"
          interactive={false}
          cursorSize={50}
          cursorStrength={0.6}
          wave="ripple"
          spacing={10}
          markSize={0.9}
          depth={0.3}
          shine={2}
          contrast={0.75}
          speed={2.2}
          scale={1.7}
          direction={57}
        />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Sculpted Heading in exact brand style */}
        <div className="relative flex flex-col items-center justify-center mb-10 sm:mb-16 select-none text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

          <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase font-sans">
            LOCATION
          </span>

          <h2 className="relative font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
            <span className="text-[#0F172A]">Our </span>
            <span className="text-[#2563EB]">Location</span>
          </h2>

          <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5 sm:mt-4" />

          <p className="mt-4 text-xs sm:text-sm text-[#64748B] max-w-md mx-auto font-medium">
            Visit our Gulberg III headquarters for in-person consultations and document submission.
          </p>
        </div>

        {/* Embedded Maps Card Container */}
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
                      <a
                        href={`tel:${LAHORE_OFFICE.phone.replace(/[^0-9]/g, '')}`}
                        className="text-[#2563EB] font-bold hover:underline"
                      >
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
      </div>
    </section>
  );
};
export default LocationSection;