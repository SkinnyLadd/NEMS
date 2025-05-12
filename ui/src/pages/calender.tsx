"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calender.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, List, CalendarDays } from "lucide-react"



export default function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [view, setView] = useState<"month" | "day" | "list">("month")

    return (
        <main className="flex flex-col p-6 gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Event Calendar</h1>
                    <p className="text-muted-foreground">Browse all campus events in calendar view</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setView("list")}>
                        <List className="h-4 w-4 mr-2" />
                        List
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setView("day")}>
                        <CalendarDays className="h-4 w-4 mr-2" />
                        Day
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setView("month")}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Month
                    </Button>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter Events" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="workshop">Workshops</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>
                        {date ? date.toLocaleString("default", { month: "long", year: "numeric" }) : "Calendar"}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                if (date) {
                                    const newDate = new Date(date)
                                    newDate.setMonth(date.getMonth() - 1)
                                    setDate(newDate)
                                }
                            }}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                if (date) {
                                    const newDate = new Date(date)
                                    newDate.setMonth(date.getMonth() + 1)
                                    setDate(newDate)
                                }
                            }}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                            Today
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {view === "month" && (
                        <div className="p-3">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"

                            />
                        </div>
                    )}

                    {view === "day" && date && (
                        <div className="space-y-4 p-4">
                            <h3 className="font-medium text-lg">
                                {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                            </h3>

                            <div className="space-y-2">
                                {getDayEvents(date).length > 0 ? (
                                    getDayEvents(date).map((event, i) => (
                                        <div key={i} className="flex items-start p-3 rounded-md border">
                                            <div className="flex flex-col items-center mr-4 text-center">
                                                <div className="text-sm font-medium">{event.time}</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{event.name}</div>
                                                <div className="text-sm text-muted-foreground">{event.location}</div>
                                                <div className="mt-1">
                                                    <Badge className={getCategoryBadgeColor(event.category)}>{event.category}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">No events scheduled for this day</div>
                                )}
                            </div>
                        </div>
                    )}

                    {view === "list" && (
                        <div className="space-y-4 p-4">
                            <div className="space-y-4">
                                {Object.entries(groupEventsByDate()).map(([dateStr, events]) => (
                                    <div key={dateStr} className="space-y-2">
                                        <h3 className="font-medium text-lg">{dateStr}</h3>
                                        {events.map((event, i) => (
                                            <div key={i} className="flex items-start p-3 rounded-md border">
                                                <div className="flex flex-col items-center mr-4 text-center">
                                                    <div className="text-sm font-medium">{event.time}</div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">{event.name}</div>
                                                    <div className="text-sm text-muted-foreground">{event.location}</div>
                                                    <div className="mt-1">
                                                        <Badge className={getCategoryBadgeColor(event.category)}>{event.category}</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    )
}


function getCategoryBadgeColor(category: string) {
    switch (category.toLowerCase()) {
        case "academic":
            return "bg-blue-500 hover:bg-blue-500"
        case "sports":
            return "bg-green-500 hover:bg-green-500"
        case "cultural":
            return "bg-purple-500 hover:bg-purple-500"
        case "workshop":
            return "bg-yellow-500 hover:bg-yellow-500"
        case "career":
            return "bg-orange-500 hover:bg-orange-500"
        case "technical":
            return "bg-cyan-500 hover:bg-cyan-500"
        default:
            return ""
    }
}

function getDayEvents(date: Date) {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return calendarEvents.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
    })
}

function groupEventsByDate() {
    const grouped: Record<string, typeof calendarEvents> = {}

    calendarEvents.forEach((event) => {
        const date = new Date(event.date)
        const dateStr = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

        if (!grouped[dateStr]) {
            grouped[dateStr] = []
        }

        grouped[dateStr].push(event)
    })

    return grouped
}

// Sample calendar events data
const calendarEvents = [
    {
        name: "Engineering Expo 2025",
        date: "2025-05-10",
        time: "10:00 AM",
        location: "Main Campus Hall",
        category: "Academic",
    },
    {
        name: "NUST Sports Tournament",
        date: "2025-05-15",
        time: "9:00 AM",
        location: "Sports Complex",
        category: "Sports",
    },
    {
        name: "AI & Machine Learning Workshop",
        date: "2025-05-12",
        time: "2:00 PM",
        location: "Computer Science Building",
        category: "Workshop",
    },
    {
        name: "Cultural Night 2025",
        date: "2025-05-20",
        time: "6:00 PM",
        location: "Auditorium",
        category: "Cultural",
    },
    {
        name: "Career Fair",
        date: "2025-05-25",
        time: "10:00 AM",
        location: "Business School",
        category: "Career",
    },
    {
        name: "Research Symposium",
        date: "2025-05-28",
        time: "9:00 AM",
        location: "Research Center",
        category: "Academic",
    },
    {
        name: "Spring Art Exhibition",
        date: "2025-05-05",
        time: "10:00 AM",
        location: "Art Gallery",
        category: "Cultural",
    },
    {
        name: "Robotics Competition",
        date: "2025-05-03",
        time: "9:00 AM",
        location: "Engineering Block",
        category: "Technical",
    },
    {
        name: "Guest Lecture: Future of AI",
        date: "2025-05-22",
        time: "2:00 PM",
        location: "Auditorium",
        category: "Academic",
    },

]

