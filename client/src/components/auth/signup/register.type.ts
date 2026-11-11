import z from "zod";
import {
  FieldPath,
} from "react-hook-form";

export const registerSchema = z.object({
  username: z.string()
              .trim()
              .min(3, 'Username must be at least 3 character long')
              .max(20, 'username must be atmost 20 characters')
              .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Username must start with a letter and contain only letters, numbers, and underscores'),
  email: z.email(),
  password: z.string().min(6, 'Password must be least of 6 characters').max(12, 'Password must be atmost 12 characters'),
  confirmPassword: z.string().min(6, 'Password must be least of 6 characters').max(12, 'Password must be atmost 12 characters'),
})
.refine((val) => val.password === val.confirmPassword, {
    message : 'password should be same',
    path: ["confirmPassword"]
})

export type RegisterInput = z.infer<typeof registerSchema>;

export type InputFields = {
//   register: UseFormRegister<LoginInput>;
  name: FieldPath<RegisterInput>;
  label: string;
  type : 'text' | 'number' | 'password' | 'email',
//   error: FieldErrors<LoginInput>;
  placeholder: string;
};
