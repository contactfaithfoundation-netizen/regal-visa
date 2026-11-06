// Routing utility for Globe Express - Clean browser history and URL synchronization

export const COUNTRY_SLUG_MAP: Record<string, string> = {
  'united-kingdom': 'United Kingdom',
  'uk': 'United Kingdom',
  'great-britain': 'United Kingdom',
  'britain': 'United Kingdom',
  'england': 'United Kingdom',
  'united-states': 'United States',
  'usa': 'United States',
  'us': 'United States',
  'america': 'United States',
  'saudi-arabia': 'Saudi Arabia',
  'saudi': 'Saudi Arabia',
  'malaysia': 'Malaysia',
  'maldives': 'Maldives',
  'ireland': 'Ireland',
  'canada': 'Canada',
  'morocco': 'Morocco',
  'australia': 'Australia',
  'indonesia': 'Indonesia',
  'bali': 'Indonesia',
  'turkiye': 'Türkiye',
  'turkey': 'Türkiye',
  'switzerland': 'Switzerland',
  'swiss': 'Switzerland',
  'japan': 'Japan',
  'spain': 'Spain',
  'united-arab-emirates': 'United Arab Emirates',
  'uae': 'United Arab Emirates',
  'dubai': 'United Arab Emirates',
  'china': 'China',
  'portugal': 'Portugal',
  'germany': 'Germany',
};

// Convert country name to clean URL slug
export function countryToSlug(country: string): string {
  const normalized = country
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return normalized || 'visa';
}

// Convert URL slug or code to canonical country name
export function slugToCountry(slug: string): string {
  const cleanSlug = slug.toLowerCase().trim();
  if (COUNTRY_SLUG_MAP[cleanSlug]) {
    return COUNTRY_SLUG_MAP[cleanSlug];
  }
  // Title-case fallback: e.g. "south-korea" -> "South Korea"
  return cleanSlug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface RouteState {
  view: 'home' | 'country-visa';
  country?: string;
  section?: string;
}

// Parse current browser location into RouteState
export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { view: 'home' };
  }

  const { pathname, search, hash } = window.location;

  // 1. Check pathname: /visa/:slug or /country/:slug
  const visaPathMatch = pathname.match(/^\/(?:visa|country)\/([^/?#]+)/i);
  if (visaPathMatch && visaPathMatch[1]) {
    return {
      view: 'country-visa',
      country: slugToCountry(decodeURIComponent(visaPathMatch[1])),
    };
  }

  // 2. Check query params: ?country=... or ?visa=...
  if (search) {
    const params = new URLSearchParams(search);
    const countryParam = params.get('country') || params.get('visa');
    if (countryParam) {
      return {
        view: 'country-visa',
        country: slugToCountry(decodeURIComponent(countryParam)),
      };
    }
  }

  // 3. Check hash: #/visa/:slug or #/country/:slug or #explore-events
  if (hash) {
    const cleanHash = hash.replace(/^#/, '');
    const hashVisaMatch = cleanHash.match(/^\/?(?:visa|country)\/([^/?#]+)/i);
    if (hashVisaMatch && hashVisaMatch[1]) {
      return {
        view: 'country-visa',
        country: slugToCountry(decodeURIComponent(hashVisaMatch[1])),
      };
    }

    if (cleanHash === 'explore-events' || cleanHash === 'events' || cleanHash === 'explore') {
      return {
        view: 'home',
        section: 'explore-events',
      };
    }
    if (cleanHash === 'hero-section' || cleanHash === 'hero') {
      return {
        view: 'home',
        section: 'hero-section',
      };
    }
  }

  return { view: 'home' };
}
