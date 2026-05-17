'use client';

import { useEffect, useState } from 'react';
import { Download, Apple, Monitor, ChevronDown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

type OS = 'Windows' | 'macOS' | 'Linux' | 'Unknown';

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

export default function DownloadButton() {
  const [os, setOs] = useState<OS>('Unknown');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fallbackVersion = 'v1.9.1';
  const cleanFallbackVersion = '1.9.1';
  const fallbackUrl = 'https://github.com/Gnzikoune/youtube-downloader/releases/latest';

  const defaultLinks: Record<string, string> = {
    'Windows': `https://github.com/Gnzikoune/youtube-downloader/releases/download/${fallbackVersion}/YT-Downloader-Pro-Setup-${cleanFallbackVersion}.exe`,
    'macOS': `https://github.com/Gnzikoune/youtube-downloader/releases/download/${fallbackVersion}/YT-Downloader-Pro-${cleanFallbackVersion}.dmg`,
    'Linux': `https://github.com/Gnzikoune/youtube-downloader/releases/download/${fallbackVersion}/YT-Downloader-Pro-${cleanFallbackVersion}.AppImage`,
  };

  const [links, setLinks] = useState<Record<string, string>>(defaultLinks);

  const repoApiUrl = 'https://api.github.com/repos/Gnzikoune/youtube-downloader/releases/latest';

  useEffect(() => {
    setMounted(true);
    
    // 1. Détecter l'OS
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) setOs('Windows');
    else if (userAgent.indexOf('Mac') !== -1) setOs('macOS');
    else if (userAgent.indexOf('Linux') !== -1) setOs('Linux');

    // 2. Récupérer les liens de téléchargement directs depuis GitHub
    fetch(repoApiUrl)
      .then(res => {
        if (!res.ok) throw new Error('API Rate Limit or Connection Error');
        return res.json();
      })
      .then(data => {
        const assets: GitHubAsset[] = data.assets || [];
        if (assets.length > 0) {
          const newLinks: Record<string, string> = {};
          assets.forEach(asset => {
            if (asset.name.endsWith('.exe')) newLinks['Windows'] = asset.browser_download_url;
            if (asset.name.endsWith('.dmg')) newLinks['macOS'] = asset.browser_download_url;
            if (asset.name.endsWith('.AppImage')) newLinks['Linux'] = asset.browser_download_url;
          });
          setLinks(newLinks);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getIcon = () => {
    if (loading) return <Loader2 className="w-5 h-5 animate-spin" />;
    if (os === 'macOS') return <Apple className="w-5 h-5" />;
    if (os === 'Linux') return <Monitor className="w-5 h-5" />;
    return <Download className="w-5 h-5" />;
  };

  const getLabel = () => {
    if (!mounted) return 'Télécharger le logiciel';
    if (loading) return 'Recherche de la version...';
    if (os === 'Unknown') return 'Télécharger YT Downloader';
    return `Télécharger pour ${os}`;
  };

  const currentDownloadLink = links[os] || fallbackUrl;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.a
        href={currentDownloadLink}
        // Pour les fichiers directs, on peut forcer le téléchargement si besoin, 
        // mais les navigateurs le font déjà pour les .exe/.dmg
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-600/20 transition-colors"
      >
        {getIcon()}
        {getLabel()}
      </motion.a>
      
      <div className="group relative">
        <button className="text-slate-400 text-sm flex items-center gap-1 hover:text-white transition-colors">
          Autres plateformes <ChevronDown className="w-4 h-4" />
        </button>
        
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 glass rounded-xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50 shadow-2xl">
          <a href={links['Windows'] || fallbackUrl} className="block px-4 py-2 hover:bg-white/5 rounded-lg text-sm text-white">Windows (.exe)</a>
          <a href={links['macOS'] || fallbackUrl} className="block px-4 py-2 hover:bg-white/5 rounded-lg text-sm text-white">macOS (.dmg)</a>
          <a href={links['Linux'] || fallbackUrl} className="block px-4 py-2 hover:bg-white/5 rounded-lg text-sm text-white">Linux (.AppImage)</a>
        </div>
      </div>
    </div>
  );
}
