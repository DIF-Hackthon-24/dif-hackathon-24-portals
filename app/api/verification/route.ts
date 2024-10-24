import { randomUUID } from "crypto";

export async function GET() {
  const credentialType = "StarlightHotelsLogin";

  const urlRedirect =
    "https://locprod.ccg.condatis.com/v2/oidc/authorize?client_id=755a002b-17dd-49e7-94e3-8a25dfb498be&response_type=code&redirect_uri=" +
    "http://localhost:3000/browse" +
    "&response_mode=query&scope=openid+" +
    credentialType +
    "&code_challenge_method=S256&code_challenge=_r67lcj4MoDNBAkhxS7ke_YKhKCBAiM0SgzNCagbCxo&nonce=" +
    randomUUID() +
    "&state=" +
    randomUUID();

  console.log("line20: " + urlRedirect);

  return Response.json({ urlRedirect });
}
