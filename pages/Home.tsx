import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStories } from '../services/contentService';
import { StoryMetadata } from '../types';
import StoryCard from '../components/StoryCard';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const [latestStories, setLatestStories] = useState<StoryMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getAllStories(language, 1);
      // Take top 3 for hero/featured, next 3 for list
      setLatestStories(result.data.slice(0, 6));
      setLoading(false);
    };
    fetchData();
  }, [language]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const featured = latestStories[0];
  const gridStories = latestStories.slice(1);

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      {featured && (
        <div className="relative bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0">
             <img 
               src={featured.cover || 'https://picsum.photos/1200/600'} 
               alt={featured.title}
               className="w-full h-full object-cover opacity-40"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded mb-4 uppercase tracking-wider">
                {t('latest')}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                <Link to={`/story/${featured.slug}`} className="hover:text-blue-300 transition-colors">
                  {featured.title}
                </Link>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {featured.summary}
              </p>
              <Link 
                to={`/story/${featured.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                {t('readStory')} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Recent Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">{t('recent')}</h2>
          <Link to="/stories" className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
        
        {gridStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500 bg-slate-50 rounded-lg">
            {!featured && t('noStories')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;