import styles from './StudentPodium.module.css';

const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };

function PodiumCard({ student, rank }) {
  if (!student) return null;
  const rankClass = styles[`rank${rank}`];
  return (
    <div className={`${styles.slot} ${styles[`slot${rank}`]}`}>
      <div className={styles.slotNumber}>{rank}</div>
      <div className={`${styles.card} ${rankClass}`}>
        <div className={styles.badge}>
          {medals[rank]} No.{rank}
        </div>
        <div className={styles.titleSmall}>OUTSTANDING</div>
        <div className={styles.imageWrap}>
          <img src={student.imageUrl} alt={student.name} className={styles.image} />
        </div>
        <div className={styles.info}>
          <div className={styles.org}>{student.organization}</div>
          <div className={styles.name}>{student.name}</div>
          <div className={styles.points}>{student.points} Points</div>
        </div>
      </div>
    </div>
  );
}

export default function StudentPodium({ students = [] }) {
  if (!students.length) return null;
  const [first, second, third] = students;

  return (
    <section className="section section-muted">
      <div className="container">
        <div className={styles.frame}>
          <div className={styles.head}>
            <span className={styles.icon}>🏆</span>
            <span>Top Outstanding Students</span>
          </div>

          <div className={styles.layout}>
            <PodiumCard student={second} rank={2} />
            <PodiumCard student={first} rank={1} />
            <PodiumCard student={third} rank={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
