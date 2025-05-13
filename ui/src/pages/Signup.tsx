"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AtSign, User, Hash, BookOpen, GraduationCap, UserPlus, Lock } from "lucide-react"
import Logo from "@/assets/NEMSlogo.svg"

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        cms: "",
        email: "",
        password: "",
        batch: "",
        department: "",
    })
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Navigate to login page
        navigate("/login")
    }

    return (
        <div className="flex min-h-screen min-w-screen items-center justify-center bg-primary/5 py-8">
            <div className="w-full max-w-2xl px-6">
                <div className="mb-8 flex flex-col items-center">
                    <img src={Logo || "/placeholder.svg"} alt="NEMS Logo" className="mb-4 h-30 w-30 rounded-full" />
                    <h1 className="text-3xl font-bold text-primary">Create an Account</h1>
                    <p className="mt-2 text-center text-gray-600">Sign up to start using NEMS for event management</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="firstName"
                                    placeholder="Ali"
                                    className="h-12 pl-10 text-base"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="lastName"
                                    placeholder="Azmat"
                                    className="h-12 pl-10 text-base"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="cms" className="block text-sm font-medium text-gray-700">
                                CMS (6-digit Roll Number)
                            </label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="cms"
                                    placeholder="123456"
                                    className="h-12 pl-10 text-base"
                                    value={formData.cms}
                                    onChange={handleChange}
                                    maxLength={6}
                                />
                            </div>
                        </div>

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
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="h-12 pl-10 text-base"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
                                Batch
                            </label>
                            <Select onValueChange={(value) => handleSelectChange("batch", value)}>
                                <SelectTrigger id="batch" className="h-12">
                                    <div className="flex items-center">
                                        <GraduationCap className="mr-2 h-5 w-5 text-gray-400" />
                                        <SelectValue placeholder="Select Batch" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2021">2021</SelectItem>
                                    <SelectItem value="2022">2022</SelectItem>
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2025">2025</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                Department
                            </label>
                            <Select onValueChange={(value) => handleSelectChange("department", value)}>
                                <SelectTrigger id="department" className="h-12">
                                    <div className="flex items-center">
                                        <BookOpen className="mr-2 h-5 w-5 text-gray-400" />
                                        <SelectValue placeholder="Select Department" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BS CS">BS CS</SelectItem>
                                    <SelectItem value="BS AI">BS AI</SelectItem>
                                    <SelectItem value="BE EE">BE EE</SelectItem>
                                    <SelectItem value="BS DS">BS DS</SelectItem>
                                    <SelectItem value="BE SE">BE SE</SelectItem>
                                    <SelectItem value="BBA">BBA</SelectItem>
                                    <SelectItem value="ACF">ACF</SelectItem>
                                    <SelectItem value="ARCHI">ARCHI</SelectItem>
                                    <SelectItem value="ECON">ECON</SelectItem>
                                    <SelectItem value="BE ME">BE ME</SelectItem>
                                    <SelectItem value="BE AE">BE AE</SelectItem>
                                    <SelectItem value="BS PSYCH">BS PSYCH</SelectItem>
                                    <SelectItem value="BIO INFORMATICS">BIO INFORMATICS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="h-12 w-full bg-white text-primary text-base font-semibold hover:bg-primary/90"
                    >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Create Account
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

