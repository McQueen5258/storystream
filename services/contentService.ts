import { StoryMetadata, PaginatedResult, TagIndex, CategoryIndex, ArchiveIndex, LanguageCode } from '../types';
import { parseFrontmatter } from '../utils/frontmatter';

// Schema for the content-index.json item
interface IndexItem extends StoryMetadata {
  path: string; // Path to the .md file
}

const PAGE_SIZE = 6;
const INDEX_URL = '/generated/content-index.json';

// Cache the index in memory to avoid repeated network calls
let indexCache: IndexItem[] | null = null;

async function getIndex(): Promise<IndexItem[]> {
  if (indexCache) return indexCache;
  try {
    const res = await fetch(INDEX_URL);
    if (!res.ok) throw new Error('Failed to load content index');
    const data = await res.json();
    indexCache = data;
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const getAllStories = async (language: LanguageCode, page: number = 1): Promise<PaginatedResult<StoryMetadata>> => {
  const all = await getIndex();
  const published = all
    .filter(s => !s.isDraft && s.language === language)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const startIndex = (page - 1) * PAGE_SIZE;
  const data = published.slice(startIndex, startIndex + PAGE_SIZE);

  return {
    data,
    total: published.length,
    currentPage: page,
    totalPages: Math.ceil(published.length / PAGE_SIZE)
  };
};

export const getStoryBySlug = async (slug: string): Promise<StoryMetadata & { content?: string } | undefined> => {
  const all = await getIndex();
  const metadata = all.find(s => s.slug === slug);
  
  if (!metadata) return undefined;

  try {
    // Fetch the actual markdown content
    const res = await fetch(metadata.path);
    if (!res.ok) throw new Error('Failed to load story content');
    const text = await res.text();
    
    // Parse it again to ensure we have the latest content and separate body
    // although metadata is in index, the body is in the file
    const { content: body } = parseFrontmatter(text);
    
    return {
      ...metadata,
      content: body
    };
  } catch (e) {
    console.error('Error fetching markdown:', e);
    return metadata;
  }
};

export const getStoriesByTag = async (language: LanguageCode, tag: string, page: number = 1): Promise<PaginatedResult<StoryMetadata>> => {
  const all = await getIndex();
  const filtered = all.filter(s => s.tags && s.tags.includes(tag) && !s.isDraft && s.language === language);
  const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const startIndex = (page - 1) * PAGE_SIZE;
  const data = sorted.slice(startIndex, startIndex + PAGE_SIZE);

  return {
    data,
    total: filtered.length,
    currentPage: page,
    totalPages: Math.ceil(filtered.length / PAGE_SIZE)
  };
};

export const getStoriesByCategory = async (language: LanguageCode, category: string, page: number = 1): Promise<PaginatedResult<StoryMetadata>> => {
  const all = await getIndex();
  const filtered = all.filter(s => s.category === category && !s.isDraft && s.language === language);
  const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const startIndex = (page - 1) * PAGE_SIZE;
  const data = sorted.slice(startIndex, startIndex + PAGE_SIZE);

  return {
    data,
    total: filtered.length,
    currentPage: page,
    totalPages: Math.ceil(filtered.length / PAGE_SIZE)
  };
};

export const getArchiveTree = async (language: LanguageCode): Promise<ArchiveIndex> => {
  const all = await getIndex();
  const archives: Record<string, string[]> = {};
  const archiveCount: Record<string, number> = {};

  all.forEach(story => {
    if (story.isDraft || story.language !== language) return;
    // Assume date is YYYY-MM-DD
    const key = story.date.substring(0, 7); // YYYY-MM
    if (!archives[key]) {
      archives[key] = [];
      archiveCount[key] = 0;
    }
    archives[key].push(story.slug);
    archiveCount[key]++;
  });

  return { archives, archiveCount };
};

export const searchStories = async (language: LanguageCode, query: string): Promise<StoryMetadata[]> => {
  const all = await getIndex();
  const lowerQ = query.toLowerCase();
  
  return all.filter(item => {
    return (
      item.language === language &&
      !item.isDraft &&
      (
        item.title.toLowerCase().includes(lowerQ) ||
        item.summary.toLowerCase().includes(lowerQ) ||
        item.tags.some(t => t.toLowerCase().includes(lowerQ))
      )
    );
  });
};

export const getAllTags = async (language: LanguageCode): Promise<TagIndex> => {
  const all = await getIndex();
  const tags: Record<string, string[]> = {};
  const tagCount: Record<string, number> = {};

  all.forEach(story => {
    if (story.isDraft || story.language !== language) return;
    story.tags.forEach(tag => {
      if (!tags[tag]) {
        tags[tag] = [];
        tagCount[tag] = 0;
      }
      tags[tag].push(story.slug);
      tagCount[tag]++;
    });
  });

  return { tags, tagCount };
};

export const getAllCategories = async (language: LanguageCode): Promise<CategoryIndex> => {
  const all = await getIndex();
  const categories: Record<string, string[]> = {};
  const categoryCount: Record<string, number> = {};

  all.forEach(story => {
    if (story.isDraft || story.language !== language) return;
    if (!categories[story.category]) {
      categories[story.category] = [];
      categoryCount[story.category] = 0;
    }
    categories[story.category].push(story.slug);
    categoryCount[story.category]++;
  });

  return { categories, categoryCount };
};