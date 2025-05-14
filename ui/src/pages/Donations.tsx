import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Heart, TrendingUp } from "lucide-react"

interface Donation {
    id: number
    donor: {
        name: string
        regNo?: string
        type: "student" | "alumni" | "other"
    }
    society: string
    amount: number
    date: string
    message?: string
}

// Mock data - replace with API call
const mockDonations: Donation[] = [
    {
        id: 1,
        donor: {
            name: "Ahmed Khan",
            regNo: "123456",
            type: "student"
        },
        society: "Computing Society",
        amount: 5000,
        date: "2024-03-15",
        message: "Keep up the great work!"
    },
    {
        id: 2,
        donor: {
            name: "Sara Ali",
            type: "alumni"
        },
        society: "Cultural Society",
        amount: 10000,
        date: "2024-03-10",
        message: "Supporting cultural activities"
    },
    {
        id: 3,
        donor: {
            name: "Anonymous",
            type: "other"
        },
        society: "Computing Society",
        amount: 15000,
        date: "2024-03-05"
    }
]

export default function Donations() {
    const [searchTerm, setSearchTerm] = useState("")
    const [societyFilter, setSocietyFilter] = useState("all")

    const filteredDonations = mockDonations.filter(donation => {
        const matchesSearch = 
            donation.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ((donation.donor.regNo?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (donation.message?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false))

        const matchesSociety = societyFilter === "all" || donation.society === societyFilter

        return matchesSearch && matchesSociety
    })

    // Calculate statistics
    const totalDonations = filteredDonations.reduce((sum, d) => sum + d.amount, 0)
    const averageDonation = totalDonations / filteredDonations.length || 0
    const societies = Array.from(new Set(mockDonations.map(d => d.society)))

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Donations</h1>
                    <p className="text-muted-foreground mt-1">
                        Track and manage society donations
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
                    <Select value={societyFilter} onValueChange={setSocietyFilter}>
                        <SelectTrigger className="w-[200px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter by Society" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Societies</SelectItem>
                            {societies.map(society => (
                                <SelectItem key={society} value={society}>
                                    {society}
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
                                <TableHead>Society</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Message</TableHead>
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
                                    <TableCell>{donation.society}</TableCell>
                                    <TableCell>Rs. {donation.amount.toLocaleString()}</TableCell>
                                    <TableCell>{donation.date}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        {donation.message || "-"}
                                    </TableCell>
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