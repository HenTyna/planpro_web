
import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, Mail, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/shared/ui/Button"
import { Input } from "@/components/shared/ui/Input"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)

        if (!email) {
            setError("Please enter your email address")
            return
        }

        try {
            setIsLoading(true)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))
            // In a real app, you would handle password reset here
            console.log("Password reset requested for:", email)
            setSuccess(true)
        } catch (err) {
            setError("Failed to send reset link. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-teal-50">
            {/* Decorative elements */}
            <div className="fixed top-0 left-0 w-64 h-64 bg-green-400 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="fixed top-1/3 right-0 w-96 h-96 bg-teal-400 rounded-full opacity-10 translate-x-1/2 blur-3xl"></div>
            <div className="fixed bottom-0 left-1/3 w-80 h-80 bg-blue-500 rounded-full opacity-10 translate-y-1/2 blur-3xl"></div>

            <header className="container mx-auto px-4 py-6 relative z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        <Sparkles className="h-6 w-6 text-green-500 relative z-10" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                        PlanPro
                    </span>
                </Link>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-md">
                    <div className="relative">
                        {/* Card glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 rounded-2xl opacity-50 blur-lg"></div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white relative z-10">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-teal-400 animate-pulse blur-md"></div>
                                        <div className="relative bg-white rounded-full p-3">
                                            <Sparkles className="h-8 w-8 text-green-500" />
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                                    Reset your password
                                </h1>
                                <p className="text-gray-600">We&apos;ll send you a link to reset your password</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-start">
                                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                        <span className="text-red-600 text-xs">!</span>
                                    </div>
                                    <p>{error}</p>
                                </div>
                            )}

                            {success ? (
                                <div className="space-y-6">
                                    <div className="p-6 bg-green-50 border border-green-200 text-green-700 rounded-lg relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-400"></div>
                                        <div className="flex items-start">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                                                <Mail className="h-5 w-5 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-lg">Reset link sent!</p>
                                                <p className="mt-1 text-sm">
                                                    Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes,
                                                    check your spam folder.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/login">
                                        <Button type="button" className="w-full relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-green-400 group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:via-teal-500 group-hover:to-green-500 transition-all duration-300"></div>
                                            <span className="relative z-10 flex items-center justify-center text-white">
                                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-md opacity-30 blur-sm group-hover:opacity-40 transition-opacity"></div>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                                <Mail className="h-5 w-5 text-green-500" />
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

                                    <div className="pt-2">
                                        <Button type="submit" className="w-full relative group overflow-hidden" disabled={isLoading}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-green-400 group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:via-teal-500 group-hover:to-green-500 transition-all duration-300"></div>
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
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send reset link <ArrowRight className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </span>
                                        </Button>
                                    </div>

                                    <div className="text-center">
                                        <Link
                                            href="/login"
                                            className="text-sm text-green-500 hover:text-green-600 transition-colors hover:underline"
                                        >
                                            Back to login
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
