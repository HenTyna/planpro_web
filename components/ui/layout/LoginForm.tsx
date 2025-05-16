import React from 'react'
import { Eye, EyeOff, User, Mail } from 'lucide-react';
import Link from 'next/link';
const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col">
                <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                            Login to your account <span className="text-blue-500">.</span></h1>
                    </div>

                    <div className="space-y-4">
                        {/* Email field */}
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value="michal.masiak@anywhere.co"
                                    className="w-full p-3 bg-gray-50 rounded-lg pr-10"
                                />
                                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Mail size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    // value="•••••••"
                                    className="w-full p-3 border border-blue-500 rounded-lg pr-10"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
                            <button className="py-3 px-6 rounded-full bg-gray-100 text-gray-600 font-medium">
                                Change method
                            </button>

                            {/* <button className="py-3 px-6 rounded-full bg-blue-500 text-white font-medium flex-1"> */}
                                <Link className='py-3 px-6 rounded-full bg-blue-500 text-white font-medium flex-1 text-center' href={{
                                    pathname: '/plans',
                                }}>
                                    Login
                                </Link>
                            {/* </button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    src=""
                    alt="Mountain lake"
                    className="w-full h-full object-cover"
                />

                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <svg
                        className="absolute left-0 top-0 h-full text-white opacity-20"
                        viewBox="0 0 100 800"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,0 C30,100 10,300 50,400 C70,500 0,600 0,800" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    </svg>
                </div>

                <div className="absolute bottom-6 right-6 text-white font-bold text-4xl">
                    .AW
                </div>
            </div>
        </div >
    );
};

export default LoginForm