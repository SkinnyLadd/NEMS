"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

// Mock data for events
const mockEvents = [
    {
        id: 1,
        title: "Engineering Expo 2025",
        society: "NUST Science Society",
        startDate: "2025-05-10",
        startTime: "10:00",
        endDate: "2025-05-10",
        endTime: "16:00",
        venue: "Main Campus Hall",
        status: "upcoming",
        registrations: 245,
        ticketsSold: 245,
        revenue: 122500,
    },
    {
        id: 2,
        title: "NUST Sports Tournament",
        society: "NUST Sports Society",
        startDate: "2025-05-15",
        startTime: "09:00",
        endDate: "2025-05-18",
        endTime: "18:00",
        venue: "Sports Complex",
        status: "upcoming",
        registrations: 500,
        ticketsSold: 500,
        revenue: 250000,
    },
    {
        id: 3,
        title: "AI & Machine Learning Workshop",
        society: "NUST ACM Chapter",
        startDate: "2025-05-12",
        startTime: "14:00",
        endDate: "2025-05-12",
        endTime: "17:00",
        venue: "Computer Science Building",
        status: "upcoming",
        registrations: 120,
        ticketsSold: 120,
        revenue: 60000,
    },
    {
        id: 4,
        title: "Cultural Night 2025",
        society: "NUST Dramatics Club",
        startDate: "2025-05-20",
        startTime: "18:00",
        endDate: "2025-05-20",
        endTime: "22:00",
        venue: "Auditorium",
        status: "upcoming",
        registrations: 350,
        ticketsSold: 350,
        revenue: 175000,
    },
    {
        id: 5,
        title: "Spring Art Exhibition",
        society: "NUST Arts Society",
        startDate: "2025-05-01",
        startTime: "10:00",
        endDate: "2025-05-07",
        endTime: "18:00",
        venue: "Art Gallery",
        status: "ongoing",
        registrations: 120,
        ticketsSold: 120,
        revenue: 60000,
    },
    {
        id: 6,
        title: "Alumni Meetup",
        society: "NUST Alumni Association",
        startDate: "2025-04-28",
        startTime: "17:00",
        endDate: "2025-04-28",
        endTime: "20:00",
        venue: "Main Hall",
        status: "completed",
        registrations: 175,
        ticketsSold: 175,
        revenue: 87500,
    },
    {
        id: 7,
        title: "Hackathon 2025",
        society: "NUST ACM Chapter",
        startDate: "2025-04-25",
        startTime: "09:00",
        endDate: "2025-04-26",
        endTime: "21:00",
        venue: "IT Center",
        status: "completed",
        registrations: 120,
        ticketsSold: 120,
        revenue: 60000,
    },
]

export default function ManageEvents() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [societyFilter, setSocietyFilter] = useState("all")
    const [sortField, setSortField] = useState("startDate")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

    // Filter and sort events
    const filteredEvents = mockEvents
        .filter((event) => {
            // Search filter
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.venue.toLowerCase().includes(searchTerm.toLowerCase())

            // Status filter
            const matchesStatus = statusFilter === "all" || event.status === statusFilter

            // Society filter
            const matchesSociety = societyFilter === "all" || event.society === societyFilter

            return matchesSearch && matchesStatus && matchesSociety
        })
        .sort((a, b) => {
            // Sort by selected field
            const fieldA = a[sortField as keyof typeof a]
            const fieldB = b[sortField as keyof typeof b]

            if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
            if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
            return 0
        })

    // Get unique societies for filter
    const societies = Array.from(new Set(mockEvents.map((event) => event.society)))

    // Handle sort toggle
    const toggleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    // Handle delete event
    const handleDeleteEvent = () => {
        console.log(`Deleting event with ID: ${selectedEventId}`)
        // In a real app, you would make an API call here
        setDeleteDialogOpen(false)
        setSelectedEventId(null)
    }

    // Format date for display
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "upcoming":
                return <Badge className="bg-primary">Upcoming</Badge>
            case "ongoing":
                return <Badge className="bg-green-500">Ongoing</Badge>
            case "completed":
                return (
                    <Badge variant="outline" className="text-muted-foreground">
                        Completed
                    </Badge>
                )
            case "cancelled":
                return <Badge variant="destructive">Cancelled</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
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
