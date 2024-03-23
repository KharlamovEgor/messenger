"use client";
import { IAddChatFormProps } from "./AddChatForm.props";
import styles from "./AddChatForm.module.css";
import classNames from "classnames";
import { useContext } from "react";
import { context } from "@/context/context";
import { useForm } from "react-hook-form";
import { Button } from "..";

export function AddChatForm({
  className,
  stompClient,
  closeForm,
  ...props
}: IAddChatFormProps): JSX.Element {
  const { userId, users } = useContext(context);
  const { register, reset, handleSubmit } = useForm<{ recipientName: string }>();

  const addChat = handleSubmit(async ({ recipientName }) => {
    const recipient = users.find(({ username }) => username == recipientName);

    if (!recipient) {
      return;
    }

    stompClient.publish({
      destination: "/app/chats",
      body: JSON.stringify({
        firstUserId: userId,
        secondUserId: recipient.id,
      }),
    });

    reset();
    closeForm();
  });

  return (
    <div className={classNames(className, styles.container)} {...props}>
      <form className={styles.form} onSubmit={addChat}>
        <input
          placeholder="username"
          list="users"
          className={styles.input}
          {...register("recipientName")}
        />
        <datalist id="users">
          {users.map(({ id, username }) => (
            <option key={id} value={username} />
          ))}
        </datalist>
        <Button type="submit" mini={true}>
          Add
        </Button>
      </form>
    </div>
  );
}
