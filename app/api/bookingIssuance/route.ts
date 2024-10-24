import { randomUUID } from "crypto";

export async function POST() {
  const credentialType = "StarlightHotelsBooking";
  const idTokenHint =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJCb29raW5nSUQiOiIxOTQ4MzVBIiwiSG90ZWxOYW1lIjoiVmVyZGFudCBSZXRyZWF0IiwiRnJvbSI6IjE5LzExLzIwMjQiLCJUbyI6IjI0LzExLzIwMjQiLCJSb29tVHlwZSI6IlN1bnNldCBFeGVjdXRpdmUgU3VpdGUiLCJUb3RhbEFtb3VudCI6IjEzMDAiLCJTZXJpYWxOdW1iZXIiOiIiLCJuYmYiOjE3Mjk3MDI3MzksImV4cCI6MTc0NTQyNzUzOSwiaWF0IjoxNzI5NzAyNzM5LCJpc3MiOiI3NTVhMDAyYi0xN2RkLTQ5ZTctOTRlMy04YTI1ZGZiNDk4YmUiLCJhdWQiOiJodHRwczovL2xvY3Byb2QuY2NnLmNvbmRhdGlzLmNvbSJ9.PZU5NfYtqqfyCYsLI2qYuE9xPnGOBQMlUyf2DIRHAx8";

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
