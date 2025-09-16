import type { Card } from './paths';

export function makeOgMeta(card: Card, site: string) {
  const title = `${card.player} — ${card.set}${card.variant ? ` (${card.variant})` : ''} | SlabMetrics`;
  const desc = `Grade ${card.grade} · ${card.player} · ${card.set}${card.number ? ` · ${card.number}` : ''}`;
  const url = `${site}/cards/${card.id}`;
  const image = card.images.front?.startsWith('http') ? card.images.front : `${site}${card.images.front}`;
  return { title, desc, url, image };
}

export function productJsonLd(card: Card, site: string) {
  const url = `${site}/cards/${card.id}`;
  const images = [card.images.front, card.images.back].filter(Boolean).map(u => (u?.startsWith('http') ? u : `${site}${u}`));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${card.player} — ${card.set}${card.variant ? ` (${card.variant})` : ''}`,
    "sku": card.id,
    "image": images,
    "description": `Graded collectible card. Grade ${card.grade}.`,
    "brand": { "@type": "Brand", "name": "SlabMetrics" },
    "url": url,
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Grade", "value": card.grade },
      ...(card.number ? [{ "@type": "PropertyValue", "name": "Card #", "value": card.number }] : []),
      ...(card.variant ? [{ "@type": "PropertyValue", "name": "Variant", "value": card.variant }] : [])
    ]
  };
}