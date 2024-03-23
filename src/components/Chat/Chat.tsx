"use client";
import { FormEventHandler, useContext, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import classNames from "classnames";
import { IChatProps } from "./Chat.props";
import { context } from "@/context/context";
import { Button, ChatInfo, Message } from "..";

export function Chat({
  className,
  stompClient,
  toggleChat,
  chatId,
  recipientId,
  ...props
}: IChatProps): JSX.Element {
  const { userId, messages } = useContext(context);
  const [message, setMessage] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (ref.current?.lastChild as HTMLDivElement)?.scrollIntoView(true);
  }, [messages]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (message.trim() == "") {
      return;
    }

    stompClient.publish({
      destination: "/app/messages",
      body: JSON.stringify({
        content: message,
        senderId: userId,
        recipientId: recipientId,
      }),
    });
    setMessage("");
  };

  return (
    <div className={classNames(className, styles.container)} {...props}>
      <ChatInfo
        toggleChat={toggleChat}
        className={classNames({
          [styles.invisible]: chatId == 0,
        })}
      />
      <div className={styles.scroll}>
        <div className={styles.messages} ref={ref}>
          {messages.map((message) => (
            <Message
              key={message.id}
              className={classNames(styles.message, {
                [styles.leftMessage]: userId != message.senderId,
              })}
            >
              {message.content}
            </Message>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={classNames(styles.form, { [styles.invisible]: chatId == 0 })}
      >
        <input
          type="text"
          value={message}
          placeholder="message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button mini>{">"}</Button>
      </form>
    </div>
  );
}
