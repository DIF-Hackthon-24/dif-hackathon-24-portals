import { randomUUID } from "crypto";

export async function POST() {
  const credentialType = "StarlightHotelsBooking";
  const idTokenHint =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJCb29raW5nSUQiOiJTVEpCMDUiLCJIb3RlbE5hbWUiOiJTdGFydGxpZ2h0IEhvdGVscyIsIkRhdGVzIjoiMDUtMDEtMjAyNSAtIDA5LTAxLTIwMjUiLCJSb29tVHlwZSI6IlByZW1pdW0gRXhlY3V0aXZlIiwiVG90YWxBbW91bnQiOiJVU0QgMjI1MCIsIlNlcmlhbE51bWJlciI6IiIsIm5iZiI6MTcyOTI2NzI2MCwiZXhwIjoxNzQ0OTkyMDYwLCJpYXQiOjE3MjkyNjcyNjAsImlzcyI6Ijc1NWEwMDJiLTE3ZGQtNDllNy05NGUzLThhMjVkZmI0OThiZSIsImF1ZCI6Imh0dHBzOi8vbG9jcHJvZC5jY2cuY29uZGF0aXMuY29tIn0.kBLbH1KnArk-10yA8FxChZohcC3-Yicooljx_H5qg0E";

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

  console.log("line20: " + urlRedirect);

  return Response.json({ urlRedirect });
}
