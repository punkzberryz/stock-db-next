import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string({ required_error: "โปรดระบุอีเมล" })
    .email("ต้องเป็นอีเมล")
    .min(1, "โปรดระบุอีเมล"),
  password: z
    .string({ required_error: "โปรดระบุรหัสผ่าน" })
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  confirmPassword: z.string().optional(),
  displayName: z
    .string({ required_error: "โปรดระบุชื่อแสดง" })
    .min(1, "โปรดระบุชื่อแสดง")
    .max(50, "ชื่อแสดงต้องมีไม่เกิน 50 ตัวอักษร"),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;
