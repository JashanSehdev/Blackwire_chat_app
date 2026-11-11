import { RoleEnum, StatusEnum } from "@/enum/user.enum";
import z from "zod";

export const editUserSchema = z.object({
    status : z.enum(StatusEnum),
    role : z.enum(RoleEnum)
})

export type EditUserInput = z.infer<typeof editUserSchema> 