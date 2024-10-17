import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);
  const protocol = searchParams.get("protocol");
  const action = searchParams.get("action");
  const url = `http://localhost:3001/permissions/grant?protocol=${protocol}&action=${action}`;

  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Type", "application/json");

  // keyInfo hardcoded right now, representing hotel website's keyInfo to sign permission grant GET
  // target is the user's DWN, using hardcoded for now too

  const stringifiedKey = JSON.stringify({
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
  });

  myHeaders.append("X-KeyInfo", stringifiedKey);
  myHeaders.append(
    "X-Target",
    "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW"
  );

  //   const body = JSON.stringify({
  //     protocol: reqBody.protocol,
  //     action: reqBody.action,
  //     keyInfo: {
  //       keyId:
  //         "did:key:z6MkeXmNA9HutZcYei7YsU5jimrMcb7EU43BWTXqLXw59VRq#z6MkeXmNA9HutZcYei7YsU5jimrMcb7EU43BWTXqLXw59VRq",
  //       privateJwk: {
  //         crv: "Ed25519",
  //         d: "64EBJEwSPeYkEZLSgVFWAOBGftgO-JSdgfRZn470DXs",
  //         kty: "OKP",
  //         x: "ASd5wVTGxYk6NWiWtSZIypBkT11mv8r8jpkdTDkyOdA",
  //         kid: "U1e64aXaBM_1T7KkyzLejCbSLaYGE6Lpy0Rxyc3iuNA",
  //         alg: "EdDSA"
  //       }
  //     },
  //     target: "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW"
  //   });

  const requestOptions = {
    method: "GET",
    headers: myHeaders
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const parsedResponse = await response.text();
      console.log("permissions grant GET response: ", parsedResponse);
      return Response.json({ grantId: parsedResponse });
    }
    return Response.json({ message: "Not found" });
  } catch (e) {
    console.log("ERROR", e);
    return Response.json(e);
  }
}
