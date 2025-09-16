import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type Props = { subgrades: Record<string, number>; max?: number };

export default function SubgradeBars({ subgrades, max = 10 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        // eslint-disable-next-line no-new
        new Chart(el, {
          type: 'bar',
          data: {
            labels: Object.keys(subgrades),
            datasets: [{ data: Object.values(subgrades) }]
          },
          options: {
            responsive: true,
            animation: { duration: 900 },
            scales: {
              y: { suggestedMin: 0, suggestedMax: max, ticks: { stepSize: 1 } }
            },
            plugins: { legend: { display: false }, tooltip: { enabled: true } }
          }
        });
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [subgrades, max]);

  return <canvas ref={canvasRef} aria-label="Subgrade bars" />;
}