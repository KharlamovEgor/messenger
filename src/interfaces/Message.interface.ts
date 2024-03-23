export interface IMessage {
  id: number;
  chatId: number;
  senderId: number;
  recipientId: number;
  content: string;
}
