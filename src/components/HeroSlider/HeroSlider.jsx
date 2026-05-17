import { useEffect, useRef, useState } from 'react';
import styles from './HeroSlider.module.css';

const AUTOPLAY_MS = 5000;

export default function HeroSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const count = slides.length || 1;

  const go = (next) => {
    setIndex((current) => (next + count) % count);
  };

  useEffect(() => {
    if (count <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [count]);

  const displaySlides = slides.length
    ? slides
    : [{ id: 'fallback', imageUrl: '/img/banner1.jpg', title: 'OpenEvent' }];

  return (
    <section className={styles.hero}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {displaySlides.map((slide) => (
          <div
            key={slide.id}
            className={styles.slide}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
            role="img"
            aria-label={slide.title}
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

      <div className={styles.progress}>
        {displaySlides.map((slide, i) => (
          <button
            key={slide.id}
            className={`${styles.progressBar} ${i === index ? styles.active : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
