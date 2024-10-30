type ChatHeaderComponentProps = {
  threadTitle: string;
  target: any;
};

export default function ChatHeaderComponent(props: ChatHeaderComponentProps) {
  return (
    <>
      <h1 className="text-xl mb-2 italic">{props.threadTitle}</h1>
      {/* <h3 className="text-base italic mb-4">{props.target}</h3> */}
    </>
  );
}
