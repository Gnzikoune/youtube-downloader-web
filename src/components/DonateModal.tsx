'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Smartphone, CheckCircle, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'form' | 'pending' | 'success' | 'error';
type Operator = 'airtel' | 'moov';

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [amount, setAmount] = useState<number>(1000);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState<Operator>('airtel');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);

  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  const presetAmounts = [500, 1000, 2000, 5000];

  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setAmount(1000);
      setIsCustomAmount(false);
      setCustomAmount('');
      setPhone('');
      setOperator('airtel');
      setIsLoading(false);
      setTransactionId(null);
      setErrorMsg(null);
      stopIntervals();
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 'pending' && timer > 0) {
      countdownInterval.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            stopIntervals();
            setStep('error');
            setErrorMsg('Délai d\'attente de validation (60s) dépassé. Veuillez réessayer.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownInterval.current) clearInterval(countdownInterval.current);
    };
  }, [step, timer]);

  const stopIntervals = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
  };

  const handleAmountSelect = (val: number) => {
    setIsCustomAmount(false);
    setAmount(val);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    setAmount(val ? parseInt(val) : 0);
  };

  const validatePhone = (num: string) => {
    const clean = num.replace(/[\s-]/g, '');
    return /^0[67][0-9]{7}$/.test(clean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const finalAmount = isCustomAmount ? parseInt(customAmount) : amount;
    if (!finalAmount || finalAmount < 100) {
      setErrorMsg('Le montant minimum est de 100 FCFA');
      return;
    }

    if (!validatePhone(phone)) {
      setErrorMsg('Numéro invalide. Format requis : 07xxxxxxx ou 06xxxxxxx');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/donate/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          phone,
          operator
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors du lancement du paiement.');
      }

      setTransactionId(data.transactionId);
      setStep('pending');
      setTimer(60);

      startPolling(data.transactionId);

    } catch (err: any) {
      setErrorMsg(err.message || 'Impossible de joindre le service de paiement.');
    } finally {
      setIsLoading(false);
    }
  };

  const startPolling = (id: string) => {
    pollingInterval.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/donate/status?id=${id}`);
        const data = await response.json();

        // Extraction robuste et insensible à la casse du statut retourné par SingPay (français ou anglais)
        const rawStatus = (
          data.status || 
          data.statut || 
          data.transaction?.status || 
          data.transaction?.statut || 
          ''
        ).toString().toUpperCase().trim();

        // 1. Liste des états de succès explicites
        const isSuccess = ['SUCCESS', 'SUCCES', 'REUSSI', 'RÉUSSI', 'VALIDATED', 'COMPLETED'].includes(rawStatus);

        // 2. Liste des états d'attente explicites (l'utilisateur n'a pas encore validé son PIN)
        const isPending = ['PENDING', 'EN_COURS', 'EN ATTENTE', 'ATTENTE', 'PROCESSING', ''].includes(rawStatus);

        if (isSuccess) {
          stopIntervals();
          setStep('success');
        } else if (isPending) {
          // La transaction est toujours en cours d'attente, on continue de tourner tranquillement
        } else {
          // Tout autre statut (FAILED, ECHEC, REFUSED, CANCELLED, DECLINED, INSUFFICIENT_BALANCE, etc.)
          // est un échec définitif de paiement. On arrête immédiatement le loader !
          stopIntervals();
          setStep('error');
          setErrorMsg(data.message || data.error || 'Le paiement a échoué ou a été refusé (ex: Solde insuffisant).');
        }
      } catch (e) {
        console.error('Erreur lors du suivi de la transaction:', e);
      }
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop avec blur premium */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container - Ultra-Compact et Ergonomique */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 p-5 sm:p-6"
          >
            {/* Bouton de fermeture discret */}
            <button
              onClick={onClose}
              id="close-donate-modal"
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ÉTAPE 1 : FORMULAIRE DE DON COMPACT */}
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
                    <h3 className="text-base font-extrabold text-white">Soutenir YT Downloader</h3>
                  </div>
                  <p className="text-slate-450 text-[11px] mt-0.5 text-center sm:text-left">
                    Votre contribution permet de garder l'application gratuite et sans pub.
                  </p>
                </div>

                {/* Sélecteurs de montants compacts */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-wider">
                    <span>MONTANT DU DON</span>
                    <button
                      type="button"
                      onClick={() => setIsCustomAmount(!isCustomAmount)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      {isCustomAmount ? 'Forfaits' : 'Montant libre'}
                    </button>
                  </div>

                  {isCustomAmount ? (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Saisir montant en FCFA (min. 100)..."
                        className="w-full bg-slate-800 border border-white/5 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-red-500 transition-all font-semibold"
                        autoFocus
                      />
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-4 gap-1.5">
                      {presetAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleAmountSelect(amt)}
                          className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                            amount === amt && !isCustomAmount
                              ? 'bg-red-600 text-white border-red-500 shadow-md'
                              : 'bg-slate-800 text-slate-300 border-white/5 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Choix de l'opérateur (Segmented Control horizontal ultra-compact) */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
                    OPÉRATEUR MOBILE MONEY (GABON)
                  </span>
                  <div className="bg-slate-850 p-1 rounded-xl grid grid-cols-2 gap-1 border border-white/5">
                    {/* Airtel Money */}
                    <button
                      type="button"
                      onClick={() => setOperator('airtel')}
                      className={`py-1.5 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        operator === 'airtel'
                          ? 'bg-red-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                      Airtel Money
                    </button>

                    {/* Moov Money */}
                    <button
                      type="button"
                      onClick={() => setOperator('moov')}
                      className={`py-1.5 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        operator === 'moov'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 block" />
                      Moov Money
                    </button>
                  </div>
                </div>

                {/* Saisie de numéro de téléphone */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
                    NUMÉRO DE TÉLÉPHONE
                  </span>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 074123456 ou 062123456"
                      className="w-full bg-slate-800 border border-white/5 rounded-lg py-2.5 pl-9 pr-3 text-white text-xs outline-none focus:border-red-500 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Section d'erreur */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-[10px] font-semibold leading-relaxed"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {/* Bouton de validation compact */}
                <button
                  type="submit"
                  disabled={isLoading}
                  id="submit-push-donation"
                  className="w-full bg-white text-slate-950 hover:bg-slate-200 disabled:bg-slate-700 disabled:text-slate-400 py-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Initialisation...
                    </>
                  ) : (
                    <>
                      Valider le don de {amount.toLocaleString()} FCFA
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ÉTAPE 2 : EN ATTENTE DE VALIDATION PIN USSD */}
            {step === 'pending' && (
              <div className="text-center py-4 space-y-4">
                <div className="flex justify-center">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                      className={`absolute inset-0 rounded-full ${
                        operator === 'airtel' ? 'bg-red-500/20' : 'bg-blue-500/20'
                      }`}
                    />
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[10px] text-white shadow-lg ${
                        operator === 'airtel' ? 'bg-red-600' : 'bg-blue-600'
                      }`}
                    >
                      {operator.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-white">Validation sur votre mobile</h3>
                  <p className="text-slate-350 text-xs max-w-xs mx-auto">
                    Une demande a été envoyée sur le <span className="text-white font-bold">{phone}</span>.
                  </p>
                  <p className="text-slate-400 text-[10px] max-w-xs mx-auto">
                    Saisissez votre code PIN secret sur votre téléphone pour approuver le don de <span className="text-white font-semibold">{amount.toLocaleString()} FCFA</span>.
                  </p>
                </div>

                {/* Minuteur en attente */}
                <div className="bg-slate-800 border border-white/5 rounded-xl py-2 px-3 inline-flex items-center gap-2">
                  <Loader2 className={`w-3.5 h-3.5 animate-spin ${operator === 'airtel' ? 'text-red-500' : 'text-blue-400'}`} />
                  <span className="text-[10px] font-bold text-slate-300">
                    Attente : {timer}s
                  </span>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : SUCCÈS CONFIRMÉ */}
            {step === 'success' && (
              <div className="text-center py-4 space-y-4">
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-8 h-8 fill-green-500/25" />
                  </motion.div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white">Merci infiniment ! ❤️</h3>
                  <p className="text-slate-300 text-xs max-w-xs mx-auto">
                    Votre don de <span className="text-green-400 font-bold">{amount.toLocaleString()} FCFA</span> a été reçu avec succès.
                  </p>
                  <p className="text-slate-450 text-[10px] max-w-xs mx-auto leading-relaxed">
                    Votre générosité permet de garder l'application libre de droits et sans aucune publicité.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-green-500 hover:bg-green-600 text-slate-950 hover:text-white py-2.5 rounded-lg text-xs font-black transition-all cursor-pointer shadow-lg"
                >
                  Fermer
                </button>
              </div>
            )}

            {/* ÉTAPE 4 : ÉCHEC / ERREUR */}
            {step === 'error' && (
              <div className="text-center py-4 space-y-4">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-white">Échec du paiement</h3>
                  <p className="text-slate-350 text-xs max-w-xs mx-auto font-medium">
                    La transaction a été interrompue.
                  </p>
                  {errorMsg && (
                    <p className="text-red-400 text-[10px] bg-red-500/5 border border-red-500/10 rounded-lg py-2 px-2.5 max-w-xs mx-auto leading-relaxed">
                      {errorMsg}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      setStep('form');
                      setErrorMsg(null);
                    }}
                    className="w-full bg-white hover:bg-slate-200 text-slate-950 py-2.5 rounded-lg text-xs font-black transition-all cursor-pointer"
                  >
                    Réessayer
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-slate-400 hover:text-white py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
