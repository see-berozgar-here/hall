import { classNames } from '../../utils/classNames.js';
import { inferConversionEvent, trackEvent } from '../../utils/analytics.js';
import styles from './Button.module.css';

export default function Button({ as: Component = 'button', href, variant = 'primary', size = 'md', isLoading = false, className, children, trackingEvent, trackingPayload, onClick, type, ...props }) {
  const ResolvedComponent = href ? 'a' : Component;
  const label = typeof children === 'string' ? children : props['aria-label'];

  const handlePointerMove = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--button-x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--button-y', `${event.clientY - rect.top}px`);
  };

  const handleClick = (event) => {
    const inferredEvent = inferConversionEvent({ href, label, explicitEvent: trackingEvent });
    if (inferredEvent) {
      trackEvent(inferredEvent, { label, href, ...trackingPayload });
    }
    onClick?.(event);
  };

  return (
    <ResolvedComponent
      className={classNames(styles.button, styles[variant], styles[size], isLoading && styles.loading, className)}
      href={href}
      type={!href && ResolvedComponent === 'button' ? type || 'button' : type}
      aria-busy={isLoading || undefined}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      {...props}
    >
      <span>{children}</span>
    </ResolvedComponent>
  );
}
