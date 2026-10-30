export interface Post {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
  content: string;
  readingTimeMinutes: number;
}

export type ToolType = 'internal' | 'embed' | 'external';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  type: ToolType;
  url: string;
  order: number;
  featured?: boolean;
  badgeText?: string;
  embedNotice?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
