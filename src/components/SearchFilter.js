import React, { useState, useEffect } from 'react';
import './SearchFilter.css';

function SearchFilter({ searchTerm, setSearchTerm, selectedTags, setSelectedTags, allTags }) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(debouncedSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearch, setSearchTerm]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setDebouncedSearch('');
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <div className="search-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search courses by title or description..."
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
          className="search-input"
        />
        {(debouncedSearch || selectedTags.length > 0) && (
          <button className="clear-btn" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="tag-filter">
        <h4>Filter by Tags:</h4>
        <div className="tags-container">
          {allTags.map((tag, index) => (
            <button
              key={index}
              className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {(searchTerm || selectedTags.length > 0) && (
        <div className="active-filters">
          <p>
            Active Filters: 
            {searchTerm && <span className="filter-chip">Search: "{searchTerm}"</span>}
            {selectedTags.map((tag, index) => (
              <span key={index} className="filter-chip">
                {tag}
                <button onClick={() => toggleTag(tag)}>×</button>
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchFilter;
