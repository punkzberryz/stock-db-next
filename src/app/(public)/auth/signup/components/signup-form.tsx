"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "./signup-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { signUpWithEmailAndPasswordAction } from "@/action/auth/auth-action";
import { SignUpErrorResponse } from "@/action/auth/error-response";
import { useState } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
  });
  const onFormSubmit = async (data: SignUpSchema) => {
    if (data.confirmPassword !== data.password) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      return;
    }
    try {
      setIsLoading(true);
      const { session, user, error } = await signUpWithEmailAndPasswordAction(
        data
      );
      if (error) {
        throw new Error(error.message);
      }
      if (!user || !session) {
        throw new Error("user or session not found");
      }
      toast.success("สมัครสมาชิกสำเร็จ");
      router.push("/");
    } catch (err) {
      console.log("error in signup form", err);
      return catchSignUpError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 w-full max-w-sm mx-auto"
        onSubmit={form.handleSubmit(onFormSubmit, onFormSubmitError)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input
                  placeholder="papai@example.com"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel>ชื่อแดสง</FormLabel>
              <FormControl>
                <Input disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel>รหัสผ่าน</FormLabel>
              <FormControl>
                <Input type="password" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
              <FormControl>
                <Input type="password" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full">
          สมัครสมาชิก
        </Button>
      </form>
    </Form>
  );
};
const onFormSubmitError = (error: FieldErrors<SignUpSchema>) => {};
export default SignUpForm;

const catchSignUpError = (err: unknown) => {
  if (err instanceof Error) {
    if (err.message === SignUpErrorResponse.emailAlreadyExists) {
      toast.error("อีเมลนี้มีผู้ใช้งานแล้ว");
      return;
    }
  }
  toast.error("เกิดข้อผิดพลาด");
};
