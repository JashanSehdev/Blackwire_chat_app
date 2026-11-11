import {  IsEnum, IsOptional, IsString } from "class-validator";
import { ORDER, SORT } from "../enum/filter.enum.js";
import { PaginationDto } from "./pagination.dto.js";

export class FilterDto extends PaginationDto{

    @IsOptional()
    @IsString()
    search : string

    @IsOptional()
    @IsEnum(ORDER)
    orderBy : ORDER

    @IsOptional()
    @IsEnum(SORT)
    sortBy : SORT


}