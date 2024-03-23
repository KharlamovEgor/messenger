import { Client } from "@stomp/stompjs";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IAddChatFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  stompClient: Client;
  closeForm(): void;
}
