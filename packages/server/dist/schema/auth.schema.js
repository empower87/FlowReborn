import { object, string } from 'zod';
export const LoginSchema = object({
    username: string().trim().min(5),
    password: string(),
});
export const RegisterSchema = object({
    username: string().trim().min(5),
    email: string().email(),
    password: string().min(6),
});
//# sourceMappingURL=auth.schema.js.map