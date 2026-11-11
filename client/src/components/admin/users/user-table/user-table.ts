import { RoleEnum, StatusEnum } from "@/enum/user.enum"

export interface BlockUser {
    username: string,
    id: number,
    status : 'active' | 'blocked'
}

export interface EditUserType {
    status : StatusEnum,
    role : RoleEnum
}