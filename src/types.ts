export interface Slide {
  id: string;
  region: string;
  country: string;
  flagCode?: string;
  title: string;
  image: string;
  description: string;
  coordinates: string;
  altitude?: string;
  bestSeason: string;
  highlight: string;
}

export type TransitionDirection = 'next' | 'prev';
