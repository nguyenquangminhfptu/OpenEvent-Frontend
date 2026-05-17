import { useMemo, useState } from 'react';
import EventCard from '../EventCard/EventCard.jsx';
import styles from './EventSection.module.css';

export default function EventSection({
  title,
  events = [],
  filters = [],
  pageSize = 3,
  viewAllHref,
  showCheckin = false,
  emptyMessage = 'Chưa có sự kiện nào.',
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter((ev) => ev.eventTypeTag === activeFilter);
  }, [events, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const onFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(0);
  };

  return (
    <section className="section">
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">{title}</h2>

          {filters.length > 0 && (
            <div className="chip-group">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`chip ${activeFilter === f ? 'is-active' : ''}`}
                  onClick={() => onFilterChange(f)}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
          )}

          {viewAllHref && (
            <a className={styles.viewAll} href={viewAllHref}>
              View all →
            </a>
          )}
        </div>

        {filtered.length > 0 ? (
          <>
            <div className="grid grid-3">
              {pageItems.map((ev) => (
                <EventCard key={ev.id} event={ev} showCheckin={showCheckin} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pager}>
                <button
                  className="icon-btn"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  aria-label="Previous page"
                >
                  ‹ Previous
                </button>
                <span>
                  {page + 1} / {totalPages}
                </span>
                <button
                  className="icon-btn"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  aria-label="Next page"
                >
                  Next ›
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.empty}>
            <p>{emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}
