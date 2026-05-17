import styles from './EventCard.module.css';

function canCheckIn(startsAt) {
  if (!startsAt) return false;
  const start = new Date(startsAt).getTime();
  const now = Date.now();
  return now >= start && now <= start + 15 * 60 * 1000;
}

export default function EventCard({ event, variant = 'default', showCheckin = false }) {
  const percentage = Math.min(
    100,
    Math.round((event.registered / event.capacity) * 100)
  );

  const href = `/${event.eventType.toLowerCase()}/${event.id}`;
  const showCheckinBtn = showCheckin && canCheckIn(event.startsAt);
  const cardClass = `${styles.card} ${styles[variant] || ''}`;

  return (
    <article className={cardClass}>
      <a href={href} className={styles.link}>
        <div className={styles.media}>
          <img
            className={styles.cover}
            src={event.imageUrl}
            alt=""
            loading="lazy"
          />
          {event.live && (
            <span className={`badge badge-live ${styles.liveBadge}`}>● Live</span>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.headline}>
            <h3 className={styles.title}>{event.title}</h3>
            <p className={styles.meta}>
              <span>{event.city}</span>
              <span className={styles.dot} aria-hidden="true">·</span>
              <span>{event.dateLabel}</span>
              <span className={styles.dot} aria-hidden="true">·</span>
              <span>{event.durationLabel}</span>
            </p>
          </div>

          <p className={styles.org}>By {event.organizer}</p>

          <div className={styles.capacity}>
            <div className={styles.capacityRow}>
              <span>
                {event.registered} / {event.capacity} registered
              </span>
              <span className={styles.price}>{event.priceLabel}</span>
            </div>
            <div className={styles.bar} aria-hidden="true">
              <div className={styles.fill} style={{ width: `${percentage}%` }} />
            </div>
          </div>

          <div className={styles.tags}>
            <span className="tag">#{event.eventTypeTag}</span>
            {event.soldOut && <span className="tag">Sold Out</span>}
          </div>
        </div>
      </a>

      {showCheckin && (
        <div className={styles.checkin}>
          {showCheckinBtn ? (
            <a
              href={`/events/${event.id}/face-checkin`}
              className={styles.checkinBtn}
            >
              📷 Check-in khuôn mặt
            </a>
          ) : (
            <span className={styles.checkinHint}>
              Check-in mở khi sự kiện bắt đầu
            </span>
          )}
        </div>
      )}
    </article>
  );
}
