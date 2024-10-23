"use client";
import ChatHeaderComponent from "../components/Chat/ChatHeader/ChatHeaderComponent";
import ChatComponent from "../components/Chat/ChatComponent";
import ChatFooterComponent from "../components/Chat/ChatFooter/ChatFooterComponent";
import { readMessages, readThreads } from "../service/ChatService";
import { useState, useEffect } from "react";
import { serviceProviderKeyInfo } from "../constants";
import { extractAuthor } from "../service/ChatService";
import LoadingIcons from "react-loading-icons";
import PrefTabContent from "../components/Dashboard/PrefTabContent";
import { hotelSearchPreferencesTabAttributes } from "../constants";
import PreferencesCard from "../components/Dashboard/PreferencesCard";

// for now, we assume the SP is always initiating the chat
// so the SP will be author of the chat record, which we can use to set recipient on each message
export default function Dashboard() {
  const [messages, setMessages] = useState<any>(undefined);
  const [recipient, setRecipient] = useState<string>("");
  const [threadTitle, setThreadTitle] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);

  const target = "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW";

  const threadId =
    "bafyreieeynaih3xfxugvnvfvogimafcpab3gmnuazypwr6bgpj7zhtfp4q";

  const hotelKeyInfo = {
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
  };

  useEffect(() => {
    const getMessages = async () => {
      let messageList = await readMessages(threadId, hotelKeyInfo, target);
      console.log("messageList", messageList);
      setMessages(messageList);
      setRefetch(false);
    };

    // Initial fetch
    getMessages();

    // Set up interval for long polling
    const intervalId = setInterval(getMessages, 5000); // Fetch every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [refetch]);

  // get recipient based on thread ID
  useEffect(() => {
    const getThreadInfo = async () => {
      let threadsList = await readThreads(hotelKeyInfo, target);
      console.log("threadsList", threadsList);
      const author = extractAuthor(threadsList[0].authorization);
      console.log("author", author);
      setRecipient(author);

      const threadTitle = threadsList[0].encodedData.title;
      console.log("thread title: ", threadTitle);
      setThreadTitle(threadTitle);
    };
    getThreadInfo();
  }, []);

  if (messages === undefined || recipient === "") {
    console.log("loading");
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div className="flex flex-col gap-1 items-center">
          <LoadingIcons.Oval stroke="#4f81a1" />
          <h1 className="italic">Loading</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 h-screen">
      <div className="text-2xl font-bold mb-6">Guest Dashboard - Alex</div>
      <div className="flex flex-row flex-grow gap-10 max-h-[95%]">
        <div className="bg-gray-200 p-4 flex-grow flex flex-col justify-end rounded-xl max-h-[95%]">
          <ChatHeaderComponent threadTitle={threadTitle} target={target} />
          {messages.length === 0 ? (
            <div className="flex flex-auto align-bottom items-end mb-6 text-[#4f81a1] justify-center">
              No messages yet. Send a message here to start the conversation.
            </div>
          ) : (
            <ChatComponent messages={messages} keyInfo={hotelKeyInfo} />
          )}
          <ChatFooterComponent
            threadId={threadId}
            sender={hotelKeyInfo}
            recipient={recipient}
            target={target}
            setRefetch={setRefetch}
          />
        </div>
        <div className="flex-[1_1_10%]">
          <PreferencesCard />
        </div>
      </div>
    </div>
  );
}
