import { useId, useState } from 'react';
import logo from '../../assets/logo.png';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'Sự kiện sắp tới', href: '/events' },
  { label: 'Đăng ký tham gia', href: '/events?freeOnly=true' },
  { label: 'Top Event', href: '/events?reco=trending' },
  { label: 'Liên hệ', href: '/contact' },
];

const contacts = [
  { label: 'Email', value: 'contact@openevent.vn', href: 'mailto:contact@openevent.vn' },
  { label: 'Phone', value: '0900 000 000', href: 'tel:0900000000' },
  { label: 'Address', value: 'ĐH FPT Đà Nẵng' },
];

const socials = [
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const emailId = useId();
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // newsletter signup hook goes here
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="/" className={styles.brandLogo} aria-label="OpenEvent home">
              <img src={logo} alt="" className={styles.logoImg} />
              <span>OpenEvent</span>
            </a>
            <p className={styles.tagline}>
              Nền tảng quản lý & tham gia sự kiện dành cho sinh viên FPT —
              nhanh chóng, tiện lợi, kết nối cộng đồng.
            </p>
            <ul className={styles.socials} aria-label="Social links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className={styles.socialLink}
                    aria-label={s.label}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.col} aria-label="Footer navigation">
            <h3 className={styles.colTitle}>Navigation</h3>
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contacts</h3>
            <ul className={styles.contactList}>
              {contacts.map((c) => (
                <li key={c.label}>
                  <span className={styles.contactLabel}>{c.label}:</span>{' '}
                  {c.href ? (
                    <a href={c.href} className={styles.link}>
                      {c.value}
                    </a>
                  ) : (
                    <span>{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Newsletter</h3>
            <p className={styles.newsletterIntro}>
              Đăng ký để nhận thông báo về sự kiện mới và tin tức từ OpenEvent.
            </p>
            <form className={styles.newsletter} onSubmit={onSubmit}>
              <label htmlFor={emailId} className={styles.srOnly}>
                Email address
              </label>
              <input
                id={emailId}
                type="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={styles.input}
              />
              <button type="submit" className={styles.submit}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.cta} role="note">
        <div className="container">
          <p>
            Tạo và quản lý sự kiện dễ dàng với OpenEvent — bắt đầu ngay hôm nay.
          </p>
        </div>
      </div>
    </footer>
  );
}
