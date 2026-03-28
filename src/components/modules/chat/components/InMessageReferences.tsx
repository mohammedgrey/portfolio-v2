import { Message } from "@/types/common";
import { type FC } from "react";
import useAssistantResponseReferences from "../hooks/useAssistantResponseReferences";
import InMessageContactInfo from "./InMessageContactInfo";
import InMessageProjectReferences from "./InMessageProjectReferences";
import InMessageTechReferences from "./InMessageTechReferences";

export type InMessageReferencesProps = Readonly<{
  message: Message;
}>;

const InMessageReferences: FC<InMessageReferencesProps> = ({ message }) => {
  const {
    noReferences,
    thereIsContactInfoReference,
    thereAreProjectReferences,
    thereAreTechReferences,
    projectReferences,
    techReferences,
  } = useAssistantResponseReferences({ content: message.content });

  if (noReferences) return null;

  return (
    <>
      {thereIsContactInfoReference && <InMessageContactInfo />}

      {thereAreTechReferences && (
        <InMessageTechReferences references={techReferences} />
      )}

      {thereAreProjectReferences && (
        <InMessageProjectReferences references={projectReferences} />
      )}
    </>
  );
};

export default InMessageReferences;
