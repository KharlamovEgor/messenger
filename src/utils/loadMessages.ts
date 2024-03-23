import { IMessage } from "@/interfaces";

export async function loadMessages(chatId: number, jwt: string): Promise<IMessage[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}messages/${chatId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e);
  }

  return [];
}
