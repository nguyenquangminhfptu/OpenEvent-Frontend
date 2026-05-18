import { useMemo, useState } from 'react';
import Header from '../components/Header/Header.jsx';
import HeroSlider from '../components/HeroSlider/HeroSlider.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import CategoryChips from '../components/CategoryChips/CategoryChips.jsx';
import EventSection from '../components/EventSection/EventSection.jsx';
import StudentPodium from '../components/StudentPodium/StudentPodium.jsx';
import Footer from '../components/Footer/Footer.jsx';
import {
  posterEvents,
  myEvents,
  latestEvents,
  liveEvents,
  recommendedEvents,
  topStudents,
} from '../data/mockEvents.js';
import styles from './Home.module.css';

export default function Home() {
  const [category, setCategory] = useState('all');

  const filteredLatest = useMemo(() => {
    if (category === 'all') return latestEvents;
    return latestEvents.filter((ev) => ev.eventTypeTag === category);
  }, [category]);

  return (
    <>
      <Header activeMenu="home" />

      <h1 className={styles.srOnly}>
        OpenEvent — Discover, register, and check in to events near you
      </h1>

      <main>
        <HeroSlider slides={posterEvents} />

        {/* Glass search panel overlapping hero edge */}
        <div className={styles.searchAnchor}>
          <div className="container">
            <div className={styles.searchPanel}>
              <SearchBar />
            </div>
          </div>
        </div>

        {/* RAIL: personal queue */}
        <EventSection
          title="Your upcoming events"
          events={myEvents}
          variant="rail"
          viewAllHref="/orders"
          showCheckin
          rhythm="snug"
          emptyMessage="You haven't registered for any events yet."
        />

        {/* COMPACT: live now */}
        <EventSection
          title="Happening live"
          events={liveEvents}
          variant="compact"
          rhythm="snug"
          muted
          emptyMessage="No events happening live right now."
        />

        {/* GRID: Latest events with category filter as header slot */}
        <EventSection
          title={category === 'all' ? 'Latest events' : `${category} events`}
          events={filteredLatest}
          variant="grid"
          rhythm="base"
          viewAllHref="/events"
          emptyMessage="No events match this filter."
          headerSlot={
            <CategoryChips active={category} onChange={setCategory} />
          }
        />


        {/* Podium: distinct content shape */}
        <StudentPodium students={topStudents} />

        {/* FEATURE: editorial 1+2 close */}
        <EventSection
          title="Recommended for you"
          events={recommendedEvents}
          variant="feature"
          rhythm="loose"
          emptyMessage="No recommendations for you yet."
        />
      </main>

      <Footer />
    </>
  );
}
