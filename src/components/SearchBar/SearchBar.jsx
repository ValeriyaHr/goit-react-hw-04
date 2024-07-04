import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search query.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <Toaster position="top-right" />
    </header>
  );
};

export default SearchBar;
