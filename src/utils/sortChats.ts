import { IChat, IUser } from "@/interfaces";

export const sortChats = (
  searchQuery: string,
  chatsList: IChat[],
  usersList: IUser[]
): IChat[] => {
  const userIds = new Set(
    usersList
      .filter(({ username }) =>
        username.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      .map(({ id }) => id)
  );
  return chatsList.filter(
    ({ firstUserId, secondUserId }) =>
      userIds.has(firstUserId) || userIds.has(secondUserId)
  );
};
