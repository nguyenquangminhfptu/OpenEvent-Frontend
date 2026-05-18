import { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import styles from './Header.module.css';

const navItems = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'events', label: 'Events', href: '/events' },
  { key: 'orders', label: 'My events', href: '/orders' },
  { key: 'about', label: 'About', href: '/about' },
];

export default function Header({ activeMenu = 'home', user = null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <a href="/" className={styles.logo} onClick={close}>
            <img src={logo} alt="" className={styles.logoImg} />
            <span className={styles.logoText}>OpenEvent</span>
          </a>

          <nav className={styles.navDesktop} aria-label="Primary">
            {navItems.map((item) => {
              const active = activeMenu === item.key;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`${styles.navLink} ${active ? styles.isActive : ''}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className={styles.actionsDesktop}>
            {user ? (
              <a href="/profile" className={styles.btnGhost}>
                {user.name || 'Profile'}
              </a>
            ) : (
              <>
                <a href="/login" className={styles.btnGhost}>Sign in</a>
              </>
            )}
            <a href="/host" className={styles.btnPrimary}>
              Host event
            </a>
          </div>

          <button
            type="button"
            className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        id="mobile-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        aria-hidden={!open}
      >
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {navItems.map((item) => {
            const active = activeMenu === item.key;
            return (
              <a
                key={item.key}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`${styles.drawerLink} ${
                  active ? styles.drawerLinkActive : ''
                }`}
                onClick={close}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className={styles.drawerActions}>
          <a
            href="/host"
            className={styles.btnPrimary}
            onClick={close}
            tabIndex={open ? 0 : -1}
          >
            Host event
          </a>
          {user ? (
            <a href="/profile" className={styles.btnGhost} onClick={close} tabIndex={open ? 0 : -1}>
              {user.name || 'Profile'}
            </a>
          ) : (
            <a href="/login" className={styles.btnGhost} onClick={close} tabIndex={open ? 0 : -1}>
              Sign in
            </a>
          )}
        </div>
      </aside>
    </header>
  );
}
