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

  return (
    <article className={`${styles.card} ${styles[variant] || ''}`}>
      <a href={href} className={styles.link}>
        <img
          className={styles.cover}
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
        />
        <div className={styles.body}>
          <h3 className={styles.title}>{event.title}</h3>
          <p className={styles.meta}>
            {event.city} • {event.dateLabel} • {event.durationLabel}
          </p>
          <p className={styles.org}>Organizer: {event.organizer}</p>

          <div className={styles.capacity}>
            <div className={styles.capacityRow}>
              <span>
                Registered: {event.registered} / {event.capacity}
              </span>
              <span className={styles.price}>Price: {event.priceLabel}</span>
            </div>
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: `${percentage}%` }} />
            </div>
          </div>

          <div className={styles.tags}>
            <span className="tag">#{event.eventTypeTag}</span>
            {event.live && <span className="badge badge-live">Live</span>}
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
