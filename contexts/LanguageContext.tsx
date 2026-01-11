import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../types';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const translations = {
  en: {
    home: 'Home',
    stories: 'Stories',
    archive: 'Archive',
    search: 'Search',
    latest: 'Latest Story',
    readStory: 'Read Story',
    recent: 'Recent Stories',
    viewAll: 'View All',
    minRead: 'min read',
    page: 'Page',
    of: 'of',
    found: 'stories found',
    noStories: 'No stories found.',
    loading: 'Loading...',
    backToStories: 'Back to stories',
    tag: 'Tag',
    category: 'Category',
    rights: 'Pure frontend delivery.',
    searchPlaceholder: 'Search stories...',
    searchResults: 'Search Results',
    resultsFor: 'Results for',
    connect: 'Connect',
    navigation: 'Navigation',
    description: 'A digital garden for thoughts, stories, and code.',
  },
  zh: {
    home: '首页',
    stories: '文章',
    archive: '归档',
    search: '搜索',
    latest: '最新发布',
    readStory: '阅读全文',
    recent: '最近更新',
    viewAll: '查看全部',
    minRead: '分钟阅读',
    page: '第',
    of: '页 / 共',
    found: '篇文章',
    noStories: '暂无文章',
    loading: '加载中...',
    backToStories: '返回列表',
    tag: '标签',
    category: '分类',
    rights: '纯前端交付',
    searchPlaceholder: '搜索文章...',
    searchResults: '搜索结果',
    resultsFor: '搜索关键词',
    connect: '关注',
    navigation: '导航',
    description: '一个关于思考、故事和代码的数字花园。',
  },
  fr: {
    home: 'Accueil',
    stories: 'Histoires',
    archive: 'Archives',
    search: 'Recherche',
    latest: 'Dernière histoire',
    readStory: 'Lire l\'histoire',
    recent: 'Histoires récentes',
    viewAll: 'Voir tout',
    minRead: 'min de lecture',
    page: 'Page',
    of: 'sur',
    found: 'histoires trouvées',
    noStories: 'Aucune histoire trouvée.',
    loading: 'Chargement...',
    backToStories: 'Retour aux histoires',
    tag: 'Tag',
    category: 'Catégorie',
    rights: 'Livraison pure frontend.',
    searchPlaceholder: 'Rechercher...',
    searchResults: 'Résultats de recherche',
    resultsFor: 'Résultats pour',
    connect: 'Connecter',
    navigation: 'Navigation',
    description: 'Un jardin numérique pour les pensées, les histoires et le code.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    const saved = localStorage.getItem('app-language') as LanguageCode;
    if (saved && (saved === 'en' || saved === 'zh' || saved === 'fr')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};