import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IChatInfoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  toggleChat: () => void;
}
