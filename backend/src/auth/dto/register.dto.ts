import { IsOptional, IsString } from "class-validator"

export class RegisterUserDto {
    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    email : string

    @IsOptional()
    @IsString()
    password : string
}
