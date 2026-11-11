import { IsEnum, IsOptional } from "class-validator";
import { FilterDto } from "../../common/dto/filter-dto.js";
import { SORT } from "../enum/filter.enum.js";

export class FilterChatDto extends FilterDto {
    
    @IsOptional()
    @IsEnum(SORT)
    sort : SORT
}