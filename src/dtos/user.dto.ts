import { z } from 'zod';


export const CreateUserSchema = z.object({
name: z.string().min(2),
email: z.string().email(),
age: z.number().int().positive().optional()
});


export type CreateUserDTO = z.infer<typeof CreateUserSchema>;


export const UpdateUserSchema = CreateUserSchema.partial();
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;


export const UserResponseSchema = z.object({
id: z.string(),
name: z.string(),
email: z.string(),
age: z.number().int().nullable()
});
export type UserResponseDTO = z.infer<typeof UserResponseSchema>;