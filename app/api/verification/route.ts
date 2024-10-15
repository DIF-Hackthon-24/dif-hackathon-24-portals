import { generateRandomString } from "@/app/utils";
import QRCode from "qrcode";

export async function GET() {
  const url = "https://verifier.portal.walt.id/openid4vc/verify";
  const stateId = generateRandomString(10);

  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("authorizeBaseUrl", "openid4vp://authorize");
  myHeaders.append("responseMode", "direct_post");
  myHeaders.append("stateId", stateId);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    request_credentials: [
      {
        format: "jwt_vc_json",
        type: "UniversityDegreeCredential",
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(url, requestOptions);

  if (response.ok) {
    const responseText = await response.text();
    const qrCode = await QRCode.toDataURL(responseText);
    console.log(stateId);
    return Response.json({ qrCode, stateId });
  }
}
