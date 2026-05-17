import { useState } from 'react';
import Header from '../components/Header/Header.jsx';
import HeroSlider from '../components/HeroSlider/HeroSlider.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import EventSection from '../components/EventSection/EventSection.jsx';
import StudentPodium from '../components/StudentPodium/StudentPodium.jsx';
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

      <main>
        <HeroSlider slides={posterEvents} />

        <div className={styles.searchCenter}>
          <div className="container">
            <SearchBar onSearch={(q) => console.log('search:', q)} />
            <div className="chip-row">
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

        <EventSection
          title="Your Events"
          events={myEvents}
          viewAllHref="/orders"
          showCheckin
          emptyMessage="Bạn chưa đăng ký sự kiện nào."
        />

        <EventSection
          title="Latest Events"
          events={latestEvents}
          filters={['all', 'Music', 'Workshop', 'Festival', 'Competition', 'Conference']}
          pageSize={3}
          emptyMessage="Chưa có sự kiện mới."
        />

        <EventSection
          title="Live Events"
          events={liveEvents}
          filters={['all', 'Music', 'Workshop', 'Conference', 'Festival', 'Competition']}
          pageSize={3}
          emptyMessage="Hiện không có sự kiện đang diễn ra."
        />

        <StudentPodium students={topStudents} />

        <EventSection
          title="💡 Recommended for You"
          events={recommendedEvents}
          emptyMessage="Chưa có gợi ý cho bạn."
        />
      </main>
    </>
  );
}
