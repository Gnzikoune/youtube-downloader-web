import { Zap, Shield, List, Music, Monitor, HardDrive } from 'lucide-react';

const features = [
  {
    title: "Vitesse Fulgurante",
    desc: "Moteur yt-dlp optimisé pour des téléchargements multi-flux ultra-rapides.",
    icon: Zap
  },
  {
    title: "Playlists Complètes",
    desc: "Analysez et téléchargez des centaines de vidéos en un seul clic.",
    icon: List
  },
  {
    title: "Qualité 4K & MP3",
    desc: "Choisissez entre la meilleure résolution vidéo ou une extraction audio pure.",
    icon: Music
  },
  {
    title: "100% Privé",
    desc: "Aucun compte requis. Vos données et votre historique restent sur votre machine.",
    icon: Shield
  },
  {
    title: "Multi-Plateforme",
    desc: "Fonctionne nativement sur Windows, macOS et les distributions Linux.",
    icon: Monitor
  },
  {
    title: "Fusion Intelligente",
    desc: "Fusion automatique de la vidéo et de l'audio via FFmpeg pour un MP4 parfait.",
    icon: HardDrive
  }
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir YT Downloader Pro ?</h2>
          <p className="text-slate-400">La puissance de l'Open Source avec une interface professionnelle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="glass p-8 rounded-2xl hover:border-red-500/50 transition-colors group">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                <f.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
