import { PaginationResponse } from "../interfaces/pagination-response.interface.js";
import { ApiResponse, SuccessResponse } from "../interfaces/responses.js";

export function paginationResponse<T>(
    data : T[],
    page : number,
    limit : number,
    total : number
  ) : PaginationResponse<T>{
    return {
      success : true,
      data : data,
      meta : {
        total,
        page,
        limit,
        totalPages : Math.ceil(total / limit)
      }
    }
  }

  export function successResponse <T> (message : string, data : T) :SuccessResponse <T> {
    return {
      success : true,
      message,
      data
    }
  }

  export function failedResponse (message : string) : ApiResponse {
    return{
      success : false,
      message
    }
  }