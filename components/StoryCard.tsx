import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { StoryMetadata } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface StoryCardProps {
  story: StoryMetadata;
  compact?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, compact = false }) => {
  const { t } = useLanguage();

  return (
    <div className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-200">
      {story.cover && (
        <div className={`relative overflow-hidden ${compact ? 'h-40' : 'h-56'}`}>
          <img 
            src={story.cover} 
            alt={story.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-slate-700 uppercase tracking-wide">
            {story.category}
          </div>
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <time dateTime={story.date}>{story.date}</time>
          </div>
          {story.readingTime && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{story.readingTime} {t('minRead')}</span>
            </div>
          )}
        </div>

        <Link to={`/story/${story.slug}`}>
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {story.title}
          </h3>
        </Link>
        
        <p className="text-slate-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
          {story.summary}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
          {story.tags.map(tag => (
            <Link 
              key={tag} 
              to={`/tag/${tag}`}
              className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Tag size={12} />
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;