import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const STATS_FILE = path.join(process.cwd(), 'stats.json');

// Fonctions de secours locales pour le développement
function getLocalStats() {
  if (!fs.existsSync(STATS_FILE)) {
    return { playlists: 0 };
  }
  try {
    return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
  } catch {
    return { playlists: 0 };
  }
}

function saveLocalStats(stats: { playlists: number }) {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats), 'utf8');
  } catch (e) {
    console.error('Erreur lors de la sauvegarde locale des stats:', e);
  }
}

// Vérification de la configuration de Vercel KV
const isKVConfigured = 
  typeof process.env.KV_REST_API_URL === 'string' && 
  typeof process.env.KV_REST_API_TOKEN === 'string';

export async function POST() {
  if (isKVConfigured) {
    try {
      // Incrémentation atomique et persistante dans la base Redis Vercel KV
      const newCount = await kv.incr('playlists_count');
      return NextResponse.json({ success: true, count: newCount });
    } catch (error: any) {
      console.error('Erreur Vercel KV (POST), bascule sur fichier local:', error.message);
    }
  }

  // Secours local (développement ou panne)
  const stats = getLocalStats();
  stats.playlists += 1;
  saveLocalStats(stats);
  
  return NextResponse.json({ success: true, count: stats.playlists });
}

export async function GET() {
  if (isKVConfigured) {
    try {
      const count = await kv.get<number>('playlists_count');
      return NextResponse.json({ playlists: count ?? 0 });
    } catch (error: any) {
      console.error('Erreur Vercel KV (GET), bascule sur fichier local:', error.message);
    }
  }

  // Secours local
  return NextResponse.json(getLocalStats());
}
