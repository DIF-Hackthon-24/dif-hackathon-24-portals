import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  console.log(reqBody);
  const url = `http://localhost:3001/records/read`;

  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Type", "application/json");

  // keyInfo hardcoded right now, representing hotel website's keyInfo to sign permission request
  // target is the user's DWN, using hardcoded for now too
  const body = JSON.stringify({
    protocol: reqBody.protocol,
    protocolPaths: reqBody.protocolPaths,
    keyInfo: {
      keyId:
        "did:key:z6MkeXmNA9HutZcYei7YsU5jimrMcb7EU43BWTXqLXw59VRq#z6MkeXmNA9HutZcYei7YsU5jimrMcb7EU43BWTXqLXw59VRq",
      privateJwk: {
        crv: "Ed25519",
        d: "64EBJEwSPeYkEZLSgVFWAOBGftgO-JSdgfRZn470DXs",
        kty: "OKP",
        x: "ASd5wVTGxYk6NWiWtSZIypBkT11mv8r8jpkdTDkyOdA",
        kid: "U1e64aXaBM_1T7KkyzLejCbSLaYGE6Lpy0Rxyc3iuNA",
        alg: "EdDSA"
      }
    },
    permissionGrantId: reqBody.permissionGrantId,
    target: "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body
  };

  console.log(requestOptions);

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const records = await response.json();
      return Response.json(records);
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log("ERROR", e);
    return Response.json(e);
  }
}
