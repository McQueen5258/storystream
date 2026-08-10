# StoryStream

A multilingual digital garden for thoughts, stories, and code.

Built as a frontend-focused personal project for publishing and exploring Markdown-based content across multiple languages.

**[View Live Site →](https://eric-storystream.vercel.app)**

## Features

- Markdown-based stories with frontmatter metadata
- English, Chinese, and French interface support
- Story browsing with pagination
- Tag and category filtering
- Search across titles, summaries, and tags
- Story archive
- Draft and language-aware content filtering
- Responsive web interface

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- React Markdown
- remark-gfm
- js-yaml

## Architecture

StoryStream is a frontend-only content application built around a Markdown-driven content layer.

Stories are stored as Markdown files and exposed through a generated content index. A dedicated content service handles loading, filtering, pagination, search, tags, categories, and archive data.

Application responsibilities are separated into:

- `pages/` — route-level screens
- `components/` — reusable UI
- `contexts/` — shared application state such as language
- `services/` — content access and filtering
- `utils/` — Markdown/frontmatter utilities
- `public/content/` — Markdown story content

Language preference is managed through React context and persisted locally in the browser.

## Running Locally

### Prerequisites

- Node.js
- npm

### Setup

```bash
git clone https://github.com/McQueen5258/storystream.git
cd storystream
npm install
npm run dev
Then open the local Vite development URL shown in your terminal.
```
## Project Status
Active personal project.
StoryStream is also where I publish and experiment with ideas around writing, frontend development, and multilingual content experiences.
