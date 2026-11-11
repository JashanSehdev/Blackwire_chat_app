import { IsNumberString, IsOptional, IsString } from "class-validator";


export class FindUserDto {

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
