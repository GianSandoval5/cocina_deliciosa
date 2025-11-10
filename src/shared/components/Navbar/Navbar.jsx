import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChefHat } from 'lucide-react';
import { SearchBar } from '../../../shared/components';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <ChefHat className="navbar__logo-icon" size={32} />
            <span className="navbar__logo-text">CocinaDeliciosa</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar__menu">
            <Link 
              to="/" 
              className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
            >
              Inicio
            </Link>
            <Link 
              to="/search" 
              className={`navbar__link ${location.pathname === '/search' ? 'navbar__link--active' : ''}`}
            >
              Buscar
            </Link>
          </div>

          {/* Search and Menu Actions */}
          <div className="navbar__actions">
            {!isHomePage && (
              <button
                className="navbar__search-toggle"
                onClick={toggleSearch}
                aria-label="Buscar recetas"
              >
                <Search size={20} />
              </button>
            )}
            
            <button
              className="navbar__menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && !isHomePage && (
          <div className="navbar__search-mobile">
            <SearchBar 
              onSearch={onSearch}
              placeholder="Buscar recetas..."
              autoFocus
            />
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="navbar__overlay" onClick={closeMenu}>
          <div className="navbar__mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="navbar__mobile-header">
              <ChefHat className="navbar__mobile-logo" size={32} />
              <span className="navbar__mobile-title">CocinaDeliciosa</span>
              <button
                className="navbar__mobile-close"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="navbar__mobile-links">
              <Link 
                to="/" 
                className="navbar__mobile-link"
                onClick={closeMenu}
              >
                🏠 Inicio
              </Link>
              <Link 
                to="/search" 
                className="navbar__mobile-link"
                onClick={closeMenu}
              >
                🔍 Buscar
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;