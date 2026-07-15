import { useMemo, useState } from 'react';
import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import { SITE } from '../../constants/site.js';
import {
  footerContactItems,
  footerEventLinks,
  footerQuickLinks,
  footerSocialLinks,
  footerTrustItems,
  footerVenueLinks,
  legalLinks,
} from '../../data/footer.js';
import { trackFormSubmit } from '../../utils/analytics.js';
import styles from './FooterShell.module.css';

function FooterColumn({ title, links }) {
  return (
    <div className={styles.footerColumn}>
      <h3>{title}</h3>
      <ul>
        {links.map(([label, href]) => (
          <li key={`${title}-${label}`}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className={styles.socialLinks} aria-label="Social media links">
      {footerSocialLinks.map(([label, icon, href]) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          {icon}
        </a>
      ))}
    </div>
  );
}

function FooterNewsletter() {
  const [form, setForm] = useState({ name: '', whatsapp: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^\+?\d[\d\s-]{8,}$/.test(form.whatsapp.trim())) nextErrors.whatsapp = 'Enter a valid WhatsApp number.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    trackFormSubmit({ form: 'footer_brochure_request' });
    const message = `Hello, I would like to request The Grand Royale venue brochure.\n\nName: ${form.name.trim()}\nMy WhatsApp number: ${form.whatsapp.trim()}`;
    const whatsappLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
    const openedWindow = window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    if (!openedWindow) window.location.assign(whatsappLink);
    setSuccess(true);
    setForm({ name: '', whatsapp: '' });
  };

  return (
    <form className={styles.newsletter} onSubmit={handleSubmit} noValidate>
      <h3>Request Venue Brochure</h3>
      <p>Receive a polished digital brochure with venue spaces, package direction, facilities, and visit planning support on WhatsApp.</p>
      <label>
        <span>Name</span>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" aria-invalid={Boolean(errors.name)} />
        {errors.name ? <small>{errors.name}</small> : null}
      </label>
      <label>
        <span>WhatsApp Number</span>
        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+91 98765 43210" aria-invalid={Boolean(errors.whatsapp)} />
        {errors.whatsapp ? <small>{errors.whatsapp}</small> : null}
      </label>
      <button type="submit">Request Brochure</button>
      <p className={styles.privacyNote}>Your details are only added to the WhatsApp request you choose to send.</p>
      {success ? <p className={styles.successMessage} role="status">WhatsApp is ready. Send the prepared message to request the brochure.</p> : null}
    </form>
  );
}

export default function FooterShell() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const isOpenNow = useMemo(() => {
    const hour = new Date().getHours();
    return hour >= 10 && hour < 21;
  }, []);

  return (
    <footer className={styles.footer} id="footer-sitemap" aria-label="Website footer">
      <section className={styles.footerCta} aria-labelledby="footer-cta-title">
        <Container className={styles.footerCtaInner}>
          <div>
            <p className={styles.eyebrow}>Ready to celebrate?</p>
            <h2 id="footer-cta-title">Begin Planning Your Grand Celebration Today</h2>
            <p>Schedule a venue visit, check availability, or speak with our event team to begin planning your family celebration.</p>
          </div>
          <div className={styles.ctaActions}>
            <Button href="#booking-bar">Book Venue Visit</Button>
            <Button href="#booking-bar" variant="secondary">Check Availability</Button>
            <Button href={`https://wa.me/${SITE.whatsapp}`} variant="ghost">Speak on WhatsApp</Button>
            <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
          </div>
        </Container>
      </section>

      <div className={styles.mainFooter}>
        <Container className={styles.trustStrip} aria-label="Footer trust highlights">
          {footerTrustItems.map(([icon, label]) => (
            <span key={label}><b aria-hidden="true">{icon}</b>{label}</span>
          ))}
        </Container>

        <Container className={styles.footerGrid}>
          <div className={styles.brandColumn}>
            <a className={styles.brand} href="#home" aria-label={`${SITE.name} home`}>
              <span className={styles.brandMark}>GR</span>
              <span>
                <strong>{SITE.name}</strong>
                <em>{SITE.tagline}</em>
              </span>
            </a>
            <p>{SITE.fullName} brings luxury hospitality, elegant venue spaces, curated packages, and trusted event support together for unforgettable celebrations.</p>
            <div className={styles.ratingBadge} aria-label="Demo Google rating">
              <span>4.9★</span>
              <small>Google rating • 500+ weddings</small>
            </div>
            <p className={styles.businessStatus}>{isOpenNow ? 'Open Now' : 'Closed Now'} <span>• 10:00 AM – 9:00 PM</span></p>
            <SocialLinks />
          </div>

          <FooterColumn title="Quick Links" links={footerQuickLinks} />
          <FooterColumn title="Services & Events" links={footerEventLinks} />
          <FooterColumn title="Venue Spaces" links={footerVenueLinks} />

          <div className={styles.footerColumn} id="footer-contact">
            <h3>Contact</h3>
            <ul>
              {footerContactItems.map(([label, value, href]) => (
                <li key={label}>
                  <a href={href}>{label}: <span>{value}</span></a>
                </li>
              ))}
            </ul>
          </div>

          <FooterNewsletter />
        </Container>

        <Container className={styles.bottomBar} id="footer-legal">
          <p>© {currentYear} {SITE.name}. All Rights Reserved.</p>
          <nav aria-label="Legal links">
            {legalLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </nav>
          <p>This is a premium demo website. Details can be customized for the actual venue.</p>
        </Container>
      </div>
    </footer>
  );
}
