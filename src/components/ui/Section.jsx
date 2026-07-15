import { classNames } from '../../utils/classNames.js';
import Container from './Container.jsx';
import styles from './Section.module.css';

export default function Section({ eyebrow, title, description, children, className, containerSize = 'xl', ...props }) {
  return (
    <section className={classNames(styles.section, className)} {...props}>
      <Container size={containerSize}>
        {(eyebrow || title || description) && (
          <div className={styles.heading}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
