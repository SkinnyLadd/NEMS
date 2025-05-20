"use client"

import {useEffect, useState} from "react"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Search, ShoppingCart, Filter} from "lucide-react"
import {useNavigate} from "react-router-dom"
import axios from "axios" // make sure you have this installed

interface MerchItem {
    id: number
    merchName: string
    merchDescription: string
    merchPurchaseable: boolean
    totalUnits: number
    availableUnits: number
    merchType: string
    merchSize: string
    eventId?: number
    // You can also include event title if needed in the DTO later
}

function MerchCard({item}: { item: MerchItem }) {
    const navigate = useNavigate()

    const handleBuyMerch = () => {
        navigate(`/purchase?type=merch&itemId=${item.id}`)
    }

    return (
        <Card className="overflow-hidden">
            <div className="aspect-square relative">
                <img
                    src={`/merch-images/${item.id}.jpg`} // dynamic image logic (adjust as needed)
                    alt={item.merchName}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://via.placeholder.com/400?text=Merch+Image"
                    }}
                />
            </div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{item.merchName}</CardTitle>
                        <CardDescription
                            className="mt-2">{item.merchPurchaseable ? "Available for Purchase" : "Not Purchaseable"}</CardDescription>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {item.availableUnits} available
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{item.merchDescription}</p>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleBuyMerch}
                    className="w-full text-primary"
                    disabled={!item.merchPurchaseable}
                >
                    <ShoppingCart className="mr-2 h-4 w-4"/>
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function BuyMerch() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("all")
    const [merch, setMerch] = useState<MerchItem[]>([])

    useEffect(() => {
        axios.get<MerchItem[]>("http://localhost:8080/api/merch")
            .then((response) => {
                // Map event object to eventId
                const mapped = response.data.map(item => ({
                    ...item,
                    eventId: item.event?.id ?? undefined
                }))
                setMerch(mapped)
            })
            .catch((error) => {
                console.error("Error fetching merch:", error)
            })
    }, [])
    const filteredMerch = merch.filter(item => {
        const matchesSearch =
            item.merchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.merchDescription.toLowerCase().includes(searchTerm.toLowerCase())

        if (filter === "all") return matchesSearch
        if (filter === "event") return matchesSearch && item.eventId
        if (filter === "general") return matchesSearch && !item.eventId
        return matchesSearch
    })

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Merchandise</h1>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search merchandise..."
                            className="pl-10 w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[150px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Items</SelectItem>
                            <SelectItem value="event">Event Merchandise</SelectItem>
                            <SelectItem value="general">General Merchandise</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMerch.map(item => (
                    <MerchCard key={item.id} item={item} />
                ))}
            </div>

            {filteredMerch.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    No merchandise found matching your criteria.
                </div>
            )}
        </div>
    )
}
