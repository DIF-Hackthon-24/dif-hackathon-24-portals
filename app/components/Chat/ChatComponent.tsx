import { FunctionComponent } from "react";
import { MessageList, MessageType } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

type ChatComponentProps = {
  messages: any;
  keyInfo: any;
};

export default function ChatComponent(props: ChatComponentProps) {
  console.log("messages", props.messages);

  // let chatSource: any[] = [];
  // props.messages.forEach((msg: any) => {
  //   let formattedMsg: MessageType;
  //   // we need an action button in the message
  //   console.log(msg.encodedData.action);
  //   if (msg.encodedData.action) {
  //     formattedMsg = {
  //       position:
  //         msg.author == props.keyInfo.keyId.split("#")[0] ? "right" : "left",
  //       type: "meetingLink",
  //       title: msg.author,
  //       text: `${(<div>msg.encodedData.title</div>)}`
  //     };
  //   } else {
  //     formattedMsg = {
  //       position:
  //         msg.author == props.keyInfo.keyId.split("#")[0] ? "right" : "left",
  //       type: "text",
  //       title: msg.author,
  //       text: msg.encodedData.title
  //     };
  //   }
  //   chatSource.push(formattedMsg);
  // });

  return (
    <>
      <div className="flex-auto overflow-y-scroll mb-6">
        <MessageList
          referance={null}
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={props.messages.map((message) =>
            message.encodedData.action
              ? {
                  position:
                    message.author == props.keyInfo.keyId.split("#")[0]
                      ? "right"
                      : "left",
                  type: "text",
                  title: message.author,
                  text: (
                    <div className="grid flex-col justify-items-start">
                      <div>{message.encodedData.title}</div>
                      <button className="rounded-md mt-2 bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
                        {message.encodedData.action}
                      </button>
                    </div>
                  )
                }
              : {
                  position:
                    message.author == props.keyInfo.keyId.split("#")[0]
                      ? "right"
                      : "left",
                  type: "text",
                  title: message.author,
                  text: message.encodedData.title
                }
          )}
        />
      </div>
    </>
  );
}
