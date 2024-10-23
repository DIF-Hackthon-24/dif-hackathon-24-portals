import axios from "axios";

export const register = async () => {
  const response = await axios.get(
    process.env.PUBLIC_NEXT_TRANSLATOR_API + "/keys/ed25519"
  );
  const keyInfo = response.data[0];
  keyInfo["kms"] = "Local";

  return keyInfo;
};

export const protocolConfigure = (keyInfo: any) => {
  const response = axios.post(
    process.env.PUBLIC_NEXT_TRANSLATOR_API + "/protocols/configure",
    {
      definition: PROTOCOL_DEFINITION,
      keyInfo: keyInfo,
      target: keyInfo.keyId
    }
  );
};

export const PROTOCOL_DEFINITION = {
  protocol: "http://chat-protocol.xyz",
  published: true,
  types: {
    thread: {
      schema: "thread",
      dataFormats: ["application/json"]
    },
    message: {
      schema: "message",
      dataFormats: ["application/json"]
    }
  },
  structure: {
    thread: {
      $actions: [
        {
          who: "anyone",
          can: ["create", "update"]
        },
        {
          who: "author",
          of: "thread",
          can: ["read"]
        },
        {
          who: "recipient",
          of: "thread",
          can: ["read"]
        }
      ],
      message: {
        $actions: [
          {
            who: "anyone",
            can: ["create", "update"]
          },
          {
            who: "author",
            of: "thread/message",
            can: ["read"]
          },
          {
            who: "recipient",
            of: "thread/message",
            can: ["read"]
          }
        ]
      }
    }
  }
};

const keyInfo = {
  kms: "Local",
  keyId:
    "did:key:z6MkjEECqa3isYqQMNYPxr2wLiLqkqboHRb1m84zi2sptUgK#z6MkjEECqa3isYqQMNYPxr2wLiLqkqboHRb1m84zi2sptUgK",
  privateJwk: {
    crv: "Ed25519",
    d: "ryLeossjOwU5VkoEpqeURzWDafUDYKpMIBSuBUBa_5M",
    kty: "OKP",
    x: "RvPNj8geptIu8Muh_jqIa-O4K0oewJFoMT7Rfrld2Jw",
    kid: "tw87PSw94Yr7NYX1Sua01IXa7wdIHxbgu9lwflfQDN4",
    alg: "EdDSA"
  }
};

const keyInfoA = {
  kms: "Local",
  keyId:
    "did:key:z6MkjQhTJqKF5WfoYQvXyqR83zezXXpxbjjFAf1A16QGTwTB#z6MkjQhTJqKF5WfoYQvXyqR83zezXXpxbjjFAf1A16QGTwTB",
  privateJwk: {
    crv: "Ed25519",
    d: "vuMUGDMjllUFMmC_Hd_npFuGn2-EPL8C1Gxh2wyCYj0",
    kty: "OKP",
    x: "SaJsEmBqWio_4A6GwjFz0AmTGUc8P8XKALd83xaI8SY",
    kid: "m4_xz0HOfZ2i1MKm6QPVm04kGtc6nmvc3W-Y0AM2okQ",
    alg: "EdDSA"
  }
};

const keyInfoB = {
  kms: "Local",
  keyId:
    "did:key:z6MksbG8oykVygKSmqd1s862ESF787sVZVA9bCfsruF65Dtu#z6MksbG8oykVygKSmqd1s862ESF787sVZVA9bCfsruF65Dtu",
  privateJwk: {
    crv: "Ed25519",
    d: "BDQMK-0hBWbOq-nLycOldQtxFh425GFOUZDS2bfnlHw",
    kty: "OKP",
    x: "wzStow98EQCMmYV4xNFkiRmj76uJBkVOUx6d3jOUU6I",
    kid: "_eIE32ChrwcSFtU2z0yuVsnDiJLpR_2ALo1zcnjkRJ4",
    alg: "EdDSA"
  }
};
