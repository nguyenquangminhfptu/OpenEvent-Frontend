import student1 from '../assets/topstudent/sinhvien1.jpg';
import student2 from '../assets/topstudent/sinhvien2.jpg';
import student3 from '../assets/topstudent/sinhvien3.jpg';
import banner1 from '../assets/banner/banner1.png';
import banner2 from '../assets/banner/banner2.jpeg';
import banner3 from '../assets/banner/banner3.jpg';
import event1 from '../assets/event/event1.jpg';
import event2 from '../assets/event/event2.jpg';
import event3 from '../assets/event/event3.jpg';
import event4 from '../assets/event/event4.jpg';
import event6 from '../assets/event/event6.jpg';
import event7 from '../assets/event/event7.jpg';
import event8 from '../assets/event/event8.jpg';
import event9 from '../assets/event/event9.jpg';
import event10 from '../assets/event/event10.jpg';

const img = (seed) => `https://picsum.photos/seed/${seed}/800/500`;

export const posterEvents = [
  { id: 1, title: 'FPTU Tech Connect 2026', imageUrl: banner1 },
  { id: 2, title: 'FPTU Music Festival', imageUrl: banner2 },
  { id: 3, title: 'Startup Day FPT University', imageUrl: banner3 },
];

const make = (overrides) => ({
  id: 0,
  title: '',
  city: 'Đà Nẵng',
  dateLabel: '20/09/2026',
  durationLabel: '2h',
  organizer: 'FPT University Đà Nẵng',
  imageUrl: img('event'),
  eventType: 'WORKSHOP',
  eventTypeTag: 'Workshop',
  registered: 0,
  capacity: 100,
  priceLabel: 'Free',
  live: false,
  soldOut: false,
  startsAt: null,
  ...overrides,
  get registrationPercentage() {
    return Math.min(100, Math.round((this.registered / this.capacity) * 100));
  },
});

export const myEvents = [
  make({
    id: 101,
    title: 'UI/UX Bootcamp FPTU',
    city: 'Đà Nẵng',
    dateLabel: '20/09/2026',
    durationLabel: '3h',
    organizer: 'FPT Design Club',
    imageUrl: event1,
    eventType: 'WORKSHOP',
    eventTypeTag: 'Workshop',
    registered: 90,
    capacity: 150,
    priceLabel: 'Free',
    startsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  }),
  make({
    id: 102,
    title: 'FPTU Acoustic Night',
    city: 'Đà Nẵng',
    dateLabel: 'Hôm nay',
    durationLabel: '2h',
    organizer: 'FPT Music Club',
    imageUrl: event2,
    eventType: 'MUSIC',
    eventTypeTag: 'Music',
    registered: 216,
    capacity: 300,
    priceLabel: 'Free',
    live: true,
    startsAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  }),
];

export const latestEvents = [
  make({
    id: 201,
    title: 'Data Visualization Workshop',
    city: 'Đà Nẵng',
    dateLabel: '28/09/2026',
    durationLabel: '2h',
    organizer: 'FPT Data Science Club',
    imageUrl: event3,
    eventType: 'WORKSHOP',
    eventTypeTag: 'Workshop',
    registered: 120,
    capacity: 200,
    priceLabel: '70k',
  }),
  make({
    id: 202,
    title: 'FPT Startup Night',
    city: 'Đà Nẵng',
    dateLabel: '30/09/2026',
    durationLabel: '2.5h',
    organizer: 'FPT Innovation Hub',
    imageUrl: event4,
    eventType: 'CONFERENCE',
    eventTypeTag: 'Conference',
    registered: 300,
    capacity: 500,
    priceLabel: 'Free',
  }),
  make({
    id: 203,
    title: 'Campus Coding Jam',
    city: 'Đà Nẵng',
    dateLabel: '05/10/2026',
    durationLabel: '3h',
    organizer: 'FPT Coding Club',
    imageUrl: event6,
    eventType: 'COMPETITION',
    eventTypeTag: 'Competition',
    registered: 150,
    capacity: 180,
    priceLabel: '120k',
  }),
  make({
    id: 204,
    title: 'FPTU Summer Fest',
    city: 'Đà Nẵng',
    dateLabel: '22/09/2026',
    durationLabel: '2h',
    organizer: 'FPT Event Club',
    imageUrl: event7,
    eventType: 'FESTIVAL',
    eventTypeTag: 'Festival',
    registered: 480,
    capacity: 600,
    priceLabel: '100k',
  }),
  make({
    id: 205,
    title: 'Indie Music Showcase',
    city: 'Đà Nẵng',
    dateLabel: '10/10/2026',
    durationLabel: '3h',
    organizer: 'FPT Indie Club',
    imageUrl: event8,
    eventType: 'MUSIC',
    eventTypeTag: 'Music',
    registered: 220,
    capacity: 400,
    priceLabel: '80k',
  }),
  make({
    id: 206,
    title: 'AI Hackathon FPTU',
    city: 'Đà Nẵng',
    dateLabel: '15/10/2026',
    durationLabel: '24h',
    organizer: 'FPT GDSC',
    imageUrl: event9,
    eventType: 'COMPETITION',
    eventTypeTag: 'Competition',
    registered: 95,
    capacity: 100,
    priceLabel: 'Free',
    soldOut: true,
  }),
];

export const liveEvents = [
  make({
    id: 301,
    title: 'FPTU Acoustic Night',
    city: 'Đà Nẵng',
    dateLabel: 'Hôm nay',
    durationLabel: '2h',
    organizer: 'FPT Music Club',
    imageUrl: event10,
    eventType: 'MUSIC',
    eventTypeTag: 'Music',
    registered: 216,
    capacity: 300,
    priceLabel: 'Free',
    live: true,
  }),
  make({
    id: 302,
    title: 'AI Workshop FPTU',
    city: 'Đà Nẵng',
    dateLabel: 'Hôm nay',
    durationLabel: '1h',
    organizer: 'FPT GDSC',
    imageUrl: event2,
    eventType: 'WORKSHOP',
    eventTypeTag: 'Workshop',
    registered: 110,
    capacity: 200,
    priceLabel: '50k',
    live: true,
  }),
  make({
    id: 303,
    title: 'FPT Tech Summit',
    city: 'Đà Nẵng',
    dateLabel: 'Hôm nay',
    durationLabel: '3h',
    organizer: 'FPT Business Club',
    imageUrl: event3,
    eventType: 'CONFERENCE',
    eventTypeTag: 'Conference',
    registered: 352,
    capacity: 400,
    priceLabel: '200k',
    live: true,
  }),
];

export const recommendedEvents = latestEvents.slice(0, 3);

export const topStudents = [
  {
    rank: 1,
    name: 'NGUYỄN QUANG MINH',
    organization: 'FPT University Đà Nẵng',
    points: 2450,
    imageUrl: student1,
  },
  {
    rank: 2,
    name: 'TRẦN HOÀNG NAM',
    organization: 'FPT University Đà Nẵng',
    points: 2210,
    imageUrl: student2,
  },
  {
    rank: 3,
    name: 'LÊ THU HẰNG',
    organization: 'FPT University Đà Nẵng',
    points: 2080,
    imageUrl: student3,
  },
];