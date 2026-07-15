import { useEffect, useRef, useState } from 'react';

export function useCountUp(target, { duration = 1400, startWhenVisible = true } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(startWhenVisible ? 0 : target);

  useEffect(() => {
    const node = ref.current;
    let frameId;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frameId = requestAnimationFrame(tick);
      };
      frameId = requestAnimationFrame(tick);
    };

    if (!startWhenVisible || !node || !('IntersectionObserver' in window)) {
      run();
      return () => cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        run();
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [duration, startWhenVisible, target]);

  return [ref, value];
}
