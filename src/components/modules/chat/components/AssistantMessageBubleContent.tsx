import { Message } from "@/types/common";
import { type FC } from "react";
import InMessageReferences from "./InMessageReferences";
import MarkdownRenderer from "./MarkdownRenderer";

export type AssistantMessageBubleContentProps = Readonly<{
  message: Message;
}>;
const AssistantMessageBubleContent: FC<AssistantMessageBubleContentProps> = ({
  message,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <MarkdownRenderer>{message.content}</MarkdownRenderer>
      <InMessageReferences message={message} />
    </div>
  );
};

export default AssistantMessageBubleContent;
