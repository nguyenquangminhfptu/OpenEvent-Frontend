import styles from './EventCard.module.css';

const VI_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDate(dateLabel) {
  if (!dateLabel) return null;
  // Expect "dd/mm/yyyy". If not matching (e.g. "Hôm nay"), fall back to label.
  const match = dateLabel.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!match) return { primary: dateLabel, secondary: '' };
  const [, dd, mm] = match;
  return { primary: dd, secondary: VI_MONTHS[parseInt(mm, 10) - 1] };
}

function canCheckIn(startsAt) {
  if (!startsAt) return false;
  const start = new Date(startsAt).getTime();
  const now = Date.now();
  return now >= start && now <= start + 15 * 60 * 1000;
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function EventCard({ event, variant = 'default', showCheckin = false }) {
  const percentage = Math.min(
    100,
    Math.round((event.registered / event.capacity) * 100)
  );
  function getDaysUntilEvent(ev) {
    const now = new Date();
    if (ev.startsAt) {
      const diffMs = new Date(ev.startsAt).getTime() - now.getTime();
      const days = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
      return Number.isFinite(days) ? days : null;
    }
    if (!ev.dateLabel) return '';
    if (/hôm nay/i.test(ev.dateLabel)) return 'Today';
    const m = ev.dateLabel.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
    if (m) {
      const [, dd, mm, yy] = m;
      const year = yy.length === 2 ? `20${yy}` : yy;
      const date = new Date(`${year}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}T00:00:00`);
      const diffMs = date.getTime() - now.getTime();
      const days = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
      return Number.isFinite(days) ? days : null;
    }
    return null;
  }
  const daysUntilEvent = getDaysUntilEvent(event);
  const countdownText =
    typeof daysUntilEvent === 'number' && daysUntilEvent > 0 && daysUntilEvent <= 5
      ? daysUntilEvent === 1
        ? 'Còn 1 ngày tới sự kiện'
        : `Còn ${daysUntilEvent} ngày tới sự kiện`
      : null;
  const dateParts = parseDate(event.dateLabel);
  const href = `/${event.eventType.toLowerCase()}/${event.id}`;
  const showCheckinBtn = showCheckin && canCheckIn(event.startsAt);

  return (
    <article className={`${styles.card} ${styles[variant] || ''}`}>
      <a href={href} className={styles.link}>
        <div className={styles.media}>
          <img
            className={styles.cover}
            src={event.imageUrl}
            alt=""
            loading="lazy"
          />
          <div className={styles.mediaOverlay} aria-hidden="true" />

          {dateParts && (
            <div className={styles.dateBadge} aria-hidden="true">
              <span className={styles.dateDay}>{dateParts.primary}</span>
              {dateParts.secondary && (
                <span className={styles.dateMonth}>{dateParts.secondary}</span>
              )}
            </div>
          )}

          <div className={styles.topRight}>
            {event.live && (
              <span className={styles.liveBadge}>
                <span className={styles.livePulse} aria-hidden="true" />
                Live
              </span>
            )}
            {event.soldOut && (
              <span className={styles.soldBadge}>Sold out</span>
            )}
          </div>

          <span className={styles.categoryPill}>{event.eventTypeTag}</span>
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{event.title}</h3>

          <ul className={styles.meta}>
            <li>
              <span className={styles.metaIcon}><MapPinIcon /></span>
              {event.city}
            </li>
            <li>
              <span className={styles.metaIcon}><ClockIcon /></span>
              {event.durationLabel}
            </li>
            <li>
              <span className={styles.metaIcon}><UsersIcon /></span>
              <span className={styles.tabularNum}>{event.registered}</span> going
            </li>
          </ul>

          <div className={styles.footer}>
            <div className={styles.organizer}>
              <span className={styles.organizerAvatar} aria-hidden="true">
                {event.organizer?.[0] || 'O'}
              </span>
              <span className={styles.organizerName}>{event.organizer}</span>
            </div>
          </div>

          {countdownText && (
            <div className={styles.capacityInfo} aria-hidden="true">
              <div className={styles.capacityText}>{countdownText}</div>
            </div>
          )}
        </div>
      </a>

      {showCheckin && (
        <div className={styles.checkin}>
          {showCheckinBtn ? (
            <a
              href={`/events/${event.id}/face-checkin`}
              className={styles.checkinBtn}
            >
              Check-in now
            </a>
          ) : (
            <span className={styles.checkinHint}>
              Opens when the event starts
            </span>
          )}
        </div>
      )}
    </article>
  );
}
