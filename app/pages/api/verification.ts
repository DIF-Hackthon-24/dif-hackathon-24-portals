import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = 'https://example.com/verification-login';  // This would be your verification URL or payload
  try {
    const qrCode = await QRCode.toDataURL(data);
    res.status(200).json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
}
