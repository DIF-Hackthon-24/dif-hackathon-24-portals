import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  console.log(reqBody);
  const url = `http://188.245.52.145:80/dwn/records/read`;

  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Type", "application/json");

  // keyInfo hardcoded right now, representing hotel website's keyInfo to sign permission request
  // target is the user's DWN, using hardcoded for now too
  const body = JSON.stringify({
    protocol: reqBody.protocol,
    protocolPaths: reqBody.protocolPaths,
    keyInfo: reqBody.keyInfo,
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
