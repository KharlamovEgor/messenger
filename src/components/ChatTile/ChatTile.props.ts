import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IChatTileProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  recipientName: string;
  lastMessage: string;
}
