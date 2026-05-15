'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DownloadButton from './DownloadButton';
import AppMockup from './AppMockup';

export default function Hero() {
  const [version, setVersion] = useState('...');

  useEffect(() => {
    fetch('https://api.github.com/repos/Gnzikoune/youtube-downloader/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (data.tag_name) setVersion(data.tag_name);
      })
      .catch(() => setVersion('v1.0.0'));
  }, []);

  return (
    <section className="relative pt-20 pb-16 px-6">
      {/* Effets de lumière en arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-screen pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-orange-600/10 blur-[120px] rounded-full" />
      </div>
      
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="flex justify-center mb-8">
            <img 
              src="/icon.png" 
              alt="YT Downloader Pro Logo" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain animate-float drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mt-4 mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-400 text-[10px] font-bold tracking-widest uppercase">Version {version} Stable</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-white">
            Téléchargez sans <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500">
              aucune limite.
            </span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Récupérez vos vidéos YouTube en 4K, 1080p ou MP3 avec une expérience premium. 
            Gratuit, Open Source et ultra-rapide.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <DownloadButton />
            <p className="text-slate-500 text-[10px]">Windows, macOS & Linux supportés</p>
          </div>
        </motion.div>

        {/* Mockup de l'App */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="mt-16 relative max-w-4xl mx-auto group"
        >
          {/* Lueur pulsante derrière le mockup */}
          <div className="absolute inset-0 bg-red-600/5 blur-[100px] rounded-full group-hover:bg-red-600/10 transition-colors duration-1000" />
          
          <div className="relative glass rounded-2xl p-1.5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border-white/10 overflow-hidden">
            {/* Window controls */}
            <div className="bg-[#0f172a] rounded-t-xl px-5 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-slate-500 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-600" />
                YT Downloader Pro — {version}
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* App Body */}
            <div className="h-[400px] md:h-[500px]">
              <AppMockup />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
