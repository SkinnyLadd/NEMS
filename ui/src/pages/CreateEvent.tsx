"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, MapPin, Tag, Plus, Trash2 } from "lucide-react"
import Logo from "@/assets/NEMSlogo.svg"

// Date picker components
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calender"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function CreateEvent() {
    const navigate = useNavigate()
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        society: "",
        venue: "",
        ticketTypes: [{ type: "GENERAL", price: "", quantity: "" }],
        modules: [{ name: "", description: "", venue: "", startTime: "", endTime: "" }],
        organizers: [{ userId: "", portfolio: "", role: "" }],
    })

    // For date picker
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setEventData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setEventData((prev) => ({ ...prev, [name]: value }))
    }

    const handleTicketChange = (index: number, field: string, value: string) => {
        const updatedTickets = [...eventData.ticketTypes]
        updatedTickets[index] = { ...updatedTickets[index], [field]: value }
        setEventData((prev) => ({ ...prev, ticketTypes: updatedTickets }))
    }

    const addTicketType = () => {
        setEventData((prev) => ({
            ...prev,
            ticketTypes: [...prev.ticketTypes, { type: "GENERAL", price: "", quantity: "" }],
        }))
    }

    const removeTicketType = (index: number) => {
        const updatedTickets = [...eventData.ticketTypes]
        updatedTickets.splice(index, 1)
        setEventData((prev) => ({ ...prev, ticketTypes: updatedTickets }))
    }

    const handleModuleChange = (index: number, field: string, value: string) => {
        const updatedModules = [...eventData.modules]
        updatedModules[index] = { ...updatedModules[index], [field]: value }
        setEventData((prev) => ({ ...prev, modules: updatedModules }))
    }

    const addModule = () => {
        setEventData((prev) => ({
            ...prev,
            modules: [...prev.modules, { name: "", description: "", venue: "", startTime: "", endTime: "" }],
        }))
    }

    const removeModule = (index: number) => {
        const updatedModules = [...eventData.modules]
        updatedModules.splice(index, 1)
        setEventData((prev) => ({ ...prev, modules: updatedModules }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Event data:", eventData)
        // Navigate to events page after creation
        navigate("/dashboard")
    }

    return (
        <div className="min-h-screen w-250 bg-primary/5 py-8">
            <div className="mx-auto w-full max-w-4xl px-6">
                <div className="mb-8 flex flex-col items-center">
                    <img src={Logo || "/placeholder.svg"} alt="NEMS Logo" className="mb-4 h-16 w-16" />
                    <h1 className="text-3xl font-bold text-primary">Create New Event</h1>
                    <p className="mt-2 text-center text-gray-600">Fill in the details to create a new event</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Event Information */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Event Information</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Event Title *
                                </label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter event title"
                                    className="h-10"
                                    value={eventData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter event description"
                                    className="min-h-[100px]"
                                    value={eventData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="society" className="block text-sm font-medium text-gray-700">
                                        Organizing Society *
                                    </label>
                                    <Select onValueChange={(value) => handleSelectChange("society", value)} required>
                                        <SelectTrigger id="society" className="h-10">
                                            <SelectValue placeholder="Select Society" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">NUST Science Society</SelectItem>
                                            <SelectItem value="2">NUST Literary Circle</SelectItem>
                                            <SelectItem value="3">NUST Dramatics Club</SelectItem>
                                            <SelectItem value="4">NUST ACM Chapter</SelectItem>
                                            <SelectItem value="5">NUST Music Society</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                                        Main Venue
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="venue"
                                            name="venue"
                                            placeholder="Enter venue"
                                            className="h-10 pl-9"
                                            value={eventData.venue}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="h-10 w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                onSelect={(date) => {
                                                    setStartDate(date)
                                                    if (date) {
                                                        setEventData((prev) => ({
                                                            ...prev,
                                                            startDate: format(date, "yyyy-MM-dd"),
                                                        }))
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                                        Start Time *
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="startTime"
                                            name="startTime"
                                            type="time"
                                            className="h-10 pl-9"
                                            value={eventData.startTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">End Date *</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="h-10 w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                onSelect={(date) => {
                                                    setEndDate(date)
                                                    if (date) {
                                                        setEventData((prev) => ({
                                                            ...prev,
                                                            endDate: format(date, "yyyy-MM-dd"),
                                                        }))
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                                        End Time *
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="endTime"
                                            name="endTime"
                                            type="time"
                                            className="h-10 pl-9"
                                            value={eventData.endTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Information */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Ticket Information</h2>
                            <Button type="button" variant="outline" size="sm" onClick={addTicketType} className="flex items-center">
                                <Plus className="mr-1 h-4 w-4" />
                                Add Ticket Type
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {eventData.ticketTypes.map((ticket, index) => (
                                <div key={index} className="rounded-md border border-gray-200 p-4">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-700">Ticket Type #{index + 1}</h3>
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeTicketType(index)}
                                                className="h-8 w-8 p-0 text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Type</label>
                                            <Select
                                                defaultValue={ticket.type}
                                                onValueChange={(value) => handleTicketChange(index, "type", value)}
                                            >
                                                <SelectTrigger className="h-10">
                                                    <div className="flex items-center">
                                                        <Tag className="mr-2 h-4 w-4 text-gray-400" />
                                                        <SelectValue placeholder="Select Type" />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="GENERAL">General</SelectItem>
                                                    <SelectItem value="VIP">VIP</SelectItem>
                                                    <SelectItem value="EARLY_BIRD">Early Bird</SelectItem>
                                                    <SelectItem value="STUDENT">Student</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Price (PKR)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter price"
                                                className="h-10"
                                                value={ticket.price}
                                                onChange={(e) => handleTicketChange(index, "price", e.target.value)}
                                                min="0"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter quantity"
                                                className="h-10"
                                                value={ticket.quantity}
                                                onChange={(e) => handleTicketChange(index, "quantity", e.target.value)}
                                                min="1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modules */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Event Modules</h2>
                            <Button type="button" variant="outline" size="sm" onClick={addModule} className="flex items-center">
                                <Plus className="mr-1 h-4 w-4" />
                                Add Module
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {eventData.modules.map((module, index) => (
                                <div key={index} className="rounded-md border border-gray-200 p-4">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-700">Module #{index + 1}</h3>
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeModule(index)}
                                                className="h-8 w-8 p-0 text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Module Name</label>
                                            <Input
                                                placeholder="Enter module name"
                                                className="h-10"
                                                value={module.name}
                                                onChange={(e) => handleModuleChange(index, "name", e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <Textarea
                                                placeholder="Enter module description"
                                                className="min-h-[80px]"
                                                value={module.description}
                                                onChange={(e) => handleModuleChange(index, "description", e.target.value)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Venue</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        placeholder="Enter venue"
                                                        className="h-10 pl-9"
                                                        value={module.venue}
                                                        onChange={(e) => handleModuleChange(index, "venue", e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        type="time"
                                                        className="h-10 pl-9"
                                                        value={module.startTime}
                                                        onChange={(e) => handleModuleChange(index, "startTime", e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">End Time</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        type="time"
                                                        className="h-10 pl-9"
                                                        value={module.endTime}
                                                        onChange={(e) => handleModuleChange(index, "endTime", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" className="px-6" onClick={() => navigate("/dashboard")}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-primary px-6 text-primary hover:bg-primary/90">
                            Create Event
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
