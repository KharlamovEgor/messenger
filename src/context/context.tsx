"use client";
import { IChat, IMessage, IUser } from "@/interfaces";
import { loadChats, loadMessages, loadUsers } from "@/utils";
import { ReactNode, createContext, useEffect, useState } from "react";

interface IContextData {
  users: IUser[];
  setUsers(users: IUser[]): void;
  chats: IChat[];
  setChats(arg: IChat[] | ((prevState: IChat[]) => IChat[])): void;
  messages: IMessage[];
  setMessages(arg: IMessage[] | ((prevState: IMessage[]) => IMessage[])): void;
  jwt: string;
  setJwt(token: string): void;
  username: string;
  setUsername(username: string): void;
  companionName: string;
  userId: number;
  setUserId(id: number): void;
  chatId: number;
  setChatId(chatId: number): void;
}

export const context = createContext<IContextData>({
  users: [],
  setUsers: (users) => null,
  chats: [],
  setChats: (chats) => null,
  messages: [],
  setMessages: (messages) => null,
  jwt: "",
  setJwt: (token) => null,
  username: "",
  setUsername: (username) => null,
  companionName: "",
  userId: 0,
  setUserId: (id) => null,
  chatId: 0,
  setChatId: (chatId) => null,
});

export function ContextProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [chats, setChats] = useState<IChat[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [jwt, setJwt] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [chatId, setChatId] = useState<number>(0);
  const [companionName, setCompanionName] = useState<string>("");

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedUsername = localStorage.getItem("username");
    const savedJwt = localStorage.getItem("jwt");

    if (savedUserId && savedUsername && savedJwt) {
      setUserId(Number(savedUserId));
      setUsername(savedUsername);
      setJwt(savedJwt);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userId", String(userId));
    localStorage.setItem("username", String(username));
    localStorage.setItem("jwt", String(jwt));
  }, [userId, username, jwt]);

  useEffect(() => {
    async function load() {
      setChats(await loadChats(userId, jwt));
    }

    if (userId) {
      load();
    }
  }, [userId, jwt]);

  useEffect(() => {
    async function load() {
      setUsers(await loadUsers(username, jwt));
    }

    if (username && jwt) {
      load();
    }
  }, [chats, jwt, username]);

  useEffect(() => {
    async function load() {
      setMessages(await loadMessages(chatId, jwt));
    }

    if (chatId && jwt) {
      load();
    }

    if (chatId == 0) {
      setMessages([]);
    }
  }, [chatId, jwt]);

  useEffect(() => {
    if (chatId == 0) {
      return;
    }

    const chat = chats.find((chat) => chat.id == chatId);
    const companionId = chat?.firstUserId == userId ? chat.secondUserId : chat?.firstUserId;
    const companion = users.find((user) => user.id == companionId);
    setCompanionName(companion?.username || "");
  }, [chatId]);

  return (
    <context.Provider
      value={{
        users,
        setUsers,
        chats,
        setChats,
        messages,
        setMessages,
        jwt,
        setJwt,
        username,
        setUsername,
        companionName,
        userId,
        setUserId,
        chatId,
        setChatId,
      }}
    >
      {children}
    </context.Provider>
  );
}
