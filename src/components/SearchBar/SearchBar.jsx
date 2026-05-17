import { useState } from 'react';
import styles from './SearchBar.module.css';

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'MUSIC', label: 'Music' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'FESTIVAL', label: 'Festival' },
  { value: 'CONFERENCE', label: 'Conference' },
  { value: 'COMPETITION', label: 'Competition' },
  { value: 'OTHER', label: 'Other' },
];

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({ keyword, type, from, to });
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Search</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Music"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Type</label>
        <select
          className={styles.input}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Time</label>
        <div className={styles.dateRange}>
          <input
            type="date"
            className={styles.input}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <span className={styles.dash}>–</span>
          <input
            type="date"
            className={styles.input}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className={styles.submit}>
        Search Events
      </button>
    </form>
  );
}
