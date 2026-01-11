import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getAllStories, getStoriesByTag, getStoriesByCategory } from '../services/contentService';
import { StoryMetadata } from '../types';
import StoryCard from '../components/StoryCard';
import { ChevronLeft, ChevronRight, Hash, Folder } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface StoryListProps {
  type: 'all' | 'tag' | 'category';
}

const StoryList: React.FC<StoryListProps> = ({ type }) => {
  const [stories, setStories] = useState<StoryMetadata[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const { tag, category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let result;
      
      try {
        if (type === 'tag' && tag) {
          result = await getStoriesByTag(language, tag, page);
        } else if (type === 'category' && category) {
          result = await getStoriesByCategory(language, category, page);
        } else {
          result = await getAllStories(language, page);
        }
        
        setStories(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Failed to fetch stories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [type, tag, category, page, language]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString() });
    }
  };

  const getHeader = () => {
    if (type === 'tag') {
      return (
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Hash size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t('tag')}: {tag}</h1>
            <p className="text-slate-500">{total} {t('found')}</p>
          </div>
        </div>
      );
    }
    if (type === 'category') {
      return (
        <div className="flex items-center gap-3 mb-2">
           <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Folder size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t('category')}: {category}</h1>
            <p className="text-slate-500">{total} {t('found')}</p>
          </div>
        </div>
      );
    }
    return <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('stories')}</h1>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-slate-200 pb-8">
        {getHeader()}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-96 bg-slate-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : stories.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="p-2 border border-slate-300 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-slate-600 font-medium">
                {t('page')} {page} {t('of')} {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="p-2 border border-slate-300 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-lg">
          <p className="text-slate-500 text-lg">{t('noStories')}</p>
        </div>
      )}
    </div>
  );
};

export default StoryList;