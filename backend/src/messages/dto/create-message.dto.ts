import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    text : string

}
