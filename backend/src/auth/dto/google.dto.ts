import { IsNotEmpty, IsString } from "class-validator";

export class GoogleAuthDto {
    
    @IsString()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    username : string

    @IsString()
    @IsNotEmpty()
    googleId : string
    
}