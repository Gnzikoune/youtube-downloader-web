'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "Est-ce légal de télécharger des vidéos YouTube ?",
    a: "Télécharger des vidéos pour un usage personnel et privé est généralement toléré dans la plupart des pays. Cependant, la redistribution ou l'utilisation commerciale de contenu protégé par le droit d'auteur est illégale. Nous vous recommandons de toujours respecter les conditions d'utilisation de YouTube et les droits des créateurs. Cet outil est conçu pour un usage personnel uniquement."
  },
  {
    q: "Quelles sont les qualités vidéo disponibles ?",
    a: "YT Downloader Pro supporte la qualité Optimale (meilleure disponible), 1080p Full HD, 720p HD, ainsi que l'extraction audio en MP3. Pour les vidéos 4K et au-dessus, FFmpeg est requis pour la fusion des flux vidéo et audio."
  },
  {
    q: "Pourquoi ai-je besoin de FFmpeg ?",
    a: "YouTube diffuse la vidéo et l'audio en deux flux séparés pour les hautes résolutions (1080p+). FFmpeg est l'outil standard (open-source) utilisé pour fusionner ces deux flux en un seul fichier MP4 parfait. Sans FFmpeg, l'application télécharge en qualité standard (720p max)."
  },
  {
    q: "Comment fonctionne la mise à jour automatique ?",
    a: "L'application se met à jour automatiquement sur deux niveaux : le moteur de téléchargement (yt-dlp) se met à jour pour maintenir la compatibilité avec YouTube, et l'application elle-même se met à jour via GitHub Releases pour vous apporter les nouvelles fonctionnalités."
  },
  {
    q: "Mes données sont-elles envoyées quelque part ?",
    a: "Non. YT Downloader Pro fonctionne entièrement en local sur votre machine. Aucune URL, aucune vidéo, aucune donnée personnelle n'est envoyée à nos serveurs. Votre historique de téléchargement est stocké localement. La seule connexion externe est vers YouTube via yt-dlp pour récupérer les vidéos."
  },
  {
    q: "L'application est-elle vraiment gratuite ?",
    a: "Oui, à 100%. YT Downloader Pro est un projet open-source disponible sur GitHub. Il n'y a pas de publicité, pas de limite de téléchargements, pas de version premium. Vous pouvez même contribuer au code ou signaler des bugs directement sur le dépôt GitHub."
  }
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09 }}
      className="border border-white/5 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-semibold pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-6 pb-5 text-slate-400 leading-relaxed text-sm">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
          <p className="text-slate-400">Tout ce que vous devez savoir avant de commencer.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
