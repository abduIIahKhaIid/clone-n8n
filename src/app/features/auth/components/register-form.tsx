"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";



const RegisterSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
    const router = useRouter();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });


    const onSubmit = async (data: RegisterFormValues) => {
        await authClient.signUp.email({
            name: data.email,
            email: data.email,
            password: data.password,
            callbackURL: "/",
        },
            {
                onSuccess: () => {
                    router.push("/");
                },
                onError: (error) => {
                    toast.error(`Registration failed: ${error.error.message}`);
                }
            }
        )
    }

    const isPending = form.formState.isSubmitting;


    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>Create your account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant={"outline"}
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        <Image alt="Github" src="/logos/github.svg" width={20} height={20} />
                                        Continue with Github
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        <Image alt="Google" src="/logos/google.svg" width={20} height={20} />
                                        Continue with Google
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="m@example.com"
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="********"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="********"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={isPending} className="w-full">
                                        SignUp
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
