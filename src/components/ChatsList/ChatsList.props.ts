import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IChatsListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  handleState: (value: boolean) => void;
  changeChat: (chatId: number) => void;
  changeRecipientId: (recipientId: number) => void;
  toggleChat: () => void;
}
