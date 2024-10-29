
import { randomUUID } from "crypto";

export async function POST() {
  const credentialType = "StarlightHotelsRoomKey";
  const idTokenHint =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJIb3RlbE5hbWUiOiJTdGFydGxpZ2h0IEhvdGVscyIsIlJvb21JRCI6IlNUNzAxIiwiU2VyaWFsTnVtYmVyIjoiIiwibmJmIjoxNzI5MjY3MzY4LCJleHAiOjE3NDQ5OTIxNjgsImlhdCI6MTcyOTI2NzM2OCwiaXNzIjoiNzU1YTAwMmItMTdkZC00OWU3LTk0ZTMtOGEyNWRmYjQ5OGJlIiwiYXVkIjoiaHR0cHM6Ly9sb2Nwcm9kLmNjZy5jb25kYXRpcy5jb20ifQ.x2Yb2EQnGfWPxznsS8CSbqKEqfqBxiBNwzGJO2PXN_I";

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
