import z from "zod";

export const  profileSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    username : z.string().min(4, 'minimum 4 required')
})

export type ProfileInput = z.infer<typeof profileSchema> 