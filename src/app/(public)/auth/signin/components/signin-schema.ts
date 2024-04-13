import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "โปรดระบุอีเมล" })
    .email("ต้องเป็นอีเมล")
    .min(1, "โปรดระบุอีเมล"),
  password: z
    .string({ required_error: "โปรดระบุรหัสผ่าน" })
    .min(1, "โปรดระบุรหัสผ่าน"),
});
export type SignInSchema = z.infer<typeof signInSchema>;
