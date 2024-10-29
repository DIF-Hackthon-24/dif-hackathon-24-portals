import { randomUUID } from "crypto";
import * as ws from "ws";

export async function POST() {
  let openIDLink = "";
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

  const data = await fetch(urlRedirect, {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8",
      "Accept-Language": "en-GB,en;q=0.5",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      Priority: "u=0, i",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    method: "GET",
    mode: "cors",
  });

  const headerLoaction = data.url;
  const resp = await data.text();

  const negotiation = await fetch(
    "https://locprod.ccg.condatis.com/Issue/negotiate?negotiateVersion=1",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0",
        Accept: "*/*",
        "Accept-Language": "en-GB,en;q=0.5",
        "Content-Type": "text/plain;charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "X-SignalR-User-Agent":
          "Microsoft SignalR/5.0 (5.0.3; Unknown OS; Browser; Unknown Runtime Version)",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Priority: "u=4",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      referrer: headerLoaction,
      method: "POST",
      mode: "cors",
    }
  );

  const negotiationJson = await negotiation.json();
  const token = negotiationJson.connectionToken;

  const openIDLinkPromise = new Promise((resolve, reject) => {
    var client = new ws.WebSocket(
      "wss://locprod.ccg.condatis.com/Issue?id=" + token,
      [],
      {
        protocolVersion: 13,
        perMessageDeflate: true,
        headers: {
          cookie: data.headers.get("Set-Cookie")!!,
          // "user-agent":
          //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0",
          host: "locprod.ccg.condatis.com",
          origin: "https://locprod.ccg.condatis.com",
          // prgama: "no-cache",
          // accept: "*/*",
          // "accept-language": "en-GB,en;q=0.5",
          // "accept-encoding": "gzip, deflate, br, zstd",
          // "sec-websocket-extensions":"permessage-deflate",
          // connection: "keep-alive, Upgrade",
          // "cache-control":"no-cache",
          // upgrade: "websocket"
        },
      }
    );

    const dataIdentifier = headerLoaction
      ?.split("?")[0]
      .split("/")
      .slice(-1)[0];
    const unicodeChar = "";

    client.on("open", function () {
      client.send(`{ "protocol": "json", "version": 1 }` + unicodeChar);
    });

    const msgToSend =
      JSON.stringify({
        arguments: [dataIdentifier],
        invocationId: "0",
        target: "ConfirmCredentialPreview",
        type: 1,
      }) + unicodeChar;

    client.on("error", function (error: any) {
      console.log("Connection Error: " + error.toString());
    });
    client.on("close", function () {
      console.log("echo-protocol Connection Closed");
    });
    client.on("message", async function message(data: any) {
      console.log("messageReceived: " + data);
      if (data == "{}" + unicodeChar) {
        console.log("detected empty msg");
        await sleep(3000);
        client.send(msgToSend);
      }

      const bufferData = Buffer.from(data);
      const jsonString = bufferData
        .toString("utf-8")
        .replace(/[^ -~]+/g, "")
        .trim(); // Remove non-printable characters

      let jsonObject;
      try {
        jsonObject = JSON.parse(jsonString);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }

      if (jsonObject.target === "ShowInvitation") {
        const uri = jsonObject.arguments?.[0]?.invitationUrl;
        openIDLink = uri;
        resolve(openIDLink);
        client.close();
      }
    });

    function sleep(ms: any) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    var i = 0;
  });

  const result = await openIDLinkPromise;

  return Response.json({ link: result });
}
