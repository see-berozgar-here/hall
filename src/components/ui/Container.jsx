import { classNames } from '../../utils/classNames.js';
import styles from './Container.module.css';

export default function Container({ size = 'xl', className, children, ...props }) {
  return (
    <div className={classNames(styles.container, styles[size], className)} {...props}>
      {children}
    </div>
  );
}
