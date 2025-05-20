import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

import axios from "axios"

interface EventDTO {
    id: number
    title: string
    startTime: string
    endTime: string
    location: string
    category: string
    attendees: number
}

export default function DashboardPage() {
    const [events, setEvents] = useState<EventDTO[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/events")
                setEvents(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchEvents()
    }, [])

    const now = new Date()

    const categorizeEvent = (event: EventDTO): "upcoming" | "ongoing" | "completed" => {
        const start = new Date(event.startTime)
        const end = new Date(event.endTime)

        if (now < start) return "upcoming"
        if (now >= start && now <= end) return "ongoing"
        return "completed"
    }

    const categorized = {
        upcoming: events.filter(e => categorizeEvent(e) === "upcoming"),
        ongoing: events.filter(e => categorizeEvent(e) === "ongoing"),
        completed: events.filter(e => categorizeEvent(e) === "completed"),
    }

    return (
        <main className="flex flex-col p-6 gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date().toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing Events</TabsTrigger>
                    <TabsTrigger value="completed">Completed Events</TabsTrigger>
                </TabsList>

                {(["upcoming", "ongoing", "completed"] as const).map((category) => (
                    <TabsContent key={category} value={category} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {categorized[category].length > 0 ? (
                                categorized[category].map((event) => (
                                    <EventCard
                                        key={event.id}
                                        title={event.title}
                                        date={formatEventDate(event.startTime, event.endTime)}
                                        time={formatEventTime(event.startTime, event.endTime)}
                                        //location={event.location}
                                        //category={event.category}
                                        //attendees={event.attendees.toString()}
                                        status={category}
                                    />
                                ))
                            ) : (
                                <p className="text-muted-foreground">No events found.</p>
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {/*<div className="grid gap-4 md:grid-cols-2">*/}
            {/*    /!*<Card>*!/*/}
            {/*    /!*    <CardHeader>*!/*/}
            {/*    /!*        <CardTitle>Notifications</CardTitle>*!/*/}
            {/*    /!*        <CardDescription>Recent system announcements and reminders</CardDescription>*!/*/}
            {/*    /!*    </CardHeader>*!/*/}
            {/*    /!*    <CardContent className="space-y-4">*!/*/}
            {/*    /!*        /!* Static or mapped notification items *!/*!/*/}
            {/*    /!*    </CardContent>*!/*/}
            {/*    /!*</Card>*!/*/}

            {/*    <Card>*/}
            {/*        <CardHeader>*/}
            {/*            <CardTitle>Quick Actions</CardTitle>*/}
            {/*            <CardDescription>Frequently used actions</CardDescription>*/}
            {/*        </CardHeader>*/}
            {/*        <CardContent className="grid gap-2">*/}
            {/*            <Button variant="outline" className="w-full justify-start">*/}
            {/*                <Calendar className="mr-2 h-4 w-4" />*/}
            {/*                View Calendar*/}
            {/*            </Button>*/}
            {/*            <Button variant="outline" className="w-full justify-start">*/}
            {/*                <Bell className="mr-2 h-4 w-4" />*/}
            {/*                View All Notifications*/}
            {/*            </Button>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*</div>*/}
        </main>
    )
}


interface EventCardProps {
    title: string
    date: string
    time: string
   // location: string
    //category: string
    //attendees: string
    status?: "upcoming" | "ongoing" | "completed"
}


function EventCard({ title, date, time, status = "upcoming" }: EventCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <StatusBadge status={status} />
                </div>
                {/*<CardDescription>{category}</CardDescription>*/}
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{time}</span>
                </div>
                {/*<div className="flex items-center text-sm">*/}
                {/*    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />*/}
                {/*    <span>{location}</span>*/}
                {/*</div>*/}
                {/*<div className="flex items-center text-sm">*/}
                {/*    <Users className="mr-2 h-4 w-4 text-muted-foreground" />*/}
                {/*    <span>{attendees} attendees</span>*/}
                {/*</div>*/}
                <div className="pt-2">
                    <Button size="sm" variant="outline" className="w-full">
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

function StatusBadge({ status }: { status: "upcoming" | "ongoing" | "completed" }) {
    if (status === "ongoing") {
        return <Badge className="bg-green-500">Ongoing</Badge>
    } else if (status === "completed") {
        return (
            <Badge variant="outline" className="text-muted-foreground">
                Completed
            </Badge>
        )
    }
    return <Badge className="bg-primary">Upcoming</Badge>
}

function formatEventDate(startIso: string, endIso: string) {
    const start = new Date(startIso)
    const end = new Date(endIso)

    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
    }

    if (start.toDateString() === end.toDateString()) {
        return start.toLocaleDateString("en-US", options)
    }
    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`
}

function formatEventTime(startIso: string, endIso: string) {
    const start = new Date(startIso)
    const end = new Date(endIso)

    const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "Invalid Time"
    }

    return `${start.toLocaleTimeString("en-US", options)} - ${end.toLocaleTimeString("en-US", options)}`
}


