import { classNames } from '../../utils/classNames.js';
import styles from './Card.module.css';

export default function Card({ as: Component = 'article', interactive = false, className, children, ...props }) {
  return <Component className={classNames(styles.card, interactive && styles.interactive, className)} {...props}>{children}</Component>;
}
