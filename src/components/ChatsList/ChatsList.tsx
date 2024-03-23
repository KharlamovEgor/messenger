"use client";
import classNames from "classnames";
import styles from "./ChatsList.module.css";
import { ChangeEvent, useContext, useEffect, useState, useTransition } from "react";
import { AddButton, ChatTile, Search } from "..";
import { context } from "@/context/context";
import { IChat } from "@/interfaces";
import { findUserByIds, sortChats } from "@/utils";
import { IChatsListProps } from "./ChatsList.props";

export function ChatsList({
  className,
  handleState,
  changeChat,
  changeRecipientId,
  toggleChat,
  ...props
}: IChatsListProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleChats, setVisibleChats] = useState<IChat[]>([]);
  const { users, chats } = useContext(context);

  useEffect(() => {
    setVisibleChats(chats);
  }, [chats]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
    setVisibleChats(sortChats(event.target.value, chats, users));
  };

  return (
    <aside className={classNames(className, styles.container)} {...props}>
      <h2 className={styles.logo}>
        Notify <span>People</span>
      </h2>
      <Search value={searchQuery} onChange={changeHandler} />
      {(searchQuery ? visibleChats : chats).map(({ id: chatId, firstUserId, secondUserId }) => {
        const recipent = findUserByIds(users, firstUserId, secondUserId);

        if (!recipent) {
          return;
        }

        return (
          <ChatTile
            key={chatId}
            lastMessage=""
            recipientName={recipent.username}
            onClick={() => {
              changeChat(chatId);
              changeRecipientId(recipent.id);
              toggleChat();
            }}
          />
        );
      })}
      <AddButton className={styles.addButton} onClick={() => handleState(true)} />
    </aside>
  );
}
