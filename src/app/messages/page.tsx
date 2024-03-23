"use client";
import { AddChatForm, Chat, ChatsList } from "@/components";
import styles from "./messages.module.css";
import classNames from "classnames";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useStomp } from "@/hooks";
import { context } from "@/context/context";

export default function Messages(): JSX.Element {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const [recipientId, setRecipientId] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const { userId, chatId, setChatId, setChats, setMessages } = useContext(context);
  const stompClient = useStomp();

  useEffect(() => {
    setHeight(document.documentElement.clientHeight);
  }, []);

  const handleClose: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget == event.target) {
      closeForm();
    }
  };

  const toggleChat = () => setIsChatVisible((prevState) => !prevState);

  const closeForm = () => setIsFormVisible(false);

  useEffect(() => {
    stompClient.onConnect = () => {
      stompClient.subscribe(`/user/${userId}/queue/chats`, (message) => {
        setChats((prevState) => {
          return [...prevState, JSON.parse(message.body)];
        });
      });
      stompClient.subscribe(`/user/${chatId}/queue/messages`, (message) => {
        setMessages((prevState) => [...prevState, JSON.parse(message.body)]);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [chatId, userId]);

  return (
    <div
      className={styles.container}
      style={{
        height: height,
      }}
    >
      <ChatsList
        className={styles.chats}
        handleState={setIsFormVisible}
        changeChat={setChatId}
        changeRecipientId={setRecipientId}
        toggleChat={toggleChat}
      />
      <Chat
        className={classNames(styles.chat, {
          [styles.open]: isChatVisible,
        })}
        chatId={chatId}
        recipientId={recipientId}
        stompClient={stompClient}
        toggleChat={toggleChat}
      />
      <AddChatForm
        closeForm={closeForm}
        stompClient={stompClient}
        onClick={handleClose}
        className={classNames(styles.addChatForm, {
          [styles.visible]: isFormVisible,
        })}
      />
    </div>
  );
}
