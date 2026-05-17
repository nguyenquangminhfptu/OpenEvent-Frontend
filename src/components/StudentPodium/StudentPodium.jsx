import styles from './StudentPodium.module.css';

const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };

function PodiumCard({ student, rank }) {
  if (!student) return null;
  return (
    <div className={`${styles.slot} ${styles[`slot${rank}`]}`}>
      <div className={`${styles.card} ${styles[`rank${rank}`]}`}>
        <div className={styles.badge}>
          <span aria-hidden="true">{medals[rank]}</span> No.{rank}
        </div>
        <p className={styles.titleSmall}>Outstanding</p>
        <div className={styles.imageWrap}>
          <img src={student.imageUrl} alt="" className={styles.image} />
        </div>
        <div className={styles.info}>
          <p className={styles.org}>{student.organization}</p>
          <p className={styles.name}>{student.name}</p>
          <p className={styles.points}>
            {student.points.toLocaleString()}{' '}
            <span className={styles.pointsLabel}>points</span>
          </p>
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
        <header className="section-header">
          <div className="section-header__title-block">
            <h2 className="section-title">
              <span className={styles.titleIcon} aria-hidden="true"></span>
              Top outstanding students
            </h2>
          </div>
        </header>

        <div className={styles.frame}>
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
