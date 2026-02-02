import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            {/* DESKTOP VIEW */}
            <div className="hidden md:flex relative bg-white rounded-lg shadow-2xl overflow-hidden w-[768px] max-w-full min-h-[480px] h-[480px]">
                <div
                    className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 ${isRightPanelActive
                        ? "opacity-100 z-[5] translate-x-full"
                        : "opacity-0 z-[1]"
                        }`}
                >
                    <form className="bg-white flex flex-col items-center justify-center h-full px-12 text-center" onSubmit={handleLogin}>
                        <h1 className="text-3xl font-bold mb-4">Create Account</h1>
                        <div className="flex gap-4 mb-4">
                            <a href="#" className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
                                <Facebook className="w-5 h-5 text-gray-700" />
                            </a>
                            <a href="#" className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
                                <Linkedin className="w-5 h-5 text-gray-700" />
                            </a>
                            <a href="#" className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
                                <Twitter className="w-5 h-5 text-gray-700" />
                            </a>
                        </div>
                        <span className="text-sm text-gray-500 mb-4">or use your email for registration</span>
                        <div className="flex flex-col gap-3 w-full mb-6">
                            <Input type="text" placeholder="Name" className="bg-gray-100 border-none" />
                            <Input type="email" placeholder="Email" className="bg-gray-100 border-none" />
                            <Input type="password" placeholder="Password" className="bg-gray-100 border-none" />
                        </div>
                        <Button size="lg" className="rounded-full px-12 py-3 uppercase tracking-wider font-bold">Sign Up</Button>
                    </form>
                </div>

                <div
                    className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-[2] ${isRightPanelActive ? "translate-x-full" : ""
                        }`}
                >
                    <form className="bg-white flex flex-col items-center justify-center h-full px-12 text-center" onSubmit={handleLogin}>
                        <h1 className="text-3xl font-bold mb-4">Sign in</h1>
                        <div className="flex gap-4 mb-4">
                            <a href="#" className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
                                <Facebook className="w-5 h-5 text-gray-700" />
                            </a>
                            <a href="#" className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
                                <Linkedin className="w-5 h-5 text-gray-700" />
                            </a>
                            <a href="#" className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
                                <Twitter className="w-5 h-5 text-gray-700" />
                            </a>
                        </div>
                        <span className="text-sm text-gray-500 mb-4">or use your account</span>
                        <div className="flex flex-col gap-3 w-full mb-4">
                            <Input type="email" placeholder="Email" className="bg-gray-100 border-none" />
                            <Input type="password" placeholder="Password" className="bg-gray-100 border-none" />
                        </div>
                        <a href="#" className="text-sm text-gray-800 mb-6 hover:underline">Forgot your password?</a>
                        <Button size="lg" className="rounded-full px-12 py-3 uppercase tracking-wider font-bold">Sign In</Button>
                    </form>
                </div>

                <div
                    className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-[100] ${isRightPanelActive ? "-translate-x-full" : ""
                        }`}
                >
                    <div
                        className={`bg-[image:var(--grad-main)] bg-no-repeat bg-cover relative -left-full h-full w-[200%] transition-transform duration-600 ease-in-out ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
                            }`}
                    >
                        <div
                            className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${isRightPanelActive ? "translate-x-0" : "-translate-x-[20%]"
                                }`}
                        >
                            <h1 className="text-3xl font-bold text-white mb-4">Welcome Back!</h1>
                            <p className="text-white mb-8 text-sm leading-6">To keep connected with us please login with your personal info</p>
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-transparent border-white text-white rounded-full px-12 py-3 uppercase tracking-wider font-bold hover:bg-white hover:text-primary transition-colors"
                                onClick={() => setIsRightPanelActive(false)}
                            >
                                Sign In
                            </Button>
                        </div>

                        <div
                            className={`absolute right-0 flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"
                                }`}
                        >
                            <h1 className="text-3xl font-bold text-white mb-4">Hello, Friend!</h1>
                            <p className="text-white mb-8 text-sm leading-6">Enter your personal details and start journey with us</p>
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-transparent border-white text-white rounded-full px-12 py-3 uppercase tracking-wider font-bold hover:bg-white hover:text-primary transition-colors"
                                onClick={() => setIsRightPanelActive(true)}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE VIEW (Beautiful, optimized, no horizontal scroll) */}
            <div className="md:hidden w-full h-[100dvh] flex flex-col relative overflow-hidden bg-background">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">Medrox</h1>
                        <p className="text-muted-foreground">Healthcare made simple.</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                                        <div className="text-center mb-2">
                                            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                                            <p className="text-sm text-gray-500">Sign in to continue</p>
                                        </div>
                                        <Input type="email" placeholder="Email Address" className="h-12 rounded-xl bg-gray-50/50 border-gray-200 focus:ring-primary/20" />
                                        <Input type="password" placeholder="Password" className="h-12 rounded-xl bg-gray-50/50 border-gray-200 focus:ring-primary/20" />
                                        <div className="flex justify-end">
                                            <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot Password?</a>
                                        </div>
                                        <Button size="lg" className="h-12 rounded-xl w-full bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/25 font-bold tracking-wide">
                                            SIGN IN
                                        </Button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                                        <div className="text-center mb-2">
                                            <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
                                            <p className="text-sm text-gray-500">Create your free account</p>
                                        </div>
                                        <Input type="text" placeholder="Full Name" className="h-12 rounded-xl bg-gray-50/50 border-gray-200 focus:ring-primary/20" />
                                        <Input type="email" placeholder="Email Address" className="h-12 rounded-xl bg-gray-50/50 border-gray-200 focus:ring-primary/20" />
                                        <Input type="password" placeholder="Password" className="h-12 rounded-xl bg-gray-50/50 border-gray-200 focus:ring-primary/20" />
                                        <Button size="lg" className="h-12 rounded-xl w-full bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/25 font-bold tracking-wide">
                                            CREATE ACCOUNT
                                        </Button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex flex-col gap-4 text-center">
                                <p className="text-sm text-gray-500">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 rounded-xl border-primary/20 text-primary hover:bg-primary/5"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? "Create Account" : "Sign In"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:block mt-8 absolute bottom-8">
                <Link to="/" className="text-gray-500 hover:text-gray-800 transition-colors">
                    &larr; Back to Home
                </Link>
            </div>

        </div>
    );
}
