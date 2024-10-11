import QRCode from 'qrcode';

export async function GET() {

  const data = 'https://example.com/verification-login';  // This would be your verification URL or payload

  const qrCode = await QRCode.toDataURL(data);
  return Response.json({ qrCode })
}
