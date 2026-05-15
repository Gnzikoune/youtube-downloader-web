# 🌐 YT Downloader Pro - Landing Page

La page officielle de présentation et de téléchargement pour **YT Downloader Pro**. Une interface web premium, responsive et optimisée pour la conversion.

🔗 **Démo Live** : [youtube-downloader-pro.vercel.app](https://youtube-downloader-pro.vercel.app)

---

## 🎨 Design & Expérience

Le site a été conçu avec une esthétique moderne et épurée :
- **Glassmorphism** : Effets de transparence et de flou pour un look futuriste.
- **Micro-animations** : Transitions fluides avec Framer Motion.
- **Dark Mode natif** : Palette de couleurs optimisée pour le confort visuel.
- **Mobile First** : Entièrement responsive pour tous les terminaux.

---

## 🔥 Fonctionnalités du Site

- **Mockup d'App Interactif** : Une prévisualisation réaliste de l'application desktop.
- **Statistiques en Temps Réel** : Affichage dynamique des téléchargements effectués.
- **Section FAQ** : Réponses claires aux questions fréquentes.
- **Intégration SingPay** : Système de don sécurisé via Mobile Money (Gabon).
- **SEO Optimisé** : Balisage sémantique et métadonnées pour un meilleur référencement.
- **Analytics** : Suivi des performances via Vercel Analytics.

---

## 🛠️ Stack Technique

- **Framework** : [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icons** : [Lucide React](https://lucide.dev/)
- **Hébergement** : [Vercel](https://vercel.com/)

---

## 🚀 Déploiement Local

```bash
# Cloner le projet
git clone https://github.com/Gnzikoune/youtube-downloader-web.git

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créez un fichier .env.local avec vos clés SingPay

# Lancer en mode développement
npm run dev
```

---

## 📁 Structure du Projet

- `/src/app` : Routes et pages (Home, Privacy, Terms).
- `/src/components` : Composants UI réutilisables (Hero, Mockup, FAQ).
- `/src/api` : Routes API pour la gestion des dons SingPay.

---

## 🛡️ Environnement
Le site utilise les variables suivantes pour l'intégration SingPay :
- `SINGPAY_CLIENT_ID`
- `SINGPAY_CLIENT_SECRET`
- `SINGPAY_WALLET`
- `SINGPAY_PRODUCTION`

---

**Développé par Gildas NZIKOUNÉ**
