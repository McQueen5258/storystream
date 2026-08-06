import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, BookOpen, Archive, Github, Globe, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageCode } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as LanguageCode);
    setIsMobileMenuOpen(false);
    // Optional: Navigate to home on language switch to avoid 404s if slugs don't match across langs
    navigate('/'); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <BookOpen size={20} />
                </div>
                <span className="font-serif font-bold text-xl tracking-tight">StoryStream</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                {t('home')}
              </Link>
              <Link to="/stories" className={`text-sm font-medium transition-colors ${location.pathname.startsWith('/stories') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                {t('stories')}
              </Link>
              <Link to="/archive" className={`text-sm font-medium transition-colors ${location.pathname.startsWith('/archive') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                {t('archive')}
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
               {/* Language Switcher */}
              <div className="relative flex items-center text-slate-500">
                <Globe size={16} className="absolute left-2 pointer-events-none" />
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  className="pl-8 pr-8 py-1.5 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-100 appearance-none font-medium"
                >
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-48 pl-4 pr-10 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                  <Search size={16} />
                </button>
              </form>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-4">
              <div className="relative flex items-center text-slate-500">
                <Globe size={16} className="absolute left-2 pointer-events-none" />
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  className="pl-7 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="en">EN</option>
                  <option value="zh">中</option>
                  <option value="fr">FR</option>
                </select>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                {t('home')}
              </Link>
              <Link to="/stories" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                {t('stories')}
              </Link>
              <Link to="/archive" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                {t('archive')}
              </Link>
            </div>
            <div className="px-4 py-3 border-t border-slate-100">
               <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-4 pr-10 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search size={16} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
               <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white">
                  <BookOpen size={14} />
                </div>
                <span className="font-serif font-bold text-lg">StoryStream</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">{t('navigation')}</h3>
              <ul className="space-y-3">
                <li><Link to="/stories" className="text-slate-500 hover:text-blue-600 text-sm">{t('stories')}</Link></li>
                <li><Link to="/archive" className="text-slate-500 hover:text-blue-600 text-sm">{t('archive')}</Link></li>
                <li><Link to="/search" className="text-slate-500 hover:text-blue-600 text-sm">{t('search')}</Link></li>
              </ul>
            </div>

             <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">{t('connect')}</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/mcqueen5258" className="text-slate-400 hover:text-slate-900">
                  <span className="sr-only">GitHub</span>
                  <Github size={20} />
                </a>
                {/* <a href="/rss.xml" className="text-slate-400 hover:text-orange-500">
                  <span className="sr-only">RSS</span>
                  <Archive size={20} />
                </a> */}
                 <a href="https://www.linkedin.com/in/eric-uwizeye-a97218366" className="text-slate-400 hover:text-orange-500">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-8 text-center">
            <p className="text-slate-400 text-xs">
              &copy; {new Date().getFullYear()} StoryStream. {t('rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;