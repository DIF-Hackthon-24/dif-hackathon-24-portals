import { randomUUID } from "crypto";

export async function POST() {
  const credentialType = "StarlightHotelsLogin";
  const idTokenHint =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IkpvaG5CZWxsNzgiLCJFbWFpbCI6ImpvaG4uYmVsbEBzdGFybGlnaHRob3RlbHMuY29tIiwiU2VyaWFsTnVtYmVyIjoiIiwiRXhwaXJlc0F0IjoiIiwibmJmIjoxNzI5MjY2ODg4LCJleHAiOjE3NDQ5OTE2ODgsImlhdCI6MTcyOTI2Njg4OCwiaXNzIjoiNzU1YTAwMmItMTdkZC00OWU3LTk0ZTMtOGEyNWRmYjQ5OGJlIiwiYXVkIjoiaHR0cHM6Ly9sb2Nwcm9kLmNjZy5jb25kYXRpcy5jb20ifQ.b8lpGoQUzUeXRIgaYonTSE1ADjsm2FyJkAsX8buBsLw";

  const urlRedirect =
    "https://locprod.ccg.condatis.com/v2/oidc/authorize?client_id=755a002b-17dd-49e7-94e3-8a25dfb498be&redirect_uri=" +
    "http://localhost:3000/browse" +
    "&scope=openid+issue." +
    credentialType +
    "&id_token_hint=" +
    idTokenHint +
    "&nonce=" +
    randomUUID() +
    "&state=" +
    randomUUID() +
    "&response_type=code&response_mode=query&code_challenge_method=S256&code_challenge=_r67lcj4MoDNBAkhxS7ke_YKhKCBAiM0SgzNCagbCxo";

  return Response.json({ urlRedirect });
}
