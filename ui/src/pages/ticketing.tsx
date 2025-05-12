"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    ShoppingBag,
    Ticket,
    Layers,
    Search,
    Filter,
    Download,
    Plus,
    Tag,
    ShoppingCart,
    CreditCard,
    MoreHorizontal,
} from "lucide-react"
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
    DialogTrigger,
} from "@/components/ui/dialog"

export default function TicketingPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("merchandise")

    return (
        <main className="flex flex-col p-6 gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">NEMS Ticketing</h1>
                    <p className="text-muted-foreground">Manage merchandise, event tickets, and module registrations</p>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New Transaction
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Create New Transaction</DialogTitle>
                                <DialogDescription>Add a new transaction for merchandise, events, or modules.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="transaction-type" className="text-right">
                                        Type
                                    </Label>
                                    <Select>
                                        <SelectTrigger id="transaction-type" className="col-span-3">
                                            <SelectValue placeholder="Select transaction type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="merchandise">Merchandise</SelectItem>
                                            <SelectItem value="event">Event Ticket</SelectItem>
                                            <SelectItem value="module">Module Registration</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="item" className="text-right">
                                        Item
                                    </Label>
                                    <Select>
                                        <SelectTrigger id="item" className="col-span-3">
                                            <SelectValue placeholder="Select item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="autoshow-hoodie">Autoshow Hoodie</SelectItem>
                                            <SelectItem value="tedx-shirt">TEDxNUST T-Shirt</SelectItem>
                                            <SelectItem value="concert-ticket">Concert Ticket</SelectItem>
                                            <SelectItem value="escape-room">Escape Room Module</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="quantity" className="text-right">
                                        Quantity
                                    </Label>
                                    <Input id="quantity" type="number" defaultValue="1" min="1" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="customer" className="text-right">
                                        Customer
                                    </Label>
                                    <Input id="customer" placeholder="Customer name or ID" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="payment-method" className="text-right">
                                        Payment
                                    </Label>
                                    <Select>
                                        <SelectTrigger id="payment-method" className="col-span-3">
                                            <SelectValue placeholder="Select payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                                            <SelectItem value="bank">Bank Transfer</SelectItem>
                                            <SelectItem value="easypaisa">Easypaisa</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Transaction</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Tabs defaultValue="merchandise" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="merchandise">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Merchandise
                    </TabsTrigger>
                    <TabsTrigger value="events">
                        <Ticket className="mr-2 h-4 w-4" />
                        Event Tickets
                    </TabsTrigger>
                    <TabsTrigger value="modules">
                        <Layers className="mr-2 h-4 w-4" />
                        Module Registrations
                    </TabsTrigger>
                </TabsList>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {activeTab === "merchandise" && "Merchandise Transactions"}
                            {activeTab === "events" && "Event Ticket Transactions"}
                            {activeTab === "modules" && "Module Registration Transactions"}
                        </CardTitle>
                        <CardDescription>
                            {activeTab === "merchandise" && "Manage merchandise sales for NUST events"}
                            {activeTab === "events" && "Manage ticket sales for concerts and performances"}
                            {activeTab === "modules" && "Manage registrations for event modules and activities"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search transactions..."
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Date Range</DropdownMenuItem>
                                        <DropdownMenuItem>Status</DropdownMenuItem>
                                        <DropdownMenuItem>Payment Method</DropdownMenuItem>
                                        {activeTab === "merchandise" && <DropdownMenuItem>Product Type</DropdownMenuItem>}
                                        {activeTab === "events" && <DropdownMenuItem>Event Type</DropdownMenuItem>}
                                        {activeTab === "modules" && <DropdownMenuItem>Module Type</DropdownMenuItem>}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Status: All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                        <SelectItem value="refunded">Refunded</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>

                            <TabsContent value="merchandise" className="mt-0">
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Transaction ID</TableHead>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Event</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {merchandiseTransactions.map((transaction) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell className="font-medium">{transaction.id}</TableCell>
                                                    <TableCell>{transaction.product}</TableCell>
                                                    <TableCell>{transaction.event}</TableCell>
                                                    <TableCell>Rs. {transaction.price}</TableCell>
                                                    <TableCell>{transaction.quantity}</TableCell>
                                                    <TableCell>{transaction.date}</TableCell>
                                                    <TableCell>
                                                        <TransactionStatusBadge status={transaction.status} />
                                                    </TableCell>
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
                                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                                <DropdownMenuItem>Edit Transaction</DropdownMenuItem>
                                                                <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-destructive">Cancel Transaction</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="events" className="mt-0">
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Transaction ID</TableHead>
                                                <TableHead>Event</TableHead>
                                                <TableHead>Major Event</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {eventTransactions.map((transaction) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell className="font-medium">{transaction.id}</TableCell>
                                                    <TableCell>{transaction.event}</TableCell>
                                                    <TableCell>{transaction.majorEvent}</TableCell>
                                                    <TableCell>Rs. {transaction.price}</TableCell>
                                                    <TableCell>{transaction.quantity}</TableCell>
                                                    <TableCell>{transaction.date}</TableCell>
                                                    <TableCell>
                                                        <TransactionStatusBadge status={transaction.status} />
                                                    </TableCell>
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
                                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                                <DropdownMenuItem>Edit Transaction</DropdownMenuItem>
                                                                <DropdownMenuItem>Print Ticket</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-destructive">Cancel Transaction</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="modules" className="mt-0">
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Transaction ID</TableHead>
                                                <TableHead>Module</TableHead>
                                                <TableHead>Major Event</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Participants</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {moduleTransactions.map((transaction) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell className="font-medium">{transaction.id}</TableCell>
                                                    <TableCell>{transaction.module}</TableCell>
                                                    <TableCell>{transaction.majorEvent}</TableCell>
                                                    <TableCell>Rs. {transaction.price}</TableCell>
                                                    <TableCell>{transaction.participants}</TableCell>
                                                    <TableCell>{transaction.date}</TableCell>
                                                    <TableCell>
                                                        <TransactionStatusBadge status={transaction.status} />
                                                    </TableCell>
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
                                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                                <DropdownMenuItem>Edit Registration</DropdownMenuItem>
                                                                <DropdownMenuItem>Print Registration</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-destructive">Cancel Registration</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <div className="flex items-center justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Summary</CardTitle>
                        <CardDescription>Overview of recent transactions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                                <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                                <div className="text-2xl font-bold">Rs. 125,500</div>
                                <div className="text-sm text-muted-foreground">Merchandise Sales</div>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                                <Ticket className="h-8 w-8 text-primary mb-2" />
                                <div className="text-2xl font-bold">Rs. 245,000</div>
                                <div className="text-sm text-muted-foreground">Event Tickets</div>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                                <Layers className="h-8 w-8 text-primary mb-2" />
                                <div className="text-2xl font-bold">Rs. 87,500</div>
                                <div className="text-sm text-muted-foreground">Module Registrations</div>
                            </div>
                        </div>
                        <div className="pt-2">
                            <h3 className="text-sm font-medium mb-2">Payment Methods</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="text-sm">Card Payments</span>
                                    </div>
                                    <div className="text-sm font-medium">45%</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <ShoppingCart className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="text-sm">Cash Payments</span>
                                    </div>
                                    <div className="text-sm font-medium">35%</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="text-sm">Other Methods</span>
                                    </div>
                                    <div className="text-sm font-medium">20%</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Popular Items</CardTitle>
                        <CardDescription>Most sold items and registrations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium mb-2">Top Merchandise</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">Autoshow 2025 Hoodie</div>
                                        <div className="text-sm font-medium">78 sold</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">TEDxNUST T-Shirt</div>
                                        <div className="text-sm font-medium">65 sold</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">Science Bee Sweatshirt</div>
                                        <div className="text-sm font-medium">42 sold</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-2">Top Events</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">Qawali Night (Literary Festival)</div>
                                        <div className="text-sm font-medium">320 tickets</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">Concert (EFX)</div>
                                        <div className="text-sm font-medium">285 tickets</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">Cultural Night (Science Bee)</div>
                                        <div className="text-sm font-medium">210 tickets</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-2">Top Modules</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">Escape Room (Science Bee)</div>
                                        <div className="text-sm font-medium">45 teams</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">Robowars (EFX)</div>
                                        <div className="text-sm font-medium">32 teams</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">Speed Programming (Science Bee)</div>
                                        <div className="text-sm font-medium">28 participants</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

function TransactionStatusBadge({ status }: { status: string }) {
    switch (status.toLowerCase()) {
        case "completed":
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

// Sample data for merchandise transactions
const merchandiseTransactions = [
    {
        id: "MERCH-001",
        product: "Autoshow Hoodie",
        event: "NUST Autoshow 2025",
        price: 2500,
        quantity: 2,
        date: "May 2, 2025",
        status: "completed",
    },
    {
        id: "MERCH-002",
        product: "TEDxNUST T-Shirt",
        event: "TEDxNUST 2025",
        price: 1200,
        quantity: 3,
        date: "May 3, 2025",
        status: "completed",
    },
    {
        id: "MERCH-003",
        product: "Science Bee Sweatshirt",
        event: "NUST Science Bee",
        price: 1800,
        quantity: 1,
        date: "May 4, 2025",
        status: "pending",
    },
    {
        id: "MERCH-004",
        product: "EFX Cap",
        event: "Engineering Festival X",
        price: 800,
        quantity: 5,
        date: "May 5, 2025",
        status: "completed",
    },
    {
        id: "MERCH-005",
        product: "Literary Festival Tote Bag",
        event: "NUST Literary Festival",
        price: 600,
        quantity: 4,
        date: "May 6, 2025",
        status: "cancelled",
    },
]

// Sample data for event transactions
const eventTransactions = [
    {
        id: "EVENT-001",
        event: "Qawali Night",
        majorEvent: "NUST Literary Festival",
        price: 1000,
        quantity: 4,
        date: "May 2, 2025",
        status: "completed",
    },
    {
        id: "EVENT-002",
        event: "Concert",
        majorEvent: "Engineering Festival X",
        price: 1500,
        quantity: 2,
        date: "May 3, 2025",
        status: "completed",
    },
    {
        id: "EVENT-003",
        event: "Cultural Night",
        majorEvent: "NUST Science Bee",
        price: 800,
        quantity: 3,
        date: "May 4, 2025",
        status: "pending",
    },
    {
        id: "EVENT-004",
        event: "Stand-up Comedy",
        majorEvent: "NUST Literary Festival",
        price: 1200,
        quantity: 2,
        date: "May 5, 2025",
        status: "completed",
    },
    {
        id: "EVENT-005",
        event: "DJ Night",
        majorEvent: "Engineering Festival X",
        price: 1000,
        quantity: 1,
        date: "May 6, 2025",
        status: "refunded",
    },
]

// Sample data for module transactions
const moduleTransactions = [
    {
        id: "MOD-001",
        module: "Escape Room",
        majorEvent: "NUST Science Bee",
        price: 1500,
        participants: "Team of 4",
        date: "May 2, 2025",
        status: "completed",
    },
    {
        id: "MOD-002",
        module: "Robowars",
        majorEvent: "Engineering Festival X",
        price: 2000,
        participants: "Team of 3",
        date: "May 3, 2025",
        status: "completed",
    },
    {
        id: "MOD-003",
        module: "Speed Programming",
        majorEvent: "NUST Science Bee",
        price: 800,
        participants: "Individual",
        date: "May 4, 2025",
        status: "pending",
    },
    {
        id: "MOD-004",
        module: "Mathematics Competition",
        majorEvent: "NUST Science Bee",
        price: 500,
        participants: "Individual",
        date: "May 5, 2025",
        status: "completed",
    },
    {
        id: "MOD-005",
        module: "Student Mushaira",
        majorEvent: "NUST Literary Festival",
        price: 300,
        participants: "Individual",
        date: "May 6, 2025",
        status: "cancelled",
    },
]
