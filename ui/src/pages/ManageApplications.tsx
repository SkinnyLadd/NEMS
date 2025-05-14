"use client"

import { useState } from "react"
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
    eventId: number
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
    status: "pending" | "accepted" | "rejected"
    appliedAt: string
}

// Mock data - replace with API call
const mockApplications: Application[] = [
    {
        id: 1,
        eventId: 3,
        eventTitle: "Computing Society Recruitment Drive 2024",
        applicant: {
            name: "Hassan Ali",
            email: "hassan.ali@example.com",
            regNo: "896723"
        },
        answers: [
            {
                questionId: 1,
                question: "What programming languages are you familiar with?",
                answer: "Python, JavaScript, Java"
            },
            {
                questionId: 2,
                question: "Why do you want to join the Computing Society? What can you contribute?",
                answer: "I am passionate about technology and want to collaborate with like-minded individuals. I have experience in web development and can help organize workshops."
            },
            {
                questionId: 3,
                question: "Which area of computing interests you the most?",
                answer: "Web Development"
            },
            {
                questionId: 4,
                question: "Describe any relevant projects or experiences you have in computing.",
                answer: "I have built several web applications using React and Node.js, including an e-commerce platform and a blog system."
            }
        ],
        status: "pending",
        appliedAt: "2024-03-20"
    },
    {
        id: 2,
        eventId: 3,
        eventTitle: "Computing Society Recruitment Drive 2024",
        applicant: {
            name: "Ayesha Khan",
            email: "ayesha.k@example.com",
            regNo: "354456"
        },
        answers: [
            {
                questionId: 1,
                question: "What programming languages are you familiar with?",
                answer: "C++, Python, TypeScript"
            },
            {
                questionId: 2,
                question: "Why do you want to join the Computing Society? What can you contribute?",
                answer: "I want to grow my technical skills and network with other tech enthusiasts. I can contribute to AI/ML projects and help with technical writing."
            },
            {
                questionId: 3,
                question: "Which area of computing interests you the most?",
                answer: "Artificial Intelligence"
            },
            {
                questionId: 4,
                question: "Describe any relevant projects or experiences you have in computing.",
                answer: "I have worked on machine learning projects including image classification and natural language processing."
            }
        ],
        status: "accepted",
        appliedAt: "2024-03-19"
    }
]

function StatusBadge({ status }: { status: Application["status"] }) {
    const variants = {
        pending: "bg-yellow-500",
        accepted: "bg-green-500",
        rejected: "bg-red-500"
    }
    
    return (
        <Badge className={`${variants[status]} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    )
}

export default function ManageApplications() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

    const filteredApplications = mockApplications.filter(application => {
        const matchesSearch = 
            application.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.applicant.regNo.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || application.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const handleViewApplication = (application: Application) => {
        setSelectedApplication(application)
    }

    const handleUpdateStatus = (applicationId: number, newStatus: Application["status"]) => {
        // Mock status update - replace with API call
        console.log("Updating application status:", { applicationId, newStatus })
        
        // Close dialog if open
        if (selectedApplication?.id === applicationId) {
            setSelectedApplication(null)
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Manage Applications</h1>
                    <p className="text-muted-foreground mt-1">
                        Review and manage society membership applications
                    </p>
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
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Registration No.</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead>Applied On</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplications.map(application => (
                                <TableRow key={application.id}>
                                    <TableCell>
                                        <div>
                                            <div>{application.applicant.name}</div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {application.applicant.email}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{application.applicant.regNo}</TableCell>
                                    <TableCell>{application.eventTitle}</TableCell>
                                    <TableCell>{application.appliedAt}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={application.status} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewApplication(application)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            {application.status === "pending" && (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-green-600"
                                                        onClick={() => handleUpdateStatus(application.id, "accepted")}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-600"
                                                        onClick={() => handleUpdateStatus(application.id, "rejected")}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredApplications.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No applications found matching your criteria.
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    {selectedApplication && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                    Submitted on {selectedApplication.appliedAt}
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Applicant Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-muted-foreground">Name</label>
                                            <div>{selectedApplication.applicant.name}</div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-muted-foreground">Registration No.</label>
                                            <div>{selectedApplication.applicant.regNo}</div>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="text-sm text-muted-foreground">Email</label>
                                            <div>{selectedApplication.applicant.email}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Application Responses</h3>
                                    <div className="space-y-6">
                                        {selectedApplication.answers.map(answer => (
                                            <div key={answer.questionId}>
                                                <label className="text-sm font-medium">
                                                    {answer.question}
                                                </label>
                                                <p className="mt-1 text-muted-foreground">
                                                    {answer.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {selectedApplication.status === "pending" && (
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button
                                            variant="outline"
                                            className="text-red-600"
                                            onClick={() => handleUpdateStatus(selectedApplication.id, "rejected")}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Reject
                                        </Button>
                                        <Button
                                            className="text-green-600"
                                            onClick={() => handleUpdateStatus(selectedApplication.id, "accepted")}
                                        >
                                            <Check className="mr-2 h-4 w-4" />
                                            Accept
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
} 