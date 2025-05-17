// Common types used across the application

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Session {
  id: string;
  title: string;
  description: string;
  speakerId: string;
  startTime: string;
  endTime: string;
  track: string;
  location: string;
}

export interface Sponsor {
  id: string;
  name: string;
  level: "platinum" | "gold" | "silver" | "bronze";
  logo: string;
  website: string;
}

export interface HighlightStat {
  value: string;
  label: string;
}

export interface HighlightVideo {
  url: string;
  title: string;
  hashtag: string;
}

export interface HighlightGridItem {
  src: string;
  alt: string;
  caption: string;
}

export interface HighlightsData {
  title: string;
  description: string;
  year: string;
  stats: HighlightStat[];
  video: HighlightVideo;
  grid: HighlightGridItem[];
}
