import { useId, useState } from 'react';
import styles from './SearchBar.module.css';

const TYPES = [
  { value: 'all', label: 'All types' },
  { value: 'MUSIC', label: 'Music' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'FESTIVAL', label: 'Festival' },
  { value: 'CONFERENCE', label: 'Conference' },
  { value: 'COMPETITION', label: 'Competition' },
  { value: 'OTHER', label: 'Other' },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export default function SearchBar({ onSearch }) {
  const baseId = useId();
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({ keyword, type, from, to });
  };

  return (
    <form className={styles.panel} onSubmit={handleSubmit} role="search">
      <div className={styles.field}>
        <label htmlFor={`${baseId}-keyword`} className={styles.label}>
          <SearchIcon />
          <span>What</span>
        </label>
        <input
          id={`${baseId}-keyword`}
          type="text"
          className={styles.input}
          placeholder="Music night, AI workshop..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoComplete="off"
        />
      </div>

      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.field}>
        <label htmlFor={`${baseId}-type`} className={styles.label}>
          <TagIcon />
          <span>Type</span>
        </label>
        <div className={styles.selectWrap}>
          <select
            id={`${baseId}-type`}
            className={`${styles.input} ${styles.select}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <svg className={styles.selectChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.field}>
        <span className={styles.label}>
          <CalendarIcon />
          <span>When</span>
        </span>
        <div className={styles.dateRange}>
          <input
            type="date"
            aria-label="From"
            className={`${styles.input} ${styles.dateInput}`}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <span className={styles.rangeDash} aria-hidden="true">→</span>
          <input
            type="date"
            aria-label="To"
            className={`${styles.input} ${styles.dateInput}`}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className={styles.submit} aria-label="Search events">
        <SearchIcon />
        <span>Search</span>
      </button>
    </form>
  );
}
