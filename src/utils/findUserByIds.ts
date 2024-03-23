import { IUser } from "@/interfaces";

export function findUserByIds(
  usersList: IUser[],
  firstUserId: number,
  secondUserId: number
): IUser | null {
  return usersList.find(
    ({ id: recipientId }) =>
      recipientId == firstUserId || recipientId == secondUserId
  )!;
}
