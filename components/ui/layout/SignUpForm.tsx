"use client"


import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, User, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Twitter, CheckCircle } from "lucide-react"
import { Input } from "@/components/shared/ui/Input"
import { Button } from "@/components/shared/ui/Button"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!name || !email || !password) {
            setError("Please fill in all fields")
            return
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }

        try {
            setIsLoading(true)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))
            // In a real app, you would handle registration here
            console.log("Registration attempt with:", { name, email, password })
            // Redirect to dashboard or home page after successful registration
            window.location.href = "/trips"
        } catch (err) {
            setError("Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            {/* Decorative elements */}
            <div className="fixed top-0 right-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="fixed top-1/3 left-0 w-96 h-96 bg-yellow-400 rounded-full opacity-10 -translate-x-1/2 blur-3xl"></div>
            <div className="fixed bottom-0 right-1/3 w-80 h-80 bg-green-400 rounded-full opacity-10 translate-y-1/2 blur-3xl"></div>

            <header className="container mx-auto px-4 py-6 relative z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-400 rounded-full blur-sm opacity-50 group-hover:opacity-70 transition-opacity"></div>
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
                        {/* Card glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-2xl opacity-50 blur-lg"></div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white relative z-10">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 animate-pulse blur-md"></div>
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
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-start">
                                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                        <span className="text-red-600 text-xs">!</span>
                                    </div>
                                    <p>{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-md opacity-30 blur-sm group-hover:opacity-40 transition-opacity"></div>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <User className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="pl-10 border-transparent bg-white relative z-10"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-md opacity-30 blur-sm group-hover:opacity-40 transition-opacity"></div>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <Mail className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="pl-10 border-transparent bg-white relative z-10"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-md opacity-30 blur-sm group-hover:opacity-40 transition-opacity"></div>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <Lock className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-10 pr-10 border-transparent bg-white relative z-10"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <CheckCircle
                                                className={`h-3 w-3 mr-1.5 ${password.length >= 8 ? "text-green-500" : "text-gray-300"}`}
                                            />
                                            <span>At least 8 characters</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <CheckCircle
                                                className={`h-3 w-3 mr-1.5 ${/[A-Z]/.test(password) ? "text-green-500" : "text-gray-300"}`}
                                            />
                                            <span>At least one uppercase letter</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <CheckCircle
                                                className={`h-3 w-3 mr-1.5 ${/[0-9]/.test(password) ? "text-green-500" : "text-gray-300"}`}
                                            />
                                            <span>At least one number</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded opacity-30 blur-sm"></div>
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded relative z-10"
                                            required
                                        />
                                    </div>
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                                        I agree to the{" "}
                                        <Link
                                            href="/terms"
                                            className="text-orange-500 hover:text-orange-600 transition-colors hover:underline"
                                        >
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            href="/privacy"
                                            className="text-orange-500 hover:text-orange-600 transition-colors hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" className="w-full relative group overflow-hidden" disabled={isLoading}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-yellow-500 group-hover:to-orange-500 transition-all duration-300"></div>
                                        <span className="relative z-10 flex items-center justify-center text-white">
                                            {isLoading ? (
                                                <>
                                                    <svg
                                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Creating account...
                                                </>
                                            ) : (
                                                <>
                                                    Create account <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <Button type="button" className="w-full relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 group-hover:from-gray-900 group-hover:to-black transition-all duration-300"></div>
                                        <span className="relative z-10 flex items-center justify-center text-white">
                                            <Github className="mr-2 h-4 w-4" />
                                            GitHub
                                        </span>
                                    </Button>
                                    <Button type="button" className="w-full relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300"></div>
                                        <span className="relative z-10 flex items-center justify-center text-white">
                                            <Twitter className="mr-2 h-4 w-4" />
                                            Twitter
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-medium text-orange-500 hover:text-orange-600 transition-colors hover:underline"
                                    >
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
