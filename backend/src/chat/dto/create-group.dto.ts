import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString } from "class-validator";


export class CreateGroupDto {

    @IsString()
    name : string

    @IsOptional()
    @IsString()
    profileAvatar : string

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({each : true})
    @ArrayMaxSize(5)
    memberId: [];

}