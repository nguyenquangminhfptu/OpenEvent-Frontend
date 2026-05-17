import { useMemo, useState } from 'react';
import EventCard from '../EventCard/EventCard.jsx';
import styles from './EventSection.module.css';

const VARIANT_CARD = {
  grid: 'default',
  rail: 'rail',
  compact: 'compact',
  feature: 'feature',
};

export default function EventSection({
  eyebrow,
  title,
  events = [],
  filters = [],
  pageSize,
  viewAllHref,
  showCheckin = false,
  variant = 'grid',
  className = '',
  rhythm = 'base',
  muted = false,
  emptyMessage = 'Chưa có sự kiện nào.',
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter((ev) => ev.eventTypeTag === activeFilter);
  }, [events, activeFilter]);

  const resolvedPageSize =
    pageSize ?? (variant === 'feature' ? 3 : variant === 'compact' ? 4 : 6);
  const isPaged = variant !== 'rail';
  const totalPages = Math.max(1, Math.ceil(filtered.length / resolvedPageSize));
  const pageItems = isPaged
    ? filtered.slice(page * resolvedPageSize, (page + 1) * resolvedPageSize)
    : filtered;

  const onFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(0);
  };

  const sectionClasses = [
    'section',
    rhythm === 'snug' && 'section--snug',
    rhythm === 'loose' && 'section--loose',
    muted && 'section-muted',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses}>
      <div className="container">
        <header className="section-header">
          <div className="section-header__title-block">
            {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
            <h2 className="section-title">{title}</h2>
          </div>

          <div className={styles.headerControls}>
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
                View all <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </header>

        {filtered.length > 0 ? (
          <>
            {variant === 'rail' && (
              <div className={styles.rail}>
                {pageItems.map((ev) => (
                  <EventCard key={ev.id} event={ev} showCheckin={showCheckin} />
                ))}
              </div>
            )}

            {variant === 'grid' && (
              <div className="grid grid-3">
                {pageItems.map((ev) => (
                  <EventCard key={ev.id} event={ev} showCheckin={showCheckin} />
                ))}
              </div>
            )}

            {variant === 'compact' && (
              <div className={styles.compactList}>
                {pageItems.map((ev) => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    variant={VARIANT_CARD.compact}
                    showCheckin={showCheckin}
                  />
                ))}
              </div>
            )}

            {variant === 'feature' && pageItems.length > 0 && (
              <div className={styles.featureGrid}>
                <div className={styles.featurePrimary}>
                  <EventCard
                    event={pageItems[0]}
                    variant={VARIANT_CARD.feature}
                    showCheckin={showCheckin}
                  />
                </div>
                <div className={styles.featureSecondary}>
                  {pageItems.slice(1).map((ev) => (
                    <EventCard
                      key={ev.id}
                      event={ev}
                      variant={VARIANT_CARD.compact}
                      showCheckin={showCheckin}
                    />
                  ))}
                </div>
              </div>
            )}

            {isPaged && totalPages > 1 && (
              <div className={styles.pager}>
                <button
                  className="icon-btn"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  aria-label="Previous page"
                >
                  ‹ Previous
                </button>
                <span className={styles.pagerInfo}>
                  {page + 1} <span aria-hidden="true">/</span> {totalPages}
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
