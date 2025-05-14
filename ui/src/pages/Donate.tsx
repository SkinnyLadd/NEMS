import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"

// Mock data - replace with API call
const societies = [
    "Computing Society",
    "Cultural Society",
    "Sports Society",
    "Literary Society"
]

interface DonationForm {
    amount: string
    society: string
    name: string
    regNo?: string
    type: "student" | "alumni" | "other"
    message?: string
}

export default function Donate() {
    const navigate = useNavigate()
    const [form, setForm] = useState<DonationForm>({
        amount: "",
        society: "",
        name: "",
        type: "student"
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form
        if (!form.amount || !form.society || !form.name || !form.type) {
            alert("Please fill in all required fields")
            return
        }

        if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
            alert("Please enter a valid amount")
            return
        }

        // Mock submission - replace with API call
        console.log("Submitting donation:", form)

        // Navigate to success page or donations list
        navigate("/dashboard")
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Heart className="h-6 w-6 text-red-500" />
                        Make a Donation
                    </CardTitle>
                    <CardDescription>
                        Support your favorite societies and help them grow
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="society">Society</Label>
                            <Select
                                value={form.society}
                                onValueChange={(value) => setForm(prev => ({ ...prev, society: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a society" />
                                </SelectTrigger>
                                <SelectContent>
                                    {societies.map(society => (
                                        <SelectItem key={society} value={society}>
                                            {society}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (Rs.)</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount"
                                value={form.amount}
                                onChange={(e) => setForm(prev => ({ ...prev, amount: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">You are a</Label>
                            <Select
                                value={form.type}
                                onValueChange={(value: "student" | "alumni" | "other") => 
                                    setForm(prev => ({ ...prev, type: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="alumni">Alumni</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {form.type === "student" && (
                            <div className="space-y-2">
                                <Label htmlFor="regNo">Registration Number</Label>
                                <Input
                                    id="regNo"
                                    placeholder="Enter your registration number"
                                    value={form.regNo || ""}
                                    onChange={(e) => setForm(prev => ({ ...prev, regNo: e.target.value }))}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="message">Message (Optional)</Label>
                            <Textarea
                                id="message"
                                placeholder="Leave a message with your donation"
                                value={form.message || ""}
                                onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="text-primary">
                            <Heart className="mr-2 h-4 w-4 text-primary" />
                            Donate
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
} 