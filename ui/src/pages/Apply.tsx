"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

interface Question {
    id: number
    type: "text" | "longtext" | "choice"
    question: string
    required: boolean
    choices?: string[]
}

// Mock data - replace with API call
const mockQuestions: Record<string, Question[]> = {
    "Computing Society": [
        {
            id: 1,
            type: "text",
            question: "What programming languages are you familiar with?",
            required: true
        },
        {
            id: 2,
            type: "longtext",
            question: "Why do you want to join the Computing Society? What can you contribute?",
            required: true
        },
        {
            id: 3,
            type: "choice",
            question: "Which area of computing interests you the most?",
            required: true,
            choices: [
                "Software Development",
                "Artificial Intelligence",
                "Cybersecurity",
                "Web Development",
                "Game Development",
                "Other"
            ]
        },
        {
            id: 4,
            type: "longtext",
            question: "Describe any relevant projects or experiences you have in computing.",
            required: false
        }
    ]
}

export default function Apply() {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const [answers, setAnswers] = useState<Record<number, string>>({})

    // Mock event data - replace with API call
    const event = {
        id: Number(eventId),
        title: "Computing Society Recruitment Drive 2024",
        society: "Computing Society",
        description: "Join the Computing Society! We're looking for passionate individuals interested in technology, programming, and innovation."
    }

    const questions = mockQuestions[event.society] || []

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }))
    }

    const handleSubmit = () => {
        // Validate required questions
        const unansweredRequired = questions
            .filter(q => q.required)
            .some(q => !answers[q.id] || answers[q.id].trim() === "")

        if (unansweredRequired) {
            alert("Please answer all required questions")
            return
        }

        // Mock submission - replace with API call
        console.log("Submitting application:", {
            eventId,
            society: event.society,
            answers
        })

        // Navigate to confirmation page or dashboard
        navigate("/dashboard")
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <Button 
                variant="outline" 
                onClick={() => navigate("/events/view")}
                className="mb-6"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    <CardDescription className="text-lg">{event.society}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{event.description}</p>

                    <div className="space-y-8">
                        {questions.map(question => (
                            <div key={question.id} className="space-y-2">
                                <label className="text-sm font-medium flex gap-1">
                                    {question.question}
                                    {question.required && (
                                        <span className="text-red-500">*</span>
                                    )}
                                </label>
                                
                                {question.type === "text" && (
                                    <Input
                                        value={answers[question.id] || ""}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        placeholder="Your answer"
                                    />
                                )}

                                {question.type === "longtext" && (
                                    <Textarea
                                        value={answers[question.id] || ""}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        placeholder="Your answer"
                                        className="min-h-[100px]"
                                    />
                                )}

                                {question.type === "choice" && question.choices && (
                                    <Select
                                        value={answers[question.id] || ""}
                                        onValueChange={(value) => handleAnswerChange(question.id, value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {question.choices.map(choice => (
                                                <SelectItem key={choice} value={choice}>
                                                    {choice}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => navigate("/events/view")}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="text-primary">
                        Submit Application
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
} 