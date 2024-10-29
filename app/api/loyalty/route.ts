import { randomUUID } from "crypto";

export async function GET() {
  const credentialType = "LoyaltyCredential";

  const urlRedirect =
    "https://locprod.ccg.condatis.com/v2/oidc/authorize?client_id=755a002b-17dd-49e7-94e3-8a25dfb498be&response_type=code&redirect_uri=" +
    "http://localhost:3000/spa?discounted=true" +
    "&response_mode=query&scope=openid+" +
    credentialType +
    "&code_challenge_method=S256&code_challenge=_r67lcj4MoDNBAkhxS7ke_YKhKCBAiM0SgzNCagbCxo&nonce=" +
    randomUUID() +
    "&state=" +
    randomUUID();

  return Response.json({ urlRedirect });
}

export async function POST() {
    const credentialType = "LoyaltyCredential";
    const idTokenHint =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUaWVyIjoiQmx1ZSIsIlNlcmlhbE51bWJlciI6IiIsIm5iZiI6MTcyOTcwNDY4NiwiZXhwIjoxNzQ1NDI5NDg2LCJpYXQiOjE3Mjk3MDQ2ODYsImlzcyI6Ijc1NWEwMDJiLTE3ZGQtNDllNy05NGUzLThhMjVkZmI0OThiZSIsImF1ZCI6Imh0dHBzOi8vbG9jcHJvZC5jY2cuY29uZGF0aXMuY29tIn0.07L73BkiTjfn2ipRJwWEC5qMHNiN0DMakEDEMy1m53k";
  
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