import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks';
import './SearchBar.css';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Buscar recetas...', 
  className = '',
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className={`search-bar ${className}`}>
      <div className="search-bar__container">
        <Search className="search-bar__icon" size={20} />
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          autoFocus={autoFocus}
        />
        {query && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={clearSearch}
            aria-label="Limpiar búsqueda"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;