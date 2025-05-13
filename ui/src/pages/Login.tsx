import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AtSign, Lock, LogIn } from 'lucide-react'
import Logo from "@/assets/NEMSlogo.svg"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Navigate directly to dashboard for testing
        navigate("/dashboard")
    }

    return (
        <div className="flex min-h-screen min-w-screen items-center justify-center bg-primary/5">
            <div className="w-full max-w-md px-6 py-8">
                <div className="mb-8 flex flex-col items-center">
                    <img src={Logo || "/placeholder.svg"} alt="NEMS Logo" className="mb-4 h-30 w-30 rounded-full" />
                    <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
                    <p className="mt-2 text-center text-gray-600">Sign in to your NEMS account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="h-12 pl-10 text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="h-12 pl-10 text-base"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="h-12 w-full bg-white text-primary text-base font-semibold hover:bg-primary/90"
                    >
                        <LogIn className="mr-2 h-5 w-5" />
                        Sign In
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
