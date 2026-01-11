import { StoryMetadata, TagIndex, CategoryIndex, ArchiveIndex, SearchIndexItem } from '../types';

// This file simulates the /generated/*.json files produced by the build pipeline.

const MOCK_CONTENT = `
## A New Beginning

The air in Montreal was crisp this morning. Not the biting cold of deep January, but the gentle, promising chill of late autumn. I walked down Saint-Denis, watching the leaves turn from green to a fiery mix of orange and red.

### The Code

I sat down at a cafe and started writing some **React** code.

\`\`\`typescript
const greeting = "Hello, Montreal!";
console.log(greeting);
\`\`\`

It felt good to be back at the keys. The espresso was strong, the wifi was fast, and the stories were waiting to be told.

### What's Next?

1. Explore the Old Port
2. Buy winter boots
3. Write more code

> "The journey of a thousand miles begins with a single step."
`;

export const contentIndex: StoryMetadata[] = [
  {
    id: "2025-my-first-day",
    slug: "my-first-day",
    title: "My First Day in Montreal",
    date: "2025-10-12",
    summary: "Reflecting on the move, the crisp autumn air, and the first cup of coffee in a new city.",
    cover: "https://picsum.photos/800/400",
    tags: ["travel", "life", "montreal"],
    category: "Journal",
    language: 'en',
    readingTime: 3,
    wordCount: 450,
    isDraft: false,
    content: MOCK_CONTENT
  },
  {
    id: "2025-react-patterns",
    slug: "advanced-react-patterns",
    title: "Advanced React Patterns for 2025",
    date: "2025-09-28",
    summary: "Deep dive into composition, hooks, and performance optimization in the modern React ecosystem.",
    cover: "https://picsum.photos/800/401",
    tags: ["tech", "react", "coding"],
    category: "Tech",
    language: 'en',
    readingTime: 8,
    wordCount: 1200,
    isDraft: false,
    content: "## Composition is King\n\nDon't just use props..."
  },
  {
    id: "2025-winter-prep",
    slug: "preparing-for-winter",
    title: "Preparing for the Long Winter",
    date: "2025-11-05",
    summary: "Coats, boots, and mental resilience. How to survive -20C with a smile.",
    cover: "https://picsum.photos/800/402",
    tags: ["life", "guide"],
    category: "Journal",
    language: 'en',
    readingTime: 5,
    wordCount: 800,
    isDraft: false,
    content: "## Layer Up\n\nIt's not about one big coat..."
  },
  {
    id: "2025-draft-story",
    slug: "unfinished-business",
    title: "Unfinished Business",
    date: "2025-12-01",
    summary: "A draft story that should not appear in production builds.",
    tags: ["thought"],
    category: "Drafts",
    language: 'en',
    isDraft: true,
    content: "TODO"
  }
];

export const tagIndex: TagIndex = {
  tags: {
    "travel": ["my-first-day"],
    "life": ["my-first-day", "preparing-for-winter"],
    "montreal": ["my-first-day"],
    "tech": ["advanced-react-patterns"],
    "react": ["advanced-react-patterns"],
    "coding": ["advanced-react-patterns"],
    "guide": ["preparing-for-winter"]
  },
  tagCount: {
    "travel": 1, "life": 2, "montreal": 1, "tech": 1, "react": 1, "coding": 1, "guide": 1
  }
};

export const categoryIndex: CategoryIndex = {
  categories: {
    "Journal": ["my-first-day", "preparing-for-winter"],
    "Tech": ["advanced-react-patterns"]
  },
  categoryCount: {
    "Journal": 2,
    "Tech": 1
  }
};

export const archiveIndex: ArchiveIndex = {
  archives: {
    "2025-11": ["preparing-for-winter"],
    "2025-10": ["my-first-day"],
    "2025-09": ["advanced-react-patterns"]
  },
  archiveCount: {
    "2025-11": 1, "2025-10": 1, "2025-09": 1
  }
};

// Simplified Search Index
export const searchIndex: SearchIndexItem[] = contentIndex
  .filter(s => !s.isDraft)
  .map(s => ({
    slug: s.slug,
    title: s.title,
    summary: s.summary,
    tags: s.tags,
    category: s.category,
    date: s.date,
    language: s.language,
    contentText: s.content // Included for demo search
  }));