"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
    AtSign,
    User,
    Hash,
    BookOpen,
    GraduationCap,
    UserPlus,
    Lock,
} from "lucide-react"

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

    const [courses, setCourses] = useState<string[]>([])
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/courses")
                const courseList = Array.isArray(res.data)
                    ? res.data.map((course: any) => course.courseName)
                    : [];
                console.log("Fetched courses:", courseList);
                setCourses(courseList);
            } catch (err) {
                console.error("Failed to fetch courses", err)
            }
        }

        fetchCourses()
    }, [])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const res = await axios.post("http://localhost:8080/api/users", formData)

            if (res.status === 201) {
                navigate("/login")
            }
        } catch (err: any) {
            if (err.response?.status === 409) {
                setError(err.response.data.message)
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
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
                        <InputField
                            id="firstName"
                            label="First Name"
                            icon={User}
                            placeholder="Ali"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <InputField
                            id="lastName"
                            label="Last Name"
                            icon={User}
                            placeholder="Azmat"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <InputField
                            id="cms"
                            label="CMS (6-digit Roll Number)"
                            icon={Hash}
                            placeholder="123456"
                            value={formData.cms}
                            onChange={handleChange}
                            maxLength={6}
                        />
                        <InputField
                            id="email"
                            label="Email"
                            icon={AtSign}
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                        />
                    </div>

                    <InputField
                        id="password"
                        label="Password"
                        icon={Lock}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <SelectField
                            id="batch"
                            label="Batch"
                            icon={GraduationCap}
                            options={["FRESHMAN", "SOPHOMORE", "JUNIOR", "SENIOR"]}
                            value={formData.batch}
                            onChange={(val) => handleSelectChange("batch", val)}
                        />
                        <SelectField
                            id="department"
                            label="Department"
                            icon={BookOpen}
                            options={courses}
                            value={formData.department}
                            onChange={(val) => handleSelectChange("department", val)}
                        />
                    </div>

                    <Button type="submit" className="h-12 w-full bg-white text-primary text-base font-semibold hover:bg-primary/90">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Create Account
                    </Button>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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

// Reusable input field component
function InputField({
                        id,
                        label,
                        icon: Icon,
                        placeholder,
                        value,
                        onChange,
                        type = "text",
                        maxLength,
                    }: {
    id: string
    label: string
    icon: React.ElementType
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    maxLength?: number
}) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className="h-12 pl-10 text-base"
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                />
            </div>
        </div>
    )
}

// Reusable select field component
function SelectField({
                         id,
                         label,
                         icon: Icon,
                         options,
                         value,
                         onChange,
                     }: {
    id: string
    label: string
    icon: React.ElementType
    options: string[]
    value: string
    onChange: (value: string) => void
}) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger id={id} className="h-12">
                    <div className="flex items-center">
                        <Icon className="mr-2 h-5 w-5 text-gray-400" />
                        <SelectValue placeholder={`Select ${label}`} />
                    </div>
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
