import { NextRequest } from "next/server";
import QRCode from "qrcode";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  console.log(reqBody);
  const url = `http://188.245.52.145:80/permissions/request`;

  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Type", "application/json");

  // keyInfo hardcoded right now, representing hotel website's keyInfo to sign permission request
  // target is the user's DWN, using hardcoded for now too
  const body = JSON.stringify({
    protocol: reqBody.protocol,
    action: reqBody.action,
    keyInfo: reqBody.keyInfo,
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
      const permissionDetails = await response.text();
      console.log("permissionDetails", permissionDetails);
      const qrCode = await QRCode.toDataURL(permissionDetails);
      return Response.json({ qrCode, permissionDetails });
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log("ERROR", e);
    return Response.json(e);
  }
}

// export async function GET(id: string) {
//   // id
//   const url = `http://localhost:3001/permissions/request/${id}`;

//   // keyInfo hardcoded right now, representing hotel website's keyInfo to sign permission request
//   // target is the user's DWN, using hardcoded for now too
//   const body = JSON.stringify({
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

//   const requestOptions = {
//     method: "GET",
//     body: body
//   };

//   const response = await fetch(url, requestOptions);

//   if (response.ok) {
//     const responseText = await response.text();
//     const qrCode = await QRCode.toDataURL(responseText);
//     return Response.json({ qrCode, stateId });
//   }
// }
