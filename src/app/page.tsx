'use client';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import FAQ from '@/components/FAQ';
import DownloadButton from '@/components/DownloadButton';
import Link from 'next/link';

export default function Home() {
  const handleDonate = async () => {
    try {
      const response = await fetch('/api/donate', { method: 'POST' });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <main className="gradient-bg min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-3">
          <div className="flex items-center gap-2 font-bold text-lg">
            <img src="/icon.png" alt="Logo" className="w-8 h-8 object-contain" />
            YT Downloader
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="https://github.com/Gnzikoune/youtube-downloader" target="_blank" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDonate}
              className="hidden sm:flex items-center gap-2 border border-white/10 hover:bg-white/5 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            >
              <span className="text-orange-500">❤️</span> Faire un don
            </button>
            <a href="https://github.com/Gnzikoune/youtube-downloader/releases/latest" className="bg-white text-slate-950 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              Télécharger
            </a>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <Hero />
      
      {/* Compteur de téléchargements */}
      <Stats />

      {/* Fonctionnalités */}
      <section id="features">
        <Features />
      </section>

      {/* FAQ */}
      <section id="faq">
        <FAQ />
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Gratuit, sans inscription, sans publicité. Juste vos vidéos.
          </p>
          <DownloadButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-500 text-sm mb-4">
            © {new Date().getFullYear()} YT Downloader Pro — Open Source & Gratuit
          </p>
          <div className="flex justify-center gap-6 text-slate-500 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Conditions</Link>
            <a href="https://github.com/Gnzikoune/youtube-downloader" target="_blank" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
