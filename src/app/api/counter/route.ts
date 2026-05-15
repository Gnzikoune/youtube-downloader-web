import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Note: En production (Vercel), le système de fichiers est en lecture seule.
// Il faudra remplacer ceci par une base de données (Redis/Supabase).
// Pour le développement local, on utilise un fichier JSON.
const STATS_FILE = path.join(process.cwd(), 'stats.json');

function getStats() {
  if (!fs.existsSync(STATS_FILE)) {
    return { playlists: 0 };
  }
  return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
}

function saveStats(stats: any) {
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats), 'utf8');
}

export async function POST() {
  const stats = getStats();
  stats.playlists += 1;
  saveStats(stats);
  
  return NextResponse.json({ success: true, count: stats.playlists });
}

export async function GET() {
  return NextResponse.json(getStats());
}
