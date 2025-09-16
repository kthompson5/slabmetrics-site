import fs from 'node:fs';
import path from 'node:path';

export type Card = {
  id: string;
  player: string;
  set: string;
  number?: string;
  variant?: string;
  grade: number;
  subgrades?: Record<string, number>;
  images: { front: string; back?: string };
  notes?: string;
  graded_at?: string;
  comp_trend?: number[];
  pdf_report?: string | null;
};

const DATA_DIR = path.resolve('src/data/cards');

export function getAllCards(): Card[] {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  return files.map((f) => JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, f), 'utf-8')
  ) as Card);
}

export function getCardById(id: string): Card | null {
  const p = path.join(DATA_DIR, `${id}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf-8')) as Card;
}