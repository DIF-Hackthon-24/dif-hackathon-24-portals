"use client";

import { Input } from "react-chat-elements";
import { useRef, useState } from "react";
// import { sendMessage } from "@/service/MockChatService";
import {
  sendMessage,
  sendVerifyBookingMessage
} from "../../../service/ChatService";
import { Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import {
  sendCheckInMessage,
  sendPreferenceCollectionMessage
} from "../../../service/ChatService";

type ChatFooterComponentProps = {
  threadId: any;
  target: any;
  recipient: any;
  sender: any;
  setRefetch: any;
  setSendKeyMessage: any;
};

export default function ChatFooterComponent(props: ChatFooterComponentProps) {
  // const { keyInfo } = useUser();
  const inputReference = useRef<any>();
  const [sendingCheckIn, setSendingCheckIn] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [sendingPrefs, setSendingPrefs] = useState<boolean>(false);
  const [sendingVerifyBooking, setSendingVerifyBooking] =
    useState<boolean>(false);
  console.log("recipient", props.recipient);
  console.log("target", props.target);

  const clearRef = () => {
    if (inputReference.current) {
      inputReference.current.value = "";
    }
  };

  const addMessage = async () => {
    setSending(true);
    const message = inputReference.current.value;
    console.log("add message recipient", props.recipient);
    await sendMessage(
      props.threadId,
      message,
      props.sender,
      props.target,
      props.recipient
    );
    props.setRefetch();
    setSending(false);
    clearRef();
  };

  const startCheckIn = async () => {
    setSendingCheckIn(true);
    await sendCheckInMessage(
      props.threadId,
      props.sender,
      props.target,
      props.recipient
    );
    props.setRefetch();
    setSendingCheckIn(false);
  };

  const startPrefCollection = async () => {
    setSendingPrefs(true);
    await sendPreferenceCollectionMessage(
      props.threadId,
      props.sender,
      props.target,
      props.recipient
    );
    props.setRefetch();
    setSendingPrefs(false);
  };

  const startVerifyBooking = async () => {
    console.log("Starting verify booking flow");
    setSendingVerifyBooking(true);
    console.log("Fetching the URL");
    try {
      const response = await fetch("/api/bookingIssuance", {
        method: "GET"
      });
      const data = await response.json();
      console.log("Fetched URL data from inside verifyBooking", data);

      await sendVerifyBookingMessage(
        props.threadId,
        props.sender,
        props.target,
        props.recipient,
        data.link
      );
      props.setRefetch();
      setSendingVerifyBooking(false);
      props.setSendKeyMessage(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="italic text-sm font-bold -mb-1">
          Choose from these suggested actions or type a message below
        </div>
        <div className="flex flex-row gap-3 items-center">
          <button
            className="rounded-md bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={startCheckIn}
          >
            {sendingCheckIn ? "Sending..." : "Start check-in process"}
          </button>
          <button
            className="rounded-md bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={startVerifyBooking}
          >
            {sendingVerifyBooking ? "Sending..." : "Verify booking"}
          </button>
          <button
            className="rounded-md bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={startPrefCollection}
          >
            {sendingPrefs ? "Sending..." : "Request additional preferences"}
          </button>
        </div>
        <Input
          className="rounded-xl"
          maxHeight={100}
          placeholder="Type here..."
          multiline={true}
          referance={inputReference}
          onKeyPress={(e) => {
            if (e.shiftKey && e.code === "13") {
              return true;
            }
            if (e.code === "13") {
              clearRef();
              addMessage();
            }
          }}
          rightButtons={
            <button
              className="rounded-md bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              onClick={() => addMessage()}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          }
        />
      </div>
    </div>
  );
}
