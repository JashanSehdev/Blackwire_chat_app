import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../enum/roles.enum.js";
import { Status } from "../enum/status.enum.js";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username : string

    @IsString()
    @IsNotEmpty()
    email : string

    @IsOptional()
    @IsEnum(Role)
    role : Role
    
    @IsOptional()
    @IsEnum(Status)
    status : Status

}