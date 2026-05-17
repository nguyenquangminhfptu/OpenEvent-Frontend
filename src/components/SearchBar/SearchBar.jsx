import { useId, useState } from 'react';
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
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor={`${baseId}-keyword`} className={styles.label}>
          Search
        </label>
        <input
          id={`${baseId}-keyword`}
          type="text"
          className={styles.input}
          placeholder="Music, workshop, name..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={`${baseId}-type`} className={styles.label}>
          Type
        </label>
        <select
          id={`${baseId}-type`}
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
        <span className={styles.label}>Time</span>
        <div className={styles.dateRange}>
          <input
            type="date"
            aria-label="From"
            className={styles.input}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <span className={styles.dash} aria-hidden="true">–</span>
          <input
            type="date"
            aria-label="To"
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
