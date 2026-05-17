import { NextResponse } from 'next/server';
const SingPay = require('singpay-sdk');

const singPay = new SingPay({
  clientId: process.env.SINGPAY_CLIENT_ID,
  clientSecret: process.env.SINGPAY_CLIENT_SECRET,
  walletId: process.env.SINGPAY_WALLET,
  isProduction: process.env.SINGPAY_PRODUCTION === 'true'
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, phone, operator } = body;

    if (!amount || !phone || !operator) {
      return NextResponse.json({ error: 'Montant, numéro et opérateur requis' }, { status: 400 });
    }

    // Nettoyage du numéro de téléphone (doit commencer par 0 et faire 9 chiffres, ex: 074000000)
    let cleanPhone = phone.replace(/[\s-]/g, '');
    if (cleanPhone.startsWith('+241')) {
      cleanPhone = '0' + cleanPhone.slice(4);
    }
    if (!/^0[0-9]{8}$/.test(cleanPhone)) {
      return NextResponse.json({ error: 'Numéro de téléphone gabonais invalide (ex: 074000000)' }, { status: 400 });
    }

    const reference = `DIRECT-${Date.now()}`;
    let paymentResponse;

    if (operator === 'airtel') {
      paymentResponse = await singPay.payAirtel(amount, cleanPhone, reference);
    } else if (operator === 'moov') {
      paymentResponse = await singPay.payMoov(amount, cleanPhone, reference);
    } else {
      return NextResponse.json({ error: 'Opérateur non supporté (airtel ou moov uniquement)' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      payment: paymentResponse,
      transactionId: paymentResponse.transaction?.id || paymentResponse.transaction_id || paymentResponse.id
    });
  } catch (error: any) {
    console.error('Erreur SingPay Push:', error);
    return NextResponse.json({ error: error.message || 'Erreur lors du traitement du paiement' }, { status: 500 });
  }
}
