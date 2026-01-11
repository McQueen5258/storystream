import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// In a real app, include syntax highlighting components like react-syntax-highlighter here

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <article className="prose prose-lg prose-slate max-w-none 
      prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 
      prose-p:text-slate-700 prose-p:leading-8
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-xl prose-img:shadow-md
      prose-pre:bg-slate-800 prose-pre:rounded-xl prose-pre:shadow-lg
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
      ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownRenderer;