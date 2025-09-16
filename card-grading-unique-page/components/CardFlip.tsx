import React, { useRef, useState } from 'react';

type Props = { front: string; back?: string };

export default function CardFlip({ front, back }: Props) {
  const [flipped, setFlipped] = useState(false);
  const startX = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) { startX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40 && back) setFlipped(dx < 0 ? true : false);
    startX.current = null;
  }

  return (
    <div
      style={{
        perspective: '1000px', width: 'min(420px, 90vw)', margin: '0 auto',
        cursor: back ? 'pointer' : 'default'
      }}
      onClick={() => back && setFlipped(v => !v)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-live="polite"
    >
      <div style={{
        position:'relative', transformStyle:'preserve-3d', transition:'transform 600ms',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        <img src={front} alt="Card front" style={{
          display:'block', backfaceVisibility:'hidden', width:'100%', borderRadius:12
        }}/>
        {back && (
          <img src={back} alt="Card back" style={{
            position:'absolute', inset:0, width:'100%', borderRadius:12,
            transform:'rotateY(180deg)', backfaceVisibility:'hidden'
          }}/>
        )}
      </div>
      <div style={{ textAlign:'center', fontSize:12, marginTop:8, opacity:0.8 }}>
        {back ? 'Tap or swipe to flip' : 'Back image not available'}
      </div>
    </div>
  );
}