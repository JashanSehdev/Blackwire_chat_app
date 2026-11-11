import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ChatTypeEnum } from "../enum/chat.enum.js";

export class CreateChatDto {
    @IsNumber()
    memberId: number

    @IsEnum(ChatTypeEnum)
    type : ChatTypeEnum

    @IsOptional()
    @IsString()
    profileAvatar : string

    @IsOptional()
    @IsString()
    name : string
}
