// 2.1 StoryFrontmatter & 3.1 content-index.json Schema
export type LanguageCode = 'en' | 'zh' | 'fr';

export interface StoryMetadata {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  updated?: string;
  summary: string;
  cover?: string;
  tags: string[];
  category: string;
  language: LanguageCode;
  readingTime?: number;
  wordCount?: number;
  isDraft: boolean;
  // In a real file-fetch scenario, this might not be here, 
  // but for the demo we simulate content availability.
  content?: string; 
}

// 3.2 tag-index.json
export interface TagIndex {
  tags: Record<string, string[]>; // tagName -> list of slugs
  tagCount: Record<string, number>;
}

// 3.3 category-index.json
export interface CategoryIndex {
  categories: Record<string, string[]>;
  categoryCount: Record<string, number>;
}

// 3.4 archive-index.json
export interface ArchiveIndex {
  archives: Record<string, string[]>; // "YYYY-MM" -> list of slugs
  archiveCount: Record<string, number>;
}

// 3.5 search-index.json
export interface SearchIndexItem {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  category: string;
  date: string;
  language: LanguageCode;
  contentText?: string; // Optional for full index
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}