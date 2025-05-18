"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Calendar,
    Clock,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
    Edit,
    Eye,
    Users,
    ArrowUpDown,
} from "lucide-react"

export default function ManageEvents() {
    const navigate = useNavigate()
    const [events, setEvents] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [societyFilter, setSocietyFilter] = useState("all")
    const [sortField, setSortField] = useState("startDate")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/events")
                const now = new Date()
                const transformed = res.data.map((event: any) => {
                    const start = new Date(event.startTime)
                    const end = new Date(event.endTime)
                    let status: "upcoming" | "ongoing" | "completed" = "completed"
                    if (now < start) status = "upcoming"
                    else if (now >= start && now <= end) status = "ongoing"

                    return {
                        id: event.id,
                        title: event.title,
                        society: event.society?.socName || "Unknown",
                        startDate: start.toISOString(),
                        startTime: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        endDate: end.toISOString(),
                        endTime: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        venue: event.venue,
                        status,
                        registrations: event.totalRegistrations || 0,
                        ticketsSold: event.tickets?.reduce((sum: number, t: any) => sum + t.availableTickets, 0) || 0,
                        revenue: event.tickets?.reduce((sum: number, t: any) => sum + t.ticketPrice * t.availableTickets, 0) || 0,
                    }
                })
                setEvents(transformed)
            } catch (err) {
                console.error("Failed to load events", err)
            }
        }
        fetchEvents()
    }, [])

    const filteredEvents = events
        .filter((event) => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.venue.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = statusFilter === "all" || event.status === statusFilter
            const matchesSociety = societyFilter === "all" || event.society === societyFilter
            return matchesSearch && matchesStatus && matchesSociety
        })
        .sort((a, b) => {
            const fieldA = a[sortField as keyof typeof a]
            const fieldB = b[sortField as keyof typeof b]
            if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
            if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
            return 0
        })

    const societies = Array.from(new Set(events.map((event) => event.society)))

    const toggleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const handleDeleteEvent = () => {
        console.log(`Deleting event with ID: ${selectedEventId}`)
        setDeleteDialogOpen(false)
        setSelectedEventId(null)
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "upcoming": return <Badge className="bg-primary">Upcoming</Badge>
            case "ongoing": return <Badge className="bg-green-500">Ongoing</Badge>
            case "completed": return <Badge variant="outline" className="text-muted-foreground">Completed</Badge>
            case "cancelled": return <Badge variant="destructive">Cancelled</Badge>
            default: return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-5">Manage Events</h1>
                    <p className="text-muted-foreground">View, edit and manage all your events</p>
                </div>
                <Button onClick={() => navigate("/create-event")} className="bg-primary text-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Event
                </Button>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-col space-y-4 rounded-lg border bg-white p-4 shadow-sm md:flex-row md:items-center md:space-x-4 md:space-y-0">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search events..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-1 flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <Select value={societyFilter} onValueChange={setSocietyFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by society" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Societies</SelectItem>
                                {societies.map((society, index) => (
                                    <SelectItem key={index} value={society}>
                                        {society}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Events Table */}
            <div className="rounded-lg border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">
                                <div className="flex cursor-pointer items-center" onClick={() => toggleSort("title")}>
                                    Event Title
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex cursor-pointer items-center" onClick={() => toggleSort("society")}>
                                    Society
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex cursor-pointer items-center" onClick={() => toggleSort("startDate")}>
                                    Date
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </div>
                            </TableHead>
                            <TableHead>Venue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                <div
                                    className="flex cursor-pointer items-center justify-end"
                                    onClick={() => toggleSort("registrations")}
                                >
                                    Registrations
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </div>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>{event.society}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          {formatDate(event.startDate)}
                      </span>
                                            <span className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                                                {event.startTime}
                      </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{event.venue}</TableCell>
                                    <TableCell>{getStatusBadge(event.status)}</TableCell>
                                    <TableCell className="text-right">{event.registrations}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => navigate(`/events/${event.id}`)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate(`/events/${event.id}/edit`)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Event
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate(`/events/${event.id}/registrations`)}>
                                                    <Users className="mr-2 h-4 w-4" />
                                                    Manage Registrations
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => {
                                                        setSelectedEventId(event.id)
                                                        setDeleteDialogOpen(true)
                                                    }}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete Event
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No events found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm">
                    Previous
                </Button>
                <Button variant="outline" size="sm">
                    Next
                </Button>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this event? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteEvent}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
