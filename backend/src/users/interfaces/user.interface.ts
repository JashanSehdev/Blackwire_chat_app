import { Role } from "../enum/roles.enum.js"


export interface UserProfile {
    username : string
    email : string
}

export interface CreateUserInput extends UserProfile {
    password : string,
    role ?: Role
}
export interface User extends UserProfile {
    id : number,
    password: string,
    role : Role
}


export interface UserResponse extends UserProfile {
  id: number;
  role: Role;
}


