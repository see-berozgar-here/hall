import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import { SITE } from '../../constants/site.js';
import { navigationItems } from '../../data/navigation.js';
import { classNames } from '../../utils/classNames.js';
import styles from './HeaderShell.module.css';

const socialItems = [
  { label: 'Instagram', value: 'IG', href: 'https://www.instagram.com/' },
  { label: 'Facebook', value: 'FB', href: 'https://www.facebook.com/' },
];

export default function HeaderShell() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.classList.remove('nav-lock');
      return undefined;
    }

    const previouslyFocused = document.activeElement;
    const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll(focusableSelector));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const onMouseDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.body.classList.add('nav-lock');
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.classList.remove('nav-lock');
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1080) setIsMenuOpen(false);
    };
    window.addEventListener('resize', closeOnDesktop, { passive: true });
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={classNames(styles.header, isScrolled && styles.scrolled)} aria-label="Website header">
      <div className={styles.topBar}>
        <Container className={styles.topInner}>
          <Link to="/" className={styles.brand} aria-label={`${SITE.name} home`} onClick={closeMenu}>
            <span className={styles.mark} aria-hidden="true">GR</span>
            <span className={styles.brandCopy}>
              <span className={styles.name}>{SITE.name}</span>
              <span className={styles.type}>{SITE.tagline}</span>
            </span>
          </Link>

          <div className={styles.topMeta} aria-label="Venue highlights">
            <span>Open 10 AM – 9 PM</span>
            <span>4.9★ Google Rating</span>
            <span>500+ Weddings Hosted</span>
          </div>

          <div className={styles.topActions}>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className={styles.email} href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {socialItems.map((item) => (
              <a key={item.label} className={styles.social} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>{item.value}</a>
            ))}
          </div>
        </Container>
      </div>

      <Container className={styles.navInner}>
        <nav className={styles.nav} aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const isHash = item.to.startsWith('#');
            const itemClass = ({ isActive }) => classNames(styles.navLink, isActive && !isHash && styles.activeLink);
            return isHash ? (
              <a key={item.label} href={item.to} className={styles.navLink} onClick={closeMenu}>
                {item.label}{item.hasDropdown ? <span aria-hidden="true">⌄</span> : null}
              </a>
            ) : (
              <NavLink key={item.label} to={item.to} className={itemClass}>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <Button href="#booking-bar" variant="primary" size="sm" className={styles.navCta}>Schedule Visit</Button>

        <button
          ref={menuButtonRef}
          className={classNames(styles.menuButton, isMenuOpen && styles.menuOpen)}
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          tabIndex={isMenuOpen ? -1 : 0}
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </Container>

      <div className={classNames(styles.mobilePanel, isMenuOpen && styles.mobilePanelOpen)} aria-hidden={!isMenuOpen}>
        <div className={styles.mobilePanelInner} ref={panelRef}>
          <button ref={closeButtonRef} tabIndex={isMenuOpen ? 0 : -1} className={styles.mobileClose} type="button" aria-label="Close navigation menu" onClick={closeMenu}>×</button>
          <p className={styles.mobileEyebrow}>Luxury Wedding Venue</p>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {navigationItems.map((item) => (
              item.to.startsWith('#')
                ? <a key={item.label} href={item.to} tabIndex={isMenuOpen ? 0 : -1} onClick={closeMenu}>{item.label}</a>
                : <Link key={item.label} to={item.to} tabIndex={isMenuOpen ? 0 : -1} onClick={closeMenu}>{item.label}</Link>
            ))}
          </nav>
          <div className={styles.mobileActions}>
            <Button href="#booking-bar" tabIndex={isMenuOpen ? 0 : -1} onClick={closeMenu}>Schedule a Venue Visit</Button>
            <Button href={`https://wa.me/${SITE.whatsapp}`} tabIndex={isMenuOpen ? 0 : -1} variant="secondary" onClick={closeMenu}>WhatsApp Chat</Button>
            <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} tabIndex={isMenuOpen ? 0 : -1} variant="ghost" onClick={closeMenu}>Call Venue</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
