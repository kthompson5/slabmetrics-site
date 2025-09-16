import React from 'react';

type Props = { values: number[]; width?: number; height?: number; label?: string };

export default function TrendSpark({ values, width = 220, height = 48, label = 'Trend' }: Props) {
  if (!values?.length) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const norm = (v: number, i: number) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / Math.max(1, max - min)) * height;
    return `${x},${y}`;
  };
  const points = values.map((v, i) => norm(v, i)).join(' ');
  const last = values[values.length - 1];

  return (
    <div>
      <svg width={width} height={height} role="img" aria-label={`${label}: ${last}`}>
        <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
      </svg>
      <div style={{ fontSize: 12, opacity: 0.8 }}>{label}: {last}</div>
    </div>
  );
}