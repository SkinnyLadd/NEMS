"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download } from "lucide-react"

interface Transaction {
    id: number
    userId: number
    transDate: string
    amount: number
    transType: string
    paymentMethod: string
    item: string
    majorEvent: string
    price: number
    quantity: number
    status: string
    type: string
}

function TransactionStatusBadge({ status }: { status: string }) {
    switch (status.toLowerCase()) {
        case "completed":
        case "purchase": // treat purchase as completed for display
            return <Badge className="bg-green-500">Completed</Badge>
        case "pending":
            return <Badge className="bg-yellow-500">Pending</Badge>
        case "cancelled":
            return <Badge variant="destructive">Cancelled</Badge>
        case "refunded":
            return <Badge className="bg-blue-500">Refunded</Badge>
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export default function TicketingPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/transactions")
                setTransactions(res.data)
            } catch (err) {
                console.error("Failed to fetch transactions", err)
            }
        }
        fetchTransactions()
    }, [])

    const filtered = transactions.filter(tx => {
        const matchType = activeTab === "all" || tx.type === activeTab
        const matchStatus = statusFilter === "all" || tx.status.toLowerCase() === statusFilter.toLowerCase()

        const itemLower = tx.item?.toLowerCase() || ""
        const majorEventLower = tx.majorEvent?.toLowerCase() || ""
        const searchLower = searchTerm.toLowerCase()

        const matchSearch = itemLower.includes(searchLower) || majorEventLower.includes(searchLower)
        return matchType && matchStatus && matchSearch
    })

    return (
        <main className="flex flex-col p-6 gap-6">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
                    <TabsTrigger value="event">Event Tickets</TabsTrigger>
                    <TabsTrigger value="module">Module Registrations</TabsTrigger>
                </TabsList>

                <Card>
                    <CardHeader>
                        <CardTitle>{activeTab[0].toUpperCase() + activeTab.slice(1)} Transactions</CardTitle>
                        <CardDescription>Manage all {activeTab} transactions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status: All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="purchase">Purchase</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                    <SelectItem value="refunded">Refunded</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Major Event</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(tx => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.id}</TableCell>
                                        <TableCell>{tx.item}</TableCell>
                                        <TableCell>{tx.majorEvent}</TableCell>
                                        <TableCell>Rs. {tx.price}</TableCell>
                                        <TableCell>{tx.quantity}</TableCell>
                                        <TableCell>{tx.transDate}</TableCell>
                                        <TableCell><TransactionStatusBadge status={tx.status} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Tabs>
        </main>
    )
}
