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
          {/* Note: Archive by date uses the same list component logic but we'd need a specific filter function. 
              For simplicity in this demo, we route specific archive dates to the general list or we could implement a specific ArchiveList.
              Here we just redirect to main stories for demonstration, or we could add type="archive" to StoryList if we expanded the service.
          */}
          <Route path="/archive/:year/:month" element={<StoryList type="all" />} /> 
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;