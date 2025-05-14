"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Filter } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface MerchItem {
    id: number
    name: string
    description: string
    price: number
    sizes: string[]
    availableUnits: number
    event?: {
        id: number
        title: string
    }
    imageUrl: string
}

// Mock data - replace with API call
const mockMerch: MerchItem[] = [
    {
        id: 1,
        name: "Tech Conference Hoodie",
        description: "Premium quality hoodie with the Tech Conference 2024 logo.",
        price: 2500,
        sizes: ["S", "M", "L", "XL"],
        availableUnits: 100,
        event: {
            id: 1,
            title: "Tech Conference 2024"
        },
        imageUrl: "/placeholder-hoodie.jpg"
    },
    {
        id: 2,
        name: "Cultural Night T-Shirt",
        description: "Comfortable cotton t-shirt featuring Cultural Night artwork.",
        price: 1200,
        sizes: ["S", "M", "L", "XL", "XXL"],
        availableUnits: 150,
        event: {
            id: 2,
            title: "Cultural Night"
        },
        imageUrl: "/placeholder-tshirt.jpg"
    },
    {
        id: 3,
        name: "NUST Sweatshirt",
        description: "Classic NUST branded sweatshirt, perfect for any occasion.",
        price: 2000,
        sizes: ["S", "M", "L", "XL"],
        availableUnits: 75,
        imageUrl: "/placeholder-sweatshirt.jpg"
    }
]

function MerchCard({ item }: { item: MerchItem }) {
    const navigate = useNavigate()

    const handleBuyMerch = () => {
        navigate(`/purchase?type=merch&itemId=${item.id}`)
    }

    return (
        <Card className="overflow-hidden">
            <div className="aspect-square relative">
                <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://via.placeholder.com/400?text=Merch+Image"
                    }}
                />
                {item.event && (
                    <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-full text-sm">
                        {item.event.title}
                    </div>
                )}
            </div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                        <CardDescription className="mt-2">Rs. {item.price}</CardDescription>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {item.availableUnits} available
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
            <CardFooter>
                <Button 
                    onClick={handleBuyMerch}
                    className="w-full text-primary"
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function BuyMerch() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("all")

    const filteredMerch = mockMerch.filter(item => {
        const matchesSearch = 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.event?.title.toLowerCase() || "").includes(searchTerm.toLowerCase())

        if (filter === "all") return matchesSearch
        if (filter === "event") return matchesSearch && item.event
        if (filter === "general") return matchesSearch && !item.event
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