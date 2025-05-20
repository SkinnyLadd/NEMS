"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
import { List, CalendarDays, Calendar } from "lucide-react"

import axios from "axios"
import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function CalendarComponent({
                                      className,
                                      classNames,
                                      showOutsideDays = false,
                                      ...props
                                  }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            numberOfMonths={1}
            className={cn("p-3", className)}
            classNames={{
                head: "hidden",
                head_row: "hidden",
                nav: "hidden",
                caption: "hidden",
                caption_label: "hidden",
                months: "flex flex-col",
                month: "space-y-4",
                table: "w-full border-collapse space-y-1",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                day: cn(
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                    "hover:bg-accent hover:text-accent-foreground rounded-md"
                ),
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "border border-primary",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            {...props}
        />
    )
}

export interface Event {
    id: number
    title: string
    description: string
    startTime: string
    endTime: string
    societyId: number
}

export default function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [view, setView] = useState<"month" | "day" | "list">("month")
    const [calendarEvents, setCalendarEvents] = useState<Event[]>([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/events")
            .then((res) => {
                setCalendarEvents(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <main className="flex flex-col p-6 gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Event Calendar</h1>
                    <p className="text-muted-foreground">Browse all campus events in calendar view</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="ml-5" onClick={() => setView("list")}>
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
                </div>
            </div>

            <Card>
                <CardContent>
                    {view === "month" && (
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-semibold text-center">Monthly Calendar</h3>
                            <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-lg border shadow"
                                showOutsideDays={false}
                            />
                        </div>
                    )}

                    {view === "day" && date && (
                        <div className="space-y-4 p-4">
                            <h3 className="font-medium text-lg">
                                {date.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </h3>

                            <div className="space-y-2">
                                {getDayEvents(date, calendarEvents).length > 0 ? (
                                    getDayEvents(date, calendarEvents).map((event, i) => (
                                        <div key={i} className="flex items-start p-3 rounded-md border">
                                            <div className="flex flex-col items-center mr-4 text-center">
                                                <div className="text-sm font-medium">
                                                    {new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{event.title}</div>
                                                <div className="text-sm text-muted-foreground">{event.description}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No events scheduled for this day
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {view === "list" && (
                        <div className="space-y-4 p-4">
                            <div className="space-y-4">
                                {Object.entries(groupEventsByDate(calendarEvents)).map(([dateStr, events]) => (
                                    <div key={dateStr} className="space-y-2">
                                        <h3 className="font-medium text-lg">{dateStr}</h3>
                                        {events.map((event, i) => (
                                            <div key={i} className="flex items-start p-3 rounded-md border">
                                                <div className="flex flex-col items-center mr-4 text-center">
                                                    <div className="text-sm font-medium">
                                                        {new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">{event.title}</div>
                                                    <div className="text-sm text-muted-foreground">{event.description}</div>
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

// Helper functions

function getDayEvents(date: Date, calendarEvents: Event[]) {
    return calendarEvents.filter((event) => {
        const eventDate = new Date(event.startTime)
        return (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
        )
    })
}

function groupEventsByDate(calendarEvents: Event[]) {
    const grouped: Record<string, Event[]> = {}

    calendarEvents.forEach((event) => {
        const date = new Date(event.startTime)
        const dateStr = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        })

        if (!grouped[dateStr]) {
            grouped[dateStr] = []
        }

        grouped[dateStr].push(event)
    })

    return grouped
}