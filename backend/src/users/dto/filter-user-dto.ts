import { IsEnum, IsOptional } from "class-validator";
import { FilterDto } from "../../common/dto/filter-dto.js";
import { Role } from "../enum/roles.enum.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { Status } from "../enum/status.enum.js";

export class FilterUserDto extends FilterDto {
    @IsOptional()
    @IsEnum(Role)
    role : Role

    @IsOptional()
    @IsEnum(Status)
    status : Status
}