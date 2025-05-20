import { createContext, useContext, useState } from "react"
import API from "@/utils/axios.ts";

export interface AuthContextType {
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    loading: boolean
    role: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState<string | null>(localStorage.getItem("role"))

    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            const res = await API.post("/auth/login", { email, password })
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.role)
            setRole(res.data.role)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.clear()
        setRole(null)
    }

    const value: AuthContextType = {
        login,
        logout,
        loading,
        role,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
