import QRCode from "qrcode";

export async function POST() {
  const data = {
    issuerKey: {
      type: "jwk",
      jwk: {
        kty: "OKP",
        d: "mDhpwaH6JYSrD2Bq7Cs-pzmsjlLj4EOhxyI-9DM1mFI",
        crv: "Ed25519",
        kid: "Vzx7l5fh56F3Pf9aR3DECU5BwfrY6ZJe05aiWYWzan8",
        x: "T3T4-u1Xz3vAV2JwPNxWfs4pik_JLiArz_WTCvrCFUM",
      },
    },
    credentialConfigurationId: "UniversityDegree_jwt_vc_json",
    credentialData: {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1",
      ],
      id: "http://example.gov/credentials/3732",
      type: ["VerifiableCredential", "UniversityDegreeCredential"],
      issuer: {
        id: "did:web:vc.transmute.world",
      },
      issuanceDate: "2020-03-10T04:24:12.164Z",
      credentialSubject: {
        id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
        degree: {
          type: "BachelorDegree",
          name: "Bachelor of Science and Arts",
        },
      },
    },
    mapping: {
      id: "<uuid>",
      issuer: {
        id: "<issuerDid>",
      },
      credentialSubject: {
        id: "<subjectDid>",
      },
      issuanceDate: "<timestamp>",
      expirationDate: "<timestamp-in:365d>",
    },
    authenticationMethod: "PRE_AUTHORIZED",
    issuerDid: "did:key:z6MkjoRhq1jSNJdLiruSXrFFxagqrztZaXHqHGUTKJbcNywp",
  };

  const response = await fetch("https://issuer.portal.walt.id/openid4vc/jwt/issue", {
    method: "POST",
    headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data),
  })

  if(response.ok) {
    const responseText = await response.text()
    const qrCode = await QRCode.toDataURL(responseText);
    return Response.json({ qrCode })
  }
}
