"use client";
import classNames from "classnames";
import { IChatInfoProps } from "./ChatInfo.props";
import styles from "./ChatInfo.module.css";
import { useContext } from "react";
import { context } from "@/context/context";

export function ChatInfo({ className, toggleChat, ...props }: IChatInfoProps) {
  const { companionName, setChatId } = useContext(context);
  return (
    <div className={classNames(className, styles.chatInfo)} {...props}>
      {companionName}
      <button
        onClick={() => {
          toggleChat();
          setChatId(0);
        }}
      >
        X
      </button>
    </div>
  );
}
