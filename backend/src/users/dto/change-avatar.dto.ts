import { IsString } from "class-validator";

export class ChangeAvatarDto{
    
    @IsString()
    avatar : string
}