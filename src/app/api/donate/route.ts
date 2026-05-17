import { NextResponse } from 'next/server';
const SingPay = require('singpay-sdk');

const singPay = new SingPay({
  clientId: process.env.SINGPAY_CLIENT_ID,
  clientSecret: process.env.SINGPAY_CLIENT_SECRET,
  walletId: process.env.SINGPAY_WALLET,
  isProduction: process.env.SINGPAY_PRODUCTION === 'true'
});

export async function POST() {
  try {
    const reference = `WEB-DON-${Date.now()}`;
    const linkInfo = await singPay.generatePaymentLink(
      1000, 
      reference,
      'https://youtube-downloader-web-pro.vercel.app/success',
      'https://youtube-downloader-web-pro.vercel.app/cancel'
    );

    return NextResponse.json({ url: linkInfo.link });
  } catch (error) {
    console.error('Erreur SingPay:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du lien' }, { status: 500 });
  }
}
