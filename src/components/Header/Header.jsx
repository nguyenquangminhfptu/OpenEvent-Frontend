import logo from '../../assets/logo.png';
import styles from './Header.module.css';

const navItems = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'events', label: 'Events', href: '/events' },
  { key: 'orders', label: 'My Event', href: '/orders' },
  { key: 'about', label: 'About', href: '/about' },
];

export default function Header({ activeMenu = 'home', user = null }) {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <a href="/" className={styles.logo}>
            <img src={logo} alt="OpenEvent" className={styles.logoImg} />
            <span className={styles.logoText}>OpenEvent</span>
          </a>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`${styles.navLink} ${
                  activeMenu === item.key ? styles.isActive : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            {user ? (
              <a href="/profile" className="btn btn-ghost">
                {user.name || 'Profile'}
              </a>
            ) : (
              <>
                <a href="/login" className="btn btn-ghost">Login</a>
                <a href="/register" className="btn btn-primary">Sign up</a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
