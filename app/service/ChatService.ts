import { PROTOCOL_DEFINITION } from "./UserService";
import axios from "axios";

const PROTOCOL = PROTOCOL_DEFINITION.protocol;

const DWN_CLIENT_API = "http://localhost:3001";

export const readThreads = async (keyInfo: any, target: any) => {
  console.log(DWN_CLIENT_API + "/records/query");
  console.log(target);
  try {
    let response = await axios.post(DWN_CLIENT_API + "/records/query", {
      protocol: PROTOCOL,
      protocolPath: "thread",
      keyInfo: keyInfo,
      target: target
    });

    console.log(JSON.stringify(response));

    return await response.data;
  } catch (e) {
    return [];
  }
};

export const readMessages = async (
  threadId: any,
  keyInfo: any,
  target: any
) => {
  console.log(DWN_CLIENT_API + "/records/query");

  try {
    let response = await axios.post(DWN_CLIENT_API + "/records/query", {
      protocol: PROTOCOL,
      protocolPath: "thread/message",
      parentId: threadId,
      keyInfo: keyInfo,
      target: target
    });

    console.log("messages: ", response);

    return await response.data.map((message: any) => {
      message.author = extractAuthor(message.authorization);
      return message;
    });
  } catch (e) {
    return [];
  }
};

export const extractAuthor = (auth: any) => {
  let protectedRaw = auth.signature.signatures[0].protected;
  let protectedString = atob(protectedRaw);
  let protectedDecoded = JSON.parse(protectedString);
  let keyId = protectedDecoded.kid;
  console.log(keyId.split("#")[0]);
  return keyId.split("#")[0];
};

export const createThread = async (data: any, keyInfo: any, target: any) => {
  let responseThread = await axios.post(
    process.env.NEXT_PUBLIC_TRANSLATOR_API + "/records/create",
    {
      protocol: PROTOCOL,
      writes: [
        {
          protocolPath: "thread",
          data: data,
          schema: "thread",
          dataFormat: "application/json"
        }
      ],
      keyInfo: keyInfo,
      target: decodeURIComponent(target)
    }
  );
  //to-do check if successful
  console.log(responseThread.data);
  //   threadId = await responseThread.data.records.successful[0].contextId; //need to pull out the context id

  //   return threadId;
};

export const sendMessage = async (
  threadId: any,
  message: any,
  keyInfo: any,
  target: any,
  recipient: any
) => {
  console.log("in send message");

  let response = await axios.post(DWN_CLIENT_API + "/records/create", {
    protocol: PROTOCOL,
    protocolPath: "thread/message",
    data: message,
    dataFormat: "application/json",
    recipient: recipient,
    parentContextId: threadId,
    keyInfo: keyInfo,
    target: target
  });

  console.log(response.data);

  return await response.data;
};

export const sendCheckInMessage = async (
  threadId: any,
  keyInfo: any,
  target: any,
  recipient: any
) => {
  console.log("in sendCheckIn message");

  const toSend =
    '{"title":"It\'s time to check-in! Click the button below to begin the check-in process.","action":"Start check-in"}';

  let response = await axios.post(DWN_CLIENT_API + "/records/create", {
    protocol: PROTOCOL,
    protocolPath: "thread/message",
    dataFormat: "application/json",
    data: toSend,
    recipient: recipient,
    parentContextId: threadId,
    keyInfo: keyInfo,
    target: target
  });

  console.log(response.data);

  return await response.data;
};
