import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"

interface DonationForm {
    amount: string
    eventId: string
}

interface EventOption {
    id: number
    title: string
}

export default function Donate() {
    const navigate = useNavigate()
    const [form, setForm] = useState<DonationForm>({
        amount: "",
        eventId: ""
    })

    const [events, setEvents] = useState<EventOption[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/events")
                setEvents(res.data)
            } catch (err) {
                console.error("Failed to fetch events", err)
            }
        }
        fetchEvents()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.amount || !form.eventId) {
            alert("Please fill in all required fields")
            return
        }

        if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
            alert("Please enter a valid amount")
            return
        }

        try {
            await axios.post("http://localhost:8080/api/donations", {
                amount: Number(form.amount),
                eventId: Number(form.eventId)
            })

            navigate("/donations")
        } catch (err) {
            console.error("Failed to submit donation", err)
            alert("Donation failed. Please try again.")
        }
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
                        Support an event with your contribution
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="event">Event</Label>
                            <Select
                                value={form.eventId}
                                onValueChange={(value) => setForm(prev => ({ ...prev, eventId: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an event" />
                                </SelectTrigger>
                                <SelectContent>
                                    {events.map(event => (
                                        <SelectItem key={event.id} value={String(event.id)}>
                                            {event.title}
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
