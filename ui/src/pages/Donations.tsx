import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Heart, TrendingUp } from "lucide-react"

import axios from "axios"

interface Donation {
    id: number
    donor: {
        name: string
        regNo?: string
        type: "student" | "other"
    }
    event?: {
        id: number
        name: string
        society?: string
    } | null
    amount: number
    date: string
    message?: string
}

export default function Donations() {
    const [donations, setDonations] = useState<Donation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [eventFilter, setEventFilter] = useState("all")


    // Fetch donations from API endpoint
    useEffect(() => {
        async function fetchDonations() {
            try {
                setLoading(true)
                setError(null)

                const res = await axios.get<Donation[]>("http://localhost:8080/api/donations")
                setDonations(res.data)

            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || err.message)
                } else {
                    setError("An unknown error occurred")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchDonations()
    }, [])



    // Extract unique events for filter dropdown ("General" included)
    const eventNames = Array.from(
        new Set(
            Array.isArray(donations) ? donations.map(d => (d.event ? d.event.name : "General")) : []
        )
    )

    const safeDonations = Array.isArray(donations) ? donations : []

    // Filter donations by search and event
    const filteredDonations = safeDonations.filter(donation => {
        const lowerSearch = searchTerm.toLowerCase()
        const matchesSearch =
            donation.donor.name.toLowerCase().includes(lowerSearch) ||
            (donation.donor.regNo?.toLowerCase().includes(lowerSearch) ?? false) // ||
            // (donation.message?.toLowerCase().includes(lowerSearch) ?? false)

        const donationEventName = donation.event ? donation.event.name : "General"
        const matchesEvent = eventFilter === "all" || donationEventName === eventFilter

        return matchesSearch && matchesEvent
    })

    // Calculate stats
    const totalDonations = filteredDonations.reduce((sum, d) => sum + d.amount, 0)
    const averageDonation = totalDonations / filteredDonations.length || 0

    if (loading) return <div>Loading donations...</div>
    if (error) return <div className="text-red-600">Error: {error}</div>

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Donations</h1>
                    <p className="text-muted-foreground mt-1">
                        Track and manage event donations
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search donations..."
                            className="pl-10 w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Select value={eventFilter} onValueChange={setEventFilter}>
                        <SelectTrigger className="w-[200px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter by Event" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            {eventNames.map(eventName => (
                                <SelectItem key={eventName} value={eventName}>
                                    {eventName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Donations
                        </CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rs. {totalDonations.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            From {filteredDonations.length} donations
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Average Donation
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            Rs. {Math.round(averageDonation).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Per donation
                        </p>
                    </CardContent>
                </Card>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Donation History
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Donor</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead>Society</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                {/*<TableHead>Message</TableHead>*/}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDonations.map(donation => (
                                <TableRow key={donation.id}>
                                    <TableCell>
                                        <div>
                                            <div>{donation.donor.name}</div>
                                            {donation.donor.regNo && (
                                                <div className="text-sm text-muted-foreground">
                                                    Reg No: {donation.donor.regNo}
                                                </div>
                                            )}
                                            <div className="text-sm text-muted-foreground capitalize">
                                                {donation.donor.type}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{donation.event ? donation.event.name : "General"}</TableCell>
                                    <TableCell>{donation.event?.society || "-"}</TableCell>
                                    <TableCell>Rs. {donation.amount.toLocaleString()}</TableCell>
                                    <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                                    {/*<TableCell className="max-w-[200px] truncate">*/}
                                    {/*    {donation.message || "-"}*/}
                                    {/*</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredDonations.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No donations found matching your criteria.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
