'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const totalSteps = duration / 16;
    const step = target / totalSteps;
    
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}

export default function Stats() {
  const [stats, setStats] = useState({ downloads: 0, playlists: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchRealStats() {
      try {
        // 1. Récupérer les téléchargements RÉELS depuis GitHub
        const githubRes = await fetch('https://api.github.com/repos/Gnzikoune/youtube-downloader/releases');
        const releases = await githubRes.json();
        
        let totalDownloads = 0;
        if (Array.isArray(releases)) {
          releases.forEach((release: any) => {
            release.assets.forEach((asset: any) => {
              totalDownloads += asset.download_count;
            });
          });
        }

        // 2. Récupérer les playlists depuis notre API interne
        const internalRes = await fetch('/api/counter');
        const internalData = await internalRes.json();

        // 3. Calcul final : On commence à 1 (en ignorant les 21 tests précédents de GitHub)
        setStats({
          downloads: totalDownloads > 21 ? (totalDownloads - 21) : 1,
          playlists: internalData.playlists || 0
        });
        setLoaded(true);
      } catch (error) {
        console.error("Erreur stats:", error);
        setLoaded(true);
      }
    }

    fetchRealStats();
  }, []);

  const items = [
    { value: stats.downloads, label: 'Téléchargements réels', suffix: '', color: 'text-red-500' },
    { value: stats.playlists, label: 'Playlists traitées', suffix: '', color: 'text-orange-500' },
    { value: 3, label: 'Plateformes', suffix: '', color: 'text-blue-400' },
    { value: 100, label: 'Open Source', suffix: '%', color: 'text-green-400' }
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[2rem] p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className={`text-4xl md:text-5xl font-black mb-3 ${item.color} tracking-tighter`}>
                  <AnimatedCounter target={loaded ? item.value : 0} suffix={item.suffix} />
                </div>
                <div className="h-1 w-8 bg-white/10 rounded-full mb-3" />
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
