import { RoleEnum, StatusEnum } from "@/enum/user.enum";

export type User = {
    id : string;
    username : string;
    email : string;
    role : string
    createAt : string;
    updatedAt : string;  
    avatar : string | null
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: RoleEnum;
  status: StatusEnum;
  createdAt: string;
  avatar ?: string
}
