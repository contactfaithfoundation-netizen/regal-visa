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
  view: 'home' | 'country-visa' | 'blogs' | 'blog-detail' | 'visas';
  country?: string;
  blogSlug?: string;
  section?: string;
}

// Parse current browser location into RouteState
export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { view: 'home' };
  }

  const { pathname, search, hash } = window.location;

  // 1. Check pathname: /blog/:slug
  const blogDetailMatch = pathname.match(/^\/blog\/([^/?#]+)/i);
  if (blogDetailMatch && blogDetailMatch[1]) {
    const slug = decodeURIComponent(blogDetailMatch[1]);
    if (slug === 'all' || slug === 'list') {
      return { view: 'blogs' };
    }
    return {
      view: 'blog-detail',
      blogSlug: slug,
    };
  }

  // 2. Check pathname: /blogs
  if (/^\/blogs\/?$/i.test(pathname)) {
    return { view: 'blogs' };
  }

  // 3. Check pathname: /visas or /all-visas
  if (/^\/(?:visas|all-visas)\/?$/i.test(pathname)) {
    return { view: 'visas' };
  }

  // 4. Check pathname: /visa/:slug or /country/:slug
  const visaPathMatch = pathname.match(/^\/(?:visa|country)\/([^/?#]+)/i);
  if (visaPathMatch && visaPathMatch[1]) {
    const val = decodeURIComponent(visaPathMatch[1]).toLowerCase();
    if (val === 'all' || val === 'explore') {
      return { view: 'visas' };
    }
    return {
      view: 'country-visa',
      country: slugToCountry(val),
    };
  }

  // 5. Check query params: ?blog=... or ?view=...
  if (search) {
    const params = new URLSearchParams(search);
    const blogParam = params.get('blog');
    if (blogParam) {
      return {
        view: 'blog-detail',
        blogSlug: blogParam,
      };
    }
    const viewParam = params.get('view');
    if (viewParam === 'blogs') return { view: 'blogs' };
    if (viewParam === 'visas') return { view: 'visas' };

    const countryParam = params.get('country') || params.get('visa');
    if (countryParam) {
      return {
        view: 'country-visa',
        country: slugToCountry(decodeURIComponent(countryParam)),
      };
    }
  }

  // 6. Check hash
  if (hash) {
    const cleanHash = hash.replace(/^#/, '');

    const hashBlogDetailMatch = cleanHash.match(/^\/?blog\/([^/?#]+)/i);
    if (hashBlogDetailMatch && hashBlogDetailMatch[1]) {
      return {
        view: 'blog-detail',
        blogSlug: decodeURIComponent(hashBlogDetailMatch[1]),
      };
    }

    if (cleanHash === 'blogs' || cleanHash === '/blogs') {
      return { view: 'blogs' };
    }

    if (cleanHash === 'visas' || cleanHash === '/visas') {
      return { view: 'visas' };
    }

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
    if (cleanHash === 'blog-section' || cleanHash === 'blogs-section') {
      return {
        view: 'home',
        section: 'blog-section',
      };
    }
  }

  return { view: 'home' };
}
