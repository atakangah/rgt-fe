import { ChangeEventHandler, MouseEventHandler } from "react";

export type InputTypes = "text" | "checkbox" | "radio";
export type InputArgs = {
  type: InputTypes;
  disabled: boolean;
  placeHolder: string;
  defaultValue?: string;
  onInputChangeHandler?: ChangeEventHandler;
};

export type ButtonArgs = {
  value: string;
  disabled: boolean;
  onClickHandler: MouseEventHandler;
};

export type MessageTypes = "received" | "sent";
export type MessageCardArgs = {
  type: MessageTypes;
  messageText: string;
};

export type User = {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
};

export type OutgoingMessage = {
  recipient: string;
  messageText: string;
};

export type MessageProtocols =
  | "SYS_CALL_ONLINE"
  | "SYS_CALL_HISTORY"
  | "CHAT_MSG";

export type Message = {
  protocol: MessageProtocols;
  sender?: string;
  recipient?: string;
  messageText?: string;
  systemMessage?: any;
};

export type OnlineUsers = {
  [uid: string]: string;
};
