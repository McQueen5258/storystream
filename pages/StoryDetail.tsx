import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStoryBySlug } from '../services/contentService';
import { StoryMetadata } from '../types';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<StoryMetadata & { content?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return;
      setLoading(true);
      setError(false);
      try {
        const data = await getStoryBySlug(slug);
        
        if (!data) {
          setError(true);
        } else {
          setStory(data);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm animate-pulse">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-slate-600 mb-8">Story not found.</p>
        <Link to="/stories" className="text-blue-600 hover:underline">{t('backToStories')}</Link>
      </div>
    );
  }

  return (
    <article className="pb-20">
      {/* Header with Cover */}
      <div className="w-full bg-slate-900 mb-12">
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          {story.cover && (
            <img 
              src={story.cover} 
              alt={story.title} 
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <Link to={`/category/${story.category}`} className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded mb-4 uppercase hover:bg-blue-700 transition-colors">
                {story.category}
              </Link>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight shadow-black drop-shadow-lg">
                {story.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-slate-200 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <time>{story.date}</time>
                </div>
                {story.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{story.readingTime} {t('minRead')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb-ish back link */}
        <Link to="/stories" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> {t('backToStories')}
        </Link>

        {/* Main Content */}
        <div className="bg-white p-0 md:p-10 md:shadow-sm md:rounded-2xl md:border md:border-slate-100">
           {story.content ? (
             <MarkdownRenderer content={story.content} />
           ) : (
             <div className="py-10 text-center text-slate-500">No content available.</div>
           )}
        </div>

        {/* Footer Meta */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-2">
            {story.tags.map(tag => (
              <Link 
                key={tag} 
                to={`/tag/${tag}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                <Tag size={14} />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryDetail;