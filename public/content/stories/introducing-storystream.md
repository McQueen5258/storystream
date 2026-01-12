---
title: Introducing StoryStream
date: 2025-05-15
language: en
tags: 
  - meta
  - react
  - blogging
category: Engineering
cover: https://images.unsplash.com/photo-1499750310159-5b5f22693851?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
summary: A deep dive into why we built a pure frontend React markdown blog engine.
---

## Why StoryStream?

We wanted a blog engine that felt like a **digital garden**. No CMS, no databases, just files. 

### The Architecture

StoryStream is built on:
- **React 19**
- **Markdown** for content
- **Tailwind CSS** for styling

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

The code is open source and designed to be deployed to any static host (Vercel, Netlify, GitHub Pages).

### How it works

1. You write `md` files in `content/stories`.
2. A build script generates an index.
3. The React app fetches the index and the content on demand.

It's that simple.