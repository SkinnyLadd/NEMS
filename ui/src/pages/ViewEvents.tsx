"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Tag, Search, Filter } from "lucide-react"
import {subHours} from "date-fns";

interface TicketType {
    type: string
    price: number
    availableTickets: number
}

interface Event {
    id: number
    title: string
    description: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    venue: string
    society: string
    status: "upcoming" | "ongoing" | "completed"
    type: "regular" | "recruitment"
    ticketTypes?: TicketType[]
    totalRegistrations: number
}

function StatusBadge({ status }: { status: string }) {
    const variants = {
        upcoming: "bg-blue-500",
        ongoing: "bg-green-500",
        completed: "bg-gray-500"
    }

    return (
        <Badge className={`${variants[status as keyof typeof variants]} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    )
}

function EventCard({ event }: { event: Event }) {
    const navigate = useNavigate()

    const handleAction = (eventId: number) => {
        if (event.type === "recruitment") {
            navigate(`/apply/${eventId}`)
        } else {
            navigate(`/purchase?type=ticket&itemId=${eventId}`)
        }
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                        {/*<CardDescription className="text-lg">{event.society}</CardDescription>*/}
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="bg-primary/10">
                            {event.type === "recruitment" ? "Recruitment" : "Event"}
                        </Badge>
                        <StatusBadge status={event.status} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">{event.description}</p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                            <span>{event.startDate}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                            <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        {/*<div className="flex items-center">*/}
                        {/*    <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />*/}
                        {/*    <span>{event.venue}</span>*/}
                        {/*</div>*/}
                        <div className="flex items-center">
                            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                            <span>{event.totalRegistrations} {event.type === "recruitment" ? "applications" : "registered"}</span>
                        </div>
                    </div>

                    {event.type === "regular" && event.ticketTypes && (
                        <div className="border-l pl-4">
                            <h3 className="font-semibold mb-2 flex items-center">
                                <Tag className="mr-2 h-5 w-5" />
                                Ticket Types
                            </h3>
                            <div className="space-y-2">
                                {event.ticketTypes.map((ticket, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span>{ticket.type}</span>
                                        <div className="text-right">
                                            <div className="font-semibold">Rs. {ticket.price}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {ticket.availableTickets} available
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button
                    onClick={() => handleAction(event.id)}
                    disabled={event.status === "completed"}
                    className="text-primary"
                >
                    {event.type === "recruitment" ? "Apply Now" : "Buy Tickets"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function ViewEvents() {
    const [events, setEvents] = useState<Event[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("upcoming")

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/events")
                const transformed = res.data.map((event: any) => {
                    const start = subHours(new Date(event.startTime), 5)
                    const end = subHours(new Date(event.endTime), 5)
                    const now = new Date()

                    let status: "upcoming" | "ongoing" | "completed" = "completed"
                    if (now < start) status = "upcoming"
                    else if (now >= start && now <= end) status = "ongoing"

                    return {
                        ...event,
                        startDate: start.toLocaleDateString(),
                        startTime: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        endDate: end.toLocaleDateString(),
                        endTime: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        society: event.society?.socName || "",
                        type: event.recruitment ? "recruitment" : "regular",
                        status,
                        totalRegistrations: event.totalRegistrations || 0
                    }
                })
                setEvents(transformed)
            } catch (err) {
                console.error("Failed to load events", err)
            }
        }
        fetchEvents()
    }, [])

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.society.toLowerCase().includes(searchTerm.toLowerCase())

        if (filter === "all") return matchesSearch
        return matchesSearch && event.status === filter
    })

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Events</h1>
                <div className="flex gap-4">
                    {/*<div className="relative">*/}
                    {/*    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />*/}
                    {/*    <Input*/}
                    {/*        placeholder="Search events..."*/}
                    {/*        className="pl-10 w-[300px]"*/}
                    {/*        value={searchTerm}*/}
                    {/*        onChange={(e) => setSearchTerm(e.target.value)}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <Select value={filter} onValueChange={setFilter} defaultValue="upcoming">
                        <SelectTrigger className="w-[150px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-6">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No events found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}
