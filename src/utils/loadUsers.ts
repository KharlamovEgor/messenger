import { IUser } from "@/interfaces/User.interface";

export async function loadUsers(user: string, jwt: string): Promise<IUser[]> {
  try {
    const payload = await fetch(process.env.NEXT_PUBLIC_AUTH! + "user/all", {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const users: IUser[] = await payload.json();

    return users.filter(({ username }) => username != user);
  } catch (e) {
    console.error(e);
  }

  return [];
}
