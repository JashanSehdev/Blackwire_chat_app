import z from "zod";

export const groupSchema = z.object({
  name: z.string().min(3, 'group name sould be at leat 3 characters'),
  profileAvatar: z.string().optional(),
  members: z
    .array(
      z.object({
        id: z.number(),
      }),
    )
    .min(1, "Select at least one member"),
});

export type GroupInput = z.infer<typeof groupSchema>;
