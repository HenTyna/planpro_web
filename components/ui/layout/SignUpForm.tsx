import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Sparkles,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
} from "lucide-react";
import { Input } from "@/components/shared/ui/Input";
import { Button } from "@/components/shared/ui/Button";
import { useForm } from "react-hook-form";
import { useFormContextState } from "@/lib/hooks/useFromState";
import useSignUpMutation from "@/lib/hooks/useSignUpMutation";
import { PasswordUtils } from "@/utils/PasswordUtils";
import toast from "react-hot-toast";

interface RegisterFormValues {
    user_name: string;
    email: string;
    password: string;
}

export default function RegisterPage() {
    const { state } = useFormContextState();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        watch,
        setError: setFormError,
    } = useForm<RegisterFormValues>({
        mode: "onChange",
        defaultValues: {
            user_name: typeof state?.value === 'object' && state.value !== null && 'data' in state.value && (state.value as any).data?.user_name ? (state.value as any).data.user_name : "",
            email: typeof state?.value === 'object' && state.value !== null && 'data' in state.value && (state.value as any).data?.email ? (state.value as any).data.email : "",
            password: typeof state?.value === 'object' && state.value !== null && 'data' in state.value && (state.value as any).data?.email?.password ? PasswordUtils.encrypt((state.value as any).data.email.password) : "",
        },
    });
    const mutation = useSignUpMutation(setFormError);
    const password = watch("password");

    useEffect(() => {
        setMounted(true);
    }, []);

    const onSubmit = async (data: RegisterFormValues) => {
        setError("");
        const toastId = toast.loading("Signing up...");
        try {
            const requestBody = {
                user_name: data.user_name,
                email: data.email,
                password: PasswordUtils.encrypt(data.password),
            };

            const response: any = await mutation.mutate(requestBody, {
                onError: (err) => {
                    console.error("Registration error:", err);
                    setError("Registration failed. Please try again.");
                },
                onSuccess: () =>{
                    toast.success("Account created successfully!");
                }
            });
        } catch (err) {
            console.error("Unexpected registration error:", err);
            setError("An unexpected error occurred.");
        }finally {
            toast.dismiss(toastId);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            {/* Background Decorations */}
            <div className="fixed top-0 right-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="fixed top-1/3 left-0 w-96 h-96 bg-yellow-400 rounded-full opacity-10 -translate-x-1/2 blur-3xl" />
            <div className="fixed bottom-0 right-1/3 w-80 h-80 bg-green-400 rounded-full opacity-10 translate-y-1/2 blur-3xl" />

            <header className="container mx-auto px-4 py-6 relative z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-400 rounded-full blur-sm opacity-50 group-hover:opacity-70 transition-opacity" />
                        <Sparkles className="h-6 w-6 text-orange-500 relative z-10" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                        PlanPro
                    </span>
                </Link>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-md">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-2xl opacity-50 blur-lg" />

                        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white relative z-10">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 animate-pulse blur-md" />
                                        <div className="relative bg-white rounded-full p-3">
                                            <Sparkles className="h-8 w-8 text-orange-500" />
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                    Create your account
                                </h1>
                                <p className="text-gray-600">Start planning smarter with PlanPro</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                    <p>{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <User className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <Input
                                            type="text"
                                            placeholder="John Doe"
                                            className="pl-10 border-transparent bg-white relative z-10"
                                            {...register("user_name", { required: "Full name is required" })}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <Mail className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            className="pl-10 border-transparent bg-white relative z-10"
                                            {...register("email", { required: "Email is required" })}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <Lock className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-10 pr-10 border-transparent bg-white relative z-10"
                                            {...register("password", { required: "Password is required" })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>

                                    {/* Password rules */}
                                    <div className="mt-2 space-y-1 text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <CheckCircle className={`h-3 w-3 mr-1.5 ${password.length >= 8 ? "text-green-500" : "text-gray-300"}`} />
                                            At least 8 characters
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className={`h-3 w-3 mr-1.5 ${/[A-Z]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                                            At least one uppercase letter
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className={`h-3 w-3 mr-1.5 ${/[0-9]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                                            At least one number
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating account..." : "Sign Up"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
