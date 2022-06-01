import { MessageCardArgs } from "../../types";
import "./styles.css";

const MessageCard = (messageCardArgs: MessageCardArgs) => {
  return (
    <>
      <div
        className={`rgtchat-message-card ${
          messageCardArgs.type === "sent"
            ? "rgtchat-message-sent"
            : "rgtchat-message-received"
        }`}
      >
        <span>{messageCardArgs.messageText}</span>
      </div>
    </>
  );
};

export default MessageCard;
