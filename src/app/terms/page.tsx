'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main className="gradient-bg min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors">
          ← Retour à l'accueil
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-3xl">
          <h1 className="text-4xl font-bold mb-8 text-white">Conditions d'Utilisation</h1>
          
          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Acceptation des Conditions</h2>
              <p>
                En utilisant YT Downloader Pro (le site ou l'application), vous acceptez d'être lié par les présentes conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Usage Autorisé</h2>
              <p>
                Vous vous engagez à utiliser cet outil uniquement pour télécharger du contenu dont vous détenez les droits, ou pour lequel vous avez reçu une autorisation explicite de l'ayant-droit. L'usage commercial est strictement interdit sans accord préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Clause de Non-Responsabilité</h2>
              <p>
                YT Downloader Pro est fourni "en l'état", sans aucune garantie d'aucune sorte. Nous ne serons pas tenus responsables des dommages résultant de l'utilisation de cet outil, ni de la violation des droits d'auteur par l'utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Propriété Intellectuelle</h2>
              <p>
                L'application est distribuée sous licence Open Source. Vous êtes encouragé à consulter, modifier et contribuer au code source via GitHub. Cependant, le nom "YT Downloader Pro" et les logos associés restent la propriété de leur créateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Modifications</h2>
              <p>
                Nous nous réservons le droit de modifier ces conditions à tout moment. Il est de votre responsabilité de les consulter régulièrement.
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
