"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, Mail, Users, Check, X, Eye } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface Application {
    id: number
    eventTitle: string
    applicant: {
        name: string
        email: string
        regNo: string
    }
    answers: {
        questionId: number
        question: string
        answer: string
    }[]
    status: "PENDING" | "APPROVED" | "REJECTED"
    appliedAt: string
}

function StatusBadge({ status }: { status: Application["status"] }) {
    const variants = {
        PENDING: "bg-yellow-500",
        APPROVED: "bg-green-500",
        REJECTED: "bg-red-500"
    }

    return (
        <Badge className={`${variants[status]} text-white`}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    )
}

export default function ManageApplications() {
    const [applications, setApplications] = useState<Application[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:8080/api/applications")
            setApplications(res.data)
        }
        fetchData()
    }, [])

    const filteredApplications = applications.filter(application => {
        const matchesSearch =
            application.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.applicant.regNo.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || application.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleUpdateStatus = async (id: number, newStatus: Application["status"]) => {
        await axios.put(`http://localhost:8080/api/applications/${id}/status`, { status: newStatus })
        setApplications(prev =>
            prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
        )
        setSelectedApplication(null)
    }

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Filters */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Manage Applications</h1>
                    <p className="text-muted-foreground">Review and manage applications</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search applications..."
                            className="pl-10 w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[150px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="APPROVED">Accepted</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" /> Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Reg No</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead>Applied On</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplications.map(app => (
                                <TableRow key={app.id}>
                                    <TableCell>
                                        <div>{app.applicant.name}</div>
                                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Mail className="h-3 w-3" /> {app.applicant.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>{app.applicant.regNo}</TableCell>
                                    <TableCell>{app.eventTitle}</TableCell>
                                    <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                                    <TableCell><StatusBadge status={app.status} /></TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        <Button variant="outline" size="sm" onClick={() => setSelectedApplication(app)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        {app.status === "PENDING" && (
                                            <>
                                                <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(app.id, "APPROVED")} className="text-green-600">
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(app.id, "REJECTED")} className="text-red-600">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialog */}
            <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
                <DialogContent className="max-w-2xl">
                    {selectedApplication && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                    Submitted on {new Date(selectedApplication.appliedAt).toLocaleDateString()} at{" "}
                                    {new Date(selectedApplication.appliedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </DialogDescription>

                            </DialogHeader>
                            <div className="space-y-6">
                                <h3 className="font-semibold text-lg">Applicant Info</h3>
                                <p><strong>Name:</strong> {selectedApplication.applicant.name}</p>
                                <p><strong>Email:</strong> {selectedApplication.applicant.email}</p>
                                <p><strong>Reg No:</strong> {selectedApplication.applicant.regNo}</p>

                                <h3 className="font-semibold text-lg mt-4">Answers</h3>
                                <div className="space-y-4">
                                    {selectedApplication.answers.map(a => (
                                        <div key={a.questionId}>
                                            <label className="font-medium">{a.question}</label>
                                            <p className="text-muted-foreground">{a.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
