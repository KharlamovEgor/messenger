import { Client } from "@stomp/stompjs";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IChatProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  chatId: number;
  recipientId: number;
  stompClient: Client;
  toggleChat: () => void;
}
