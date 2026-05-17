import { useEffect, useRef, useState } from 'react';
import styles from './HeroSlider.module.css';

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

function useReducedMotion() {
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
  const reduced = useReducedMotion();
  const count = slides.length || 1;

  const go = (next) => {
    setIndex((current) => (next + count) % count);
  };

  /* Auto-advance, but: respect reduced motion, pause on hover/focus,
     and reset the timer when the user interacts with prev/next/dot. */
  useEffect(() => {
    clearInterval(timerRef.current);
    if (count <= 1 || reduced || paused) return;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
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

  const displaySlides = slides.length
    ? slides
    : [{ id: 'fallback', imageUrl: '/img/banner1.jpg', title: 'OpenEvent' }];

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={styles.track}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="Featured events"
      >
        {displaySlides.map((slide, i) => (
          <div
            key={slide.id}
            className={styles.slide}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${displaySlides.length}: ${slide.title}`}
            aria-hidden={i !== index}
          />
        ))}
      </div>

      <button
        className={`${styles.nav} ${styles.prev}`}
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className={`${styles.nav} ${styles.next}`}
        onClick={() => go(index + 1)}
        aria-label="Next slide"
      >
        ›
      </button>

      {!reduced && (
        <button
          type="button"
          className={styles.pauseBtn}
          onClick={() => setPaused((v) => !v)}
          aria-label={paused ? 'Resume auto-advance' : 'Pause auto-advance'}
          aria-pressed={paused}
        >
          {paused ? '▶' : '❚❚'}
        </button>
      )}

      <div className={styles.progress} role="tablist">
        {displaySlides.map((slide, i) => (
          <button
            key={slide.id}
            className={`${styles.progressBar} ${i === index ? styles.active : ''}`}
            onClick={() => setIndex(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
