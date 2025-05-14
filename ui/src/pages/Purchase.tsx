"use client"

import { useState} from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, ArrowLeft, CreditCard} from "lucide-react"

// TypeScript interfaces
interface TicketType {
    type: string
    price: number
    availableTickets: number
}

interface Event {
    id: number
    title: string
    description: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    venue: string
    society: string
    status: string
    ticketTypes: TicketType[]
}

interface MerchEvent {
    id: number
    title: string
}

interface Merchandise {
    id: number
    name: string
    description: string
    price: number
    sizes: string[]
    availableUnits: number
    event?: MerchEvent
    imageUrl: string
}

interface PurchaseOption {
    type: string
    price: number
    available: number
}

// Mock data with type annotations
const mockEvents: Record<number, Event> = {
    1: {
        id: 1,
        title: "Tech Conference 2024",
        description: "Join us for a day of cutting-edge technology discussions and networking opportunities.",
        startDate: "2024-05-15",
        startTime: "09:00",
        endDate: "2024-05-15",
        endTime: "17:00",
        venue: "Main Auditorium",
        society: "Computing Society",
        status: "upcoming",
        ticketTypes: [
            { type: "Early Bird", price: 500, availableTickets: 50 },
            { type: "Regular", price: 750, availableTickets: 100 },
            { type: "VIP", price: 1500, availableTickets: 20 }
        ]
    },
    2: {
        id: 2,
        title: "Cultural Night",
        description: "Experience the rich cultural diversity through performances, food, and art.",
        startDate: "2024-05-20",
        startTime: "18:00",
        endDate: "2024-05-20",
        endTime: "22:00",
        venue: "Open Air Theater",
        society: "Cultural Society",
        status: "upcoming",
        ticketTypes: [
            { type: "Standard", price: 300, availableTickets: 200 },
            { type: "Premium", price: 500, availableTickets: 50 }
        ]
    }
}

const mockMerch: Record<number, Merchandise> = {
    1: {
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
    2: {
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
    3: {
        id: 3,
        name: "NUST Sweatshirt",
        description: "Classic NUST branded sweatshirt, perfect for any occasion.",
        price: 2000,
        sizes: ["S", "M", "L", "XL"],
        availableUnits: 75,
        imageUrl: "/placeholder-sweatshirt.jpg"
    }
}

export default function Purchase() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const type = searchParams.get("type") as "ticket" | "merch" | null
    const itemId = searchParams.get("itemId")
    const [selectedOption, setSelectedOption] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    const [quantity, setQuantity] = useState(1)
    
    const item = type === "ticket" 
        ? (itemId ? mockEvents[parseInt(itemId)] as Event | undefined : null)
        : (itemId ? mockMerch[parseInt(itemId)] as Merchandise | undefined : null)

    if (!item || !type) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
                    <Button onClick={() => navigate(type === "ticket" ? "/events/view" : "/merch")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to {type === "ticket" ? "Events" : "Merchandise"}
                    </Button>
                </div>
            </div>
        )
    }

    const options: PurchaseOption[] = type === "ticket" && 'ticketTypes' in item
        ? item.ticketTypes.map((t: TicketType) => ({ 
            type: t.type, 
            price: t.price, 
            available: t.availableTickets 
          }))
        : [{ 
            type: "Standard", 
            price: 'price' in item ? item.price : 0, 
            available: 'availableUnits' in item ? item.availableUnits : 0
          }]

    const selectedItem = type === "ticket"
        ? options.find(t => t.type === selectedOption)
        : options[0]

    const totalAmount = selectedItem ? selectedItem.price * quantity : 0

    const handlePurchase = () => {
        const purchaseData = {
            type,
            itemId,
            option: selectedOption,
            size: type === "merch" ? selectedSize : undefined,
            quantity,
            totalAmount
        }
        console.log("Purchase:", purchaseData)
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <Button 
                variant="outline" 
                onClick={() => navigate(type === "ticket" ? "/events/view" : "/merch")}
                className="mb-6"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {type === "ticket" ? "Events" : "Merchandise"}
            </Button>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {type === "ticket" && 'title' in item ? item.title : 
                             type === "merch" && 'name' in item ? item.name : ''}
                        </CardTitle>
                        <CardDescription>
                            {type === "ticket" && 'society' in item ? item.society : 
                             type === "merch" && 'event' in item ? item.event?.title || "NUST Merchandise" : ""}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{item.description}</p>
                        {type === "ticket" && 'startDate' in item ? (
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                                    <span>{item.startDate}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                                    <span>{item.startTime} - {item.endTime}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                                    <span>{item.venue}</span>
                                </div>
                            </div>
                        ) : type === "merch" && 'imageUrl' in item ? (
                            <div className="aspect-square relative">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.name}
                                    className="object-cover w-full h-full rounded-md"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = "https://via.placeholder.com/400?text=Merch+Image"
                                    }}
                                />
                            </div>
                        ) : null}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Purchase {type === "ticket" ? "Tickets" : "Merchandise"}</CardTitle>
                        <CardDescription>
                            Select your {type === "ticket" ? "ticket type" : "options"} and quantity
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {type === "ticket" && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Ticket Type</label>
                                <Select value={selectedOption} onValueChange={setSelectedOption}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ticket type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option, index) => (
                                            <SelectItem 
                                                key={index} 
                                                value={option.type}
                                                disabled={option.available === 0}
                                            >
                                                {option.type} - Rs. {option.price} 
                                                ({option.available} available)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {type === "merch" && 'sizes' in item && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Size</label>
                                <Select value={selectedSize} onValueChange={setSelectedSize}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {item.sizes.map((size: string) => (
                                            <SelectItem key={size} value={size}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Quantity</label>
                            <Input
                                type="number"
                                min={1}
                                max={type === "ticket" 
                                    ? selectedItem?.available 
                                    : ('availableUnits' in item ? item.availableUnits : 0)}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                        </div>

                        {selectedItem && (
                            <div className="rounded-lg bg-muted p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span>Price per {type === "ticket" ? "ticket" : "item"}:</span>
                                    <span>Rs. {selectedItem.price}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span>Quantity:</span>
                                    <span>{quantity}</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between items-center font-bold">
                                        <span>Total Amount:</span>
                                        <span>Rs. {totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button 
                            onClick={handlePurchase}
                            disabled={
                                (type === "ticket" && !selectedOption) || 
                                (type === "merch" && !selectedSize) || 
                                quantity < 1
                            }
                            className="w-full text-primary"
                        >
                            <CreditCard className="mr-2 h-4 w-4 text-primary" />
                            Proceed to Payment
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
} 