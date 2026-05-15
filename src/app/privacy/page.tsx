'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="gradient-bg min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors">
          ← Retour à l'accueil
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-3xl">
          <h1 className="text-4xl font-bold mb-8 text-white">Politique de Confidentialité</h1>
          
          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Chez YT Downloader Pro, nous respectons votre vie privée. Cette politique explique comment nous traitons vos données. 
                Comme nous sommes un outil Open Source, notre priorité est la transparence.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Collecte des Données</h2>
              <p>
                <strong>Application Desktop :</strong> L'application ne collecte aucune donnée personnelle. Vos téléchargements sont stockés localement sur votre machine et ne transitent par aucun de nos serveurs.
              </p>
              <p className="mt-4">
                <strong>Site Web :</strong> Nous utilisons des outils d'analyse anonymes pour comprendre l'utilisation de notre site. Aucune information permettant de vous identifier personnellement n'est conservée.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Utilisation de l'outil</h2>
              <p>
                L'utilisateur est seul responsable de l'usage qu'il fait de l'outil. YT Downloader Pro est conçu pour un usage personnel et privé, dans le respect des droits d'auteur et des conditions d'utilisation de YouTube.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Cookies</h2>
              <p>
                Nous n'utilisons que des cookies techniques essentiels au bon fonctionnement du site. Aucun cookie publicitaire tiers n'est utilisé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Contact</h2>
              <p>
                Pour toute question concernant cette politique, vous pouvez consulter notre code source sur GitHub ou nous contacter directement via les canaux officiels du projet.
              </p>
            </section>

            <footer className="pt-8 border-t border-white/5 text-sm text-slate-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
