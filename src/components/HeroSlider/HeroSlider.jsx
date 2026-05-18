import { useEffect, useId, useRef, useState } from 'react';
import styles from './HeroSlider.module.css';

const AUTOPLAY_MS = 6500;
const SWIPE_THRESHOLD = 50;

const FALLBACK_SLIDE = {
  id: 'fallback',
  imageUrl: 'https://picsum.photos/seed/openevent-hero/1920/1080',
  title: 'OpenEvent',
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(q.matches);
    update();
    q.addEventListener?.('change', update);
    return () => q.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

export default function HeroSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const reduced = usePrefersReducedMotion();
  const carouselId = useId();

  const displaySlides = slides.length ? slides : [FALLBACK_SLIDE];
  const count = displaySlides.length;

  const go = (next) => setIndex((current) => (next + count) % count);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (count <= 1 || reduced || paused) return;
    timerRef.current = setInterval(
      () => setIndex((current) => (current + 1) % count),
      AUTOPLAY_MS
    );
    return () => clearInterval(timerRef.current);
  }, [count, reduced, paused, index]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      go(delta < 0 ? index + 1 : index - 1);
    }
    touchStartX.current = null;
  };

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured event posters"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.media} id={carouselId}>
        {displaySlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${i === index ? styles.slideActive : ''}`}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${slide.title}`}
            aria-hidden={i !== index}
          />
        ))}
        <div className={styles.anchorFade} aria-hidden="true" />
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          aria-controls={carouselId}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.indicators} role="tablist" aria-label="Carousel pagination">
          {displaySlides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={carouselId}
              aria-label={`Go to slide ${i + 1}`}
              className={`${styles.dot2} ${i === index ? styles.dotActive : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          aria-controls={carouselId}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
