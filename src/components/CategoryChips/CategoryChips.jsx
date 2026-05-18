import styles from './CategoryChips.module.css';

const CATEGORIES = [
  {
    key: 'all',
    label: 'All',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    key: 'Music',
    label: 'Music',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    key: 'Workshop',
    label: 'Workshop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 2h6l3 5-6 14-6-14 3-5z" />
        <path d="M11 14h2M9 7h6" />
      </svg>
    ),
  },
  {
    key: 'Festival',
    label: 'Festival',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1 3-6z" />
      </svg>
    ),
  },
  {
    key: 'Conference',
    label: 'Conference',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11a8 8 0 0 1 14.5-4.7M21 13a8 8 0 0 1-14.5 4.7" />
        <path d="M16 8h5V3M8 16H3v5" />
      </svg>
    ),
  },
  {
    key: 'Competition',
    label: 'Competition',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 21h8M12 17v4M5 4h14v6a7 7 0 0 1-14 0V4z" />
        <path d="M5 8H2v2a3 3 0 0 0 3 3M19 8h3v2a3 3 0 0 1-3 3" />
      </svg>
    ),
  },
  {
    key: 'Other',
    label: 'Other',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="5" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="19" cy="12" r="1.5" />
      </svg>
    ),
  },
];

export default function CategoryChips({ active = 'all', onChange }) {
  return (
    <nav className={styles.wrap} aria-label="Event categories">
      <ul className={styles.list} role="tablist">
        {CATEGORIES.map((c) => {
          const isActive = c.key === active;
          return (
            <li key={c.key}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange?.(c.key)}
                className={`${styles.chip} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{c.icon}</span>
                <span className={styles.label}>{c.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
