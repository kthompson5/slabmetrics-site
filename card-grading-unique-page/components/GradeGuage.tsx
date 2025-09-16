import React, { useEffect, useRef } from 'react';

type Props = { value: number; max?: number; label?: string };

export default function GradeGauge({ value, max = 10, label = 'Grade' }: Props) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pct = Math.max(0, Math.min(1, value / max));
  const R = 56;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    const c = circleRef.current;
    if (!c) return;
    const target = C * (1 - pct);
    let start = C;
    const duration = 900;
    const t0 = performance.now();
    function tick(t: number) {
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 2);
      const cur = start + (target - start) * eased;
      c.style.strokeDashoffset = String(cur);
      if (k < 1) requestAnimationFrame(tick);
    }
    c.style.strokeDasharray = String(C);
    c.style.strokeDashoffset = String(C);
    requestAnimationFrame(tick);
  }, [C, pct]);

  return (
    <div style={{ display:'grid', placeItems:'center' }}>
      <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`${label} ${value}`}>
        <circle cx="70" cy="70" r={R} stroke="currentColor" opacity="0.1" strokeWidth="12" fill="none"/>
        <circle ref={circleRef} cx="70" cy="70" r={R} stroke="currentColor" strokeWidth="12" fill="none"
          strokeLinecap="round" transform="rotate(-90 70 70)"/>
        <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontWeight="700">{value}</text>
        <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fontSize="12" opacity="0.8">{label}</text>
      </svg>
    </div>
  );
}