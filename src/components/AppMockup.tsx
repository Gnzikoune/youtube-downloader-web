'use client';

export default function AppMockup() {
  const videos = [
    { title: "Electron js Tutorial - 1 - Introduction", duration: "08:24", progress: 72 },
    { title: "Electron js Tutorial - 2 - BrowserWindow", duration: "12:10", progress: null },
    { title: "Electron js Tutorial - 3 - IPC Communication", duration: "18:45", progress: null },
  ];

  return (
    <div className="w-full h-full bg-[#020617] flex rounded-xl overflow-hidden font-sans text-sm select-none shadow-inner">
      {/* Sidebar */}
      <div className="w-[180px] bg-[#0f172a] border-r border-white/5 p-4 flex flex-col shrink-0">
        <div className="flex items-center gap-2 mb-8 px-1">
          <div className="bg-red-600 rounded-md p-1.5 text-[10px] font-black shadow-lg shadow-red-600/20">▶</div>
          <span className="font-bold text-xs text-white tracking-tight">YT Downloader</span>
        </div>
        
        <nav className="space-y-1">
          <div className="bg-red-600 text-white text-[11px] px-3 py-2 rounded-lg font-bold shadow-md">📁 Téléchargement</div>
          <div className="text-slate-400 text-[11px] px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">🕒 Historique</div>
          <div className="text-slate-400 text-[11px] px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">⚙️ Paramètres</div>
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] px-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Moteur prêt
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-5 bg-gradient-to-br from-[#0f172a] to-[#020617] overflow-hidden">
        <h2 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
          Nouveau Téléchargement
        </h2>
        
        {/* Input area */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5 shadow-sm">
          <div className="flex gap-2 mb-4">
            <div className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-slate-400 text-xs truncate flex items-center">
              https://www.youtube.com/playlist?list=PLC3y8...
            </div>
            <button className="bg-red-600 hover:bg-red-500 text-white text-xs px-4 py-2 rounded-lg font-bold transition-colors">
              Vérifier
            </button>
          </div>
          
          <div className="flex items-center gap-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Format</span>
              <div className="flex bg-black/40 rounded-md p-0.5 border border-white/10">
                <span className="bg-[#1e293b] text-white text-[9px] px-2 py-1 rounded shadow-sm font-bold">VIDÉO</span>
                <span className="text-slate-500 text-[9px] px-2 py-1">AUDIO</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Qualité</span>
              <span className="text-slate-300 text-[9px] bg-black/40 px-2 py-1 rounded border border-white/10 font-medium">1080p (Optimale)</span>
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="flex-1 flex flex-col min-h-0 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs font-bold tracking-tight">Playlist : Electron js (24 vidéos)</span>
            <button className="text-red-500 text-[10px] font-bold hover:underline">Tout sélectionner</button>
          </div>
          
          <div className="space-y-2 overflow-y-auto pr-1">
            {videos.map((v, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-lg p-2.5 hover:bg-white/[0.05] transition-colors">
                <div className="w-20 h-11 bg-slate-800 rounded shadow-md flex-shrink-0 relative group overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-1 right-1 bg-black/80 text-[8px] px-1 rounded font-bold text-white leading-tight">
                     {v.duration}
                   </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[11px] font-semibold truncate leading-tight mb-1">{v.title}</div>
                  {v.progress ? (
                    <div className="space-y-1">
                      <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" style={{ width: `${v.progress}%` }} />
                      </div>
                      <div className="flex justify-between text-[9px] font-bold">
                        <span className="text-red-400">Fusion... {v.progress}%</span>
                        <span className="text-slate-500 italic">2.4 MiB/s</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Prêt à télécharger</div>
                  )}
                </div>

                {!v.progress && (
                  <button className="w-8 h-8 flex items-center justify-center bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs">
                    ↓
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
