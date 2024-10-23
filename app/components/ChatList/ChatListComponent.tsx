"use client";
import "react-chat-elements/dist/main.css";
import { extractAuthor } from "../../service/ChatService";
import { ChatList } from "react-chat-elements";
import LoadingIcons from "react-loading-icons";

type ChatListComponentProps = {
  threads: any;
  recipient: any;
  openChat: any;
};

export default function ChatListComponent(props: ChatListComponentProps) {
  console.log("threads: ", props.threads);

  //   if (threads.length == 0 || threads == undefined) {
  //     return (
  //       <div className="flex w-full h-full items-center justify-center">
  //         <div className="flex flex-col gap-1 items-center">
  //           <LoadingIcons.Oval stroke="#4f81a1" />
  //           <h1 className="italic">Loading</h1>
  //         </div>
  //       </div>
  //     );
  //   }

  let chatListSource: any = [];
  props.threads.forEach((thread: any) => {
    const author = extractAuthor(thread.recordsWriteMessage.authorization);
    let rec = "";
    if (props.recipient) {
      rec = props.recipient;
    } else {
      rec = author;
    }
    chatListSource.push({
      id: thread.recordsWriteMessage.contextId,
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      title: "Chat with " + rec,
      subtitle: JSON.parse(thread.data).title,
      date: new Date(thread.recordsWriteMessage.descriptor.messageTimestamp)
    });
  });

  console.log(chatListSource);

  return (
    <ChatList
      id="chat"
      lazyLoadingImage="null"
      className="rounded-md"
      dataSource={chatListSource}
      onClick={props.openChat}
    />
  );
}
