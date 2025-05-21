// Purchase.tsx (dynamic version)

"use client"

import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import {
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, ArrowLeft, CreditCard } from "lucide-react"
import {subHours} from "date-fns";

interface TicketType {
    ticketType: string
    ticketPrice: number
    availableTickets: number
}

interface Event {
    id: number
    title: string
    description: string
    startTime: string
    endTime: string
    venue: string
    society: {
        socName: string
    }
    tickets: TicketType[]
}

export default function Purchase() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const itemId = searchParams.get("itemId")

    const [event, setEvent] = useState<Event | null>(null)
    const [selectedType, setSelectedType] = useState<string>("")
    const [quantity, setQuantity] = useState<number>(1)

    useEffect(() => {
        if (!itemId) return
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/events/${itemId}`)
                setEvent(res.data)
            } catch (err) {
                console.error("Failed to fetch event", err)
            }
        }
        fetchEvent()
    }, [itemId])

    if (!event) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <h1 className="text-xl font-semibold">Loading...</h1>
            </div>
        )
    }

    const start = subHours(new Date(event.startTime), 5)
    const end = subHours(new Date(event.endTime), 5)
    const selectedTicket = event.tickets?.find(t => t.ticketType === selectedType)
    const total = selectedTicket ? selectedTicket.ticketPrice * quantity : 0

    return (
        <div className="container mx-auto py-8 px-4">
            <Button
                variant="outline"
                onClick={() => navigate("/events/view")}
                className="mb-6"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
            </Button>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.society?.socName || "SEECS"}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{event.description}</p>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span>{start.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span>{start.toLocaleTimeString()} - {end.toLocaleTimeString()}</span>
                            </div>
                            {/*<div className="flex items-center">*/}
                            {/*    <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />*/}
                            {/*    <span>{event.venue}</span>*/}
                            {/*</div>*/}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Buy Tickets</CardTitle>
                        <CardDescription>Select ticket type and quantity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Ticket Type</label>
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select ticket type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {event.tickets.map((ticket, index) => (
                                        <SelectItem key={index} value={ticket.ticketType}>
                                            {ticket.ticketType} - Rs. {ticket.ticketPrice} ({ticket.availableTickets} available)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Quantity</label>
                            <Input
                                type="number"
                                min={1}
                                max={selectedTicket?.availableTickets || 1}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                        </div>

                        {selectedTicket && (
                            <div className="rounded-lg bg-muted p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span>Price per ticket:</span>
                                    <span>Rs. {selectedTicket.ticketPrice}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span>Quantity:</span>
                                    <span>{quantity}</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between items-center font-bold">
                                        <span>Total:</span>
                                        <span>Rs. {total}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={!selectedTicket || quantity < 1}
                            className="w-full text-primary"
                            onClick={() => alert("Payment not implemented")}
                        >
                            <CreditCard className="mr-2 h-4 w-4 text-primary" />
                            Proceed to Payment
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
