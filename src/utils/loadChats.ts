import { GetChatsDto } from "@/dtos/GetChats.dto";
import { IChat } from "@/interfaces/Chat.interface";

export async function loadChats(userId: number, jwt: string): Promise<IChat[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API + "chat/all/" + userId, {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data: GetChatsDto = await response.json();

    return data.chats;
  } catch (e) {
    console.error(e);
  }
  return [];
}
