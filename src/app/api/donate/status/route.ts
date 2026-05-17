import { NextResponse } from 'next/server';
const SingPay = require('singpay-sdk');

const singPay = new SingPay({
  clientId: process.env.SINGPAY_CLIENT_ID,
  clientSecret: process.env.SINGPAY_CLIENT_SECRET,
  walletId: process.env.SINGPAY_WALLET,
  isProduction: process.env.SINGPAY_PRODUCTION === 'true'
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('id');

    if (!transactionId) {
      return NextResponse.json({ error: 'ID de transaction requis' }, { status: 400 });
    }

    const status = await singPay.checkTransactionStatus(transactionId);
    return NextResponse.json(status);
  } catch (error: any) {
    console.error('Erreur vérification transaction:', error);
    return NextResponse.json({ error: error.message || 'Erreur de vérification' }, { status: 500 });
  }
}
