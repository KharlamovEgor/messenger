import { IUser } from "@/interfaces";

export class LoginResponseDto {
  public user: IUser;
  public token: string;
}
