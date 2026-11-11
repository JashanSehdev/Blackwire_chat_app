import z from "zod";


export const filterSchema = z.object({
    search : z.string().optional(),
    sortBy : z.string().optional(),
    orderBy: z.string().optional(),
    role : z.string().optional(),
    status: z.string().optional()
})

export type FilterInput = z.infer<typeof filterSchema>