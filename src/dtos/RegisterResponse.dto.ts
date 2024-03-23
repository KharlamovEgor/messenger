import { IUser } from "@/interfaces";

export class RegisterResponseDto {
  public user: IUser;
  public token: string;
}
