import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StoryList from './pages/StoryList';
import StoryDetail from './pages/StoryDetail';
import Archive from './pages/Archive';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<StoryList type="all" />} />
          <Route path="/story/:slug" element={<StoryDetail />} />
          <Route path="/tag/:tag" element={<StoryList type="tag" />} />
          <Route path="/category/:category" element={<StoryList type="category" />} />
          <Route path="/archive" element={<Archive />} />
          {/* Date-specific archive routes currently reuse the full story list. */}
          <Route path="/archive/:year/:month" element={<StoryList type="all" />} /> 
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
