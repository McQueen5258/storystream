import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArchiveTree } from '../services/contentService';
import { ArchiveIndex } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Archive: React.FC = () => {
  const [archiveData, setArchiveData] = useState<ArchiveIndex | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    getArchiveTree(language).then(setArchiveData);
  }, [language]);

  if (!archiveData) return <div>{t('loading')}</div>;

  // Group by Year for better UI
  const years: Record<string, string[]> = {};
  
  Object.keys(archiveData.archives).sort().reverse().forEach(dateKey => {
    const [year, month] = dateKey.split('-');
    if (!years[year]) years[year] = [];
    years[year].push(month);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">{t('archive')}</h1>
      
      {Object.keys(years).length === 0 ? (
        <div className="text-slate-500">{t('noStories')}</div>
      ) : (
        <div className="space-y-12">
          {Object.keys(years).sort().reverse().map(year => (
            <div key={year} className="relative border-l-2 border-slate-200 pl-8 ml-4">
              <span className="absolute -left-3 top-0 flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full border-2 border-slate-200 font-bold text-xs text-slate-500">
                
              </span>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{year}</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {years[year].map(month => {
                  const key = `${year}-${month}`;
                  const count = archiveData.archiveCount[key];
                  const dateObj = new Date(parseInt(year), parseInt(month) - 1);
                  const monthName = dateObj.toLocaleString(language === 'zh' ? 'zh-CN' : (language === 'fr' ? 'fr-FR' : 'en-US'), { month: 'long' });

                  return (
                    <Link 
                      key={key} 
                      to={`/archive/${year}/${month}`}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all group"
                    >
                      <span className="font-medium text-slate-700 group-hover:text-blue-700">{monthName}</span>
                      <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-full">{count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;