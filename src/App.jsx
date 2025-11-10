import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './shared/components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CategoryPage from './pages/CategoryPage';
import './App.css';

function App() {
  const handleGlobalSearch = (query) => {
    // Manejar búsqueda global desde la navbar
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar onSearch={handleGlobalSearch} />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
