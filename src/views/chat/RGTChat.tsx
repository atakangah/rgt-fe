import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import MessageCard from "../../components/message-card/MessageCard";
import { OutgoingMessage, Message } from "../../types";
import "./styles.css";

const RGTChat = () => {
  const WS_URL = "wss://rgtchat-be.herokuapp.com:4000";

  const { user, logout } = useAuth0();
  const [onlineUsers, setOnlineUsers] = useState([] as string[]);
  const [selectedOnlineUser, setSelectedOnlineUser] = useState("" as string);
  const [message, setMessage] = useState("" as string);
  const [chatMessages, setChatMessages] = useState([] as Message[]);
  const [textBoxDefaultValue, setTextBoxDefaultValue] = useState("" as string);
  const [webSocket, setWebSocket] = useState({} as WebSocket);

  useEffect(() => {
    setWebSocket(new WebSocket(`${WS_URL}?user=${user?.email}`));
    setupWebsocket();
    return () => {
      webSocket.onclose = () => {
        setWebSocket(new WebSocket(`${WS_URL}?user=${user?.email}`));
      };
    };
  }, [webSocket.onmessage, webSocket.onopen, webSocket.onclose]);

  const setupWebsocket = () => {
    webSocket.onmessage = (event: MessageEvent) => handleMessage(event);
    webSocket.onerror = (error) => console.error(error);
  };

  const handleMessage = (event: MessageEvent) => {
    const receivedMessage: Message = JSON.parse(event.data);
    console.log(receivedMessage);

    if (receivedMessage.protocol === "SYS_CALL_HISTORY") {
      setupChatHistory(receivedMessage.systemMessage);
    }

    if (receivedMessage.protocol === "SYS_CALL_ONLINE") {
      const allOnlineUsers: string[] = receivedMessage.systemMessage;
      setOnlineUsers(
        allOnlineUsers.filter((onlineUser) => onlineUser !== user?.email)
      );
    }

    if (receivedMessage.protocol === "CHAT_MSG") {
      updateChatMessages(receivedMessage);
    }
  };

  const sendMessage = (message: OutgoingMessage) => {
    const messagePayload: Message = {
      protocol: "CHAT_MSG",
      sender: user?.email,
      recipient: message.recipient,
      messageText: message.messageText,
    };

    webSocket.send(JSON.stringify(messagePayload));
    updateChatMessages(messagePayload);
  };

  const updateChatMessages = (newMessage: Message) => {
    setChatMessages((previousMessages) => [...previousMessages, newMessage]);
  };

  const setupChatHistory = (chatHistory: Message[]) => {
    setChatMessages(() => chatHistory);
  };

  const onClickSend = () => {
    if (selectedOnlineUser === "") {
      return alert("No user selected to chat");
    }

    sendMessage({
      messageText: message,
      recipient: selectedOnlineUser,
    });
    emptyTextBox();
  };

  const onClickLogout = () => {
    logout({ returnTo: "localhost:3000" });
  };

  const onOnlineUserSelected = (user: string) => {
    setSelectedOnlineUser(user);
    getChatHistoryWithSelectedUser(user);
  };

  const getChatHistoryWithSelectedUser = (selectedUser: string) => {
    const historyPayload: Message = {
      protocol: "SYS_CALL_HISTORY",
      sender: user?.email,
      recipient: selectedUser,
    };
    webSocket.send(JSON.stringify(historyPayload));
  };

  const emptyTextBox = () => {
    const inputBox: any = document.getElementsByTagName("input")[0];
    inputBox.value = "";
  };

  const onInputChange = (event: ChangeEvent) => {
    const eventTargetElement: any = event.target;
    setMessage(eventTargetElement.value);
  };

  return (
    <>
      <div className="rgtchat">
        <div className="rgtchat-users-online">
          <Button
            onClickHandler={onClickLogout}
            value={"Logout"}
            disabled={false}
          />
          <span className="user-profile">{user?.email}</span>
          <h3>Other Users Online</h3>
          <ul>
            {onlineUsers.map((user: string, index: number) => (
              <li key={index} onClick={() => onOnlineUserSelected(user)}>
                {user}
              </li>
            ))}
          </ul>
        </div>
        <div className="rgtchat-chat-window">
          <div className="rgtchat-messages-box">
            {chatMessages.map((message: Message, index: number) => {
              if (message.protocol !== "CHAT_MSG") {
                return null;
              }
              if (selectedOnlineUser.length === 0) {
                return null;
              }
              if (
                ![message.sender, message.recipient].includes(
                  selectedOnlineUser
                ) &&
                ![message.sender, message.recipient].includes(user?.email)
              ) {
                return null;
              }
              return (
                <MessageCard
                  key={index}
                  type={`${
                    message?.sender === user?.email ? "sent" : "received"
                  }`}
                  messageText={message.messageText as string}
                />
              );
            })}
          </div>
          <div className="rgtchat-input-area">
            <Input
              type="text"
              placeHolder="Type a message"
              disabled={false}
              onInputChangeHandler={onInputChange}
              defaultValue={textBoxDefaultValue}
            />
            <Button
              value="Send"
              disabled={false}
              onClickHandler={onClickSend}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RGTChat;
