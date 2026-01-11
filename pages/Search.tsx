import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchStories } from '../services/contentService';
import { StoryMetadata } from '../types';
import StoryCard from '../components/StoryCard';
import { Search as SearchIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<StoryMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setLoading(true);
      const hits = await searchStories(language, query);
      setResults(hits);
      setLoading(false);
    };
    doSearch();
  }, [query, language]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{t('searchResults')}</h1>
        <div className="inline-flex items-center gap-2 text-lg text-slate-600">
          <SearchIcon size={20} />
          <span>{t('resultsFor')} "{query}"</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center">{t('loading')}</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500">{t('noStories')}</p>
        </div>
      )}
    </div>
  );
};

export default Search;