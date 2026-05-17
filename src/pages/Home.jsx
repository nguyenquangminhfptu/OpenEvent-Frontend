import { useState } from 'react';
import Header from '../components/Header/Header.jsx';
import HeroSlider from '../components/HeroSlider/HeroSlider.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
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

const recoChips = [
  { key: 'for-you', label: 'For you' },
  { key: 'near-you', label: 'Near you' },
  { key: 'trending', label: 'Trending' },
  { key: 'free', label: 'Free' },
];

export default function Home() {
  const [reco, setReco] = useState('for-you');

  return (
    <>
      <Header activeMenu="home" />

      <h1 className={styles.srOnly}>
        OpenEvent — Discover, register, and check in to events near you
      </h1>

      <main>
        <HeroSlider slides={posterEvents} />

        {/* Search rail: tightly coupled with hero (overlap), then breathes
            into the first content section */}
        <div className={styles.searchRail}>
          <div className="container">
            <SearchBar />
            <div className="chip-row" role="group" aria-label="Quick filters">
              {recoChips.map((c) => (
                <button
                  key={c.key}
                  className={`chip ${reco === c.key ? 'is-active' : ''}`}
                  onClick={() => setReco(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RAIL: user's own events — horizontal scroll signals "personal queue" */}
        <EventSection
          title="Your upcoming events"
          events={myEvents}
          variant="rail"
          viewAllHref="/orders"
          showCheckin
          rhythm="snug"
          emptyMessage="Bạn chưa đăng ký sự kiện nào."
        />

        {/* GRID: discover — the canonical browse surface */}
        <EventSection
          // eyebrow="Discover"
          title="Latest events"
          events={latestEvents}
          variant="grid"
          filters={['all', 'Music', 'Workshop', 'Festival', 'Competition', 'Conference']}
          pageSize={6}
          rhythm="base"
          emptyMessage="Chưa có sự kiện mới."
        />

        {/* COMPACT: live now — compact list reads as "happening right now" */}
        <EventSection
          title="Live events"
          events={liveEvents}
          variant="compact"
          rhythm="snug"
          muted
          emptyMessage="Hiện không có sự kiện đang diễn ra."
        />

        {/* Podium: distinct content type — biggest rhythmic break */}
        <StudentPodium students={topStudents} />

        {/* FEATURE: editorial 1+2 layout — closes the page with focus */}
        <EventSection
          title="Recommended for you"
          events={recommendedEvents}
          variant="feature"
          rhythm="loose"
          emptyMessage="Chưa có gợi ý cho bạn."
        />
      </main>

      <Footer />
    </>
  );
}
