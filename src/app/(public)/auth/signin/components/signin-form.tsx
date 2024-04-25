"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { signInSchema, SignInSchema } from "./signin-schema";
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
// import { signInSchema, SignInSchema } from "./signin-schema";
import { SignInErrorResponse } from "@/action/auth/error-response";
import { signInWithEmailAndPassword } from "@/action/auth/auth-action";
import { catchErrorFromServerActionOnClientHelper } from "@/lib/error";

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onFormSubmit = async (data: SignInSchema) => {
    try {
      setIsLoading(true);
      const { error } = await signInWithEmailAndPassword(data);
      if (error) {
        throw new Error(error.message);
      }
      toast.success("เข้าสู่ระบบสำเร็จ");
      router.push("/");
    } catch (err) {
      catchSignInError(err);
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
        <Button disabled={isLoading} className="w-full">
          เข้าสู่ระบบ
        </Button>
      </form>
    </Form>
  );
};
const onFormSubmitError = (error: FieldErrors<SignInSchema>) => {};
export default SignInForm;
const catchSignInError = (err: unknown) => {
  if (err instanceof Error) {
    if (err.message === SignInErrorResponse.passwordOrEmailIsNotMatch) {
      toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return;
    }
  }

  toast.error("เกิดข้อผิดพลาด");
};
