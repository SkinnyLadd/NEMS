import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users} from "lucide-react"

export default function DashboardPage() {
    return (
        <main className="flex flex-col p-6 gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing Events</TabsTrigger>
                    <TabsTrigger value="recent">Recent Events</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <EventCard
                            title="Engineering Expo 2025"
                            date="May 10, 2025"
                            time="10:00 AM - 4:00 PM"
                            location="Main Campus Hall"
                            category="Academic"
                            attendees="245"
                        />
                        <EventCard
                            title="NUST Sports Tournament"
                            date="May 15-18, 2025"
                            time="9:00 AM - 6:00 PM"
                            location="Sports Complex"
                            category="Sports"
                            attendees="500+"
                        />
                        <EventCard
                            title="AI & Machine Learning Workshop"
                            date="May 12, 2025"
                            time="2:00 PM - 5:00 PM"
                            location="Computer Science Building"
                            category="Workshop"
                            attendees="120"
                        />
                        <EventCard
                            title="Cultural Night 2025"
                            date="May 20, 2025"
                            time="6:00 PM - 10:00 PM"
                            location="Auditorium"
                            category="Cultural"
                            attendees="350"
                        />
                        <EventCard
                            title="Career Fair"
                            date="May 25, 2025"
                            time="10:00 AM - 3:00 PM"
                            location="Business School"
                            category="Career"
                            attendees="400+"
                        />
                        <EventCard
                            title="Research Symposium"
                            date="May 28, 2025"
                            time="9:00 AM - 4:00 PM"
                            location="Research Center"
                            category="Academic"
                            attendees="180"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="ongoing" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <EventCard
                            title="Spring Art Exhibition"
                            date="May 1-7, 2025"
                            time="10:00 AM - 6:00 PM"
                            location="Art Gallery"
                            category="Cultural"
                            attendees="120/day"
                            status="ongoing"
                        />
                        <EventCard
                            title="Robotics Competition"
                            date="May 3-5, 2025"
                            time="9:00 AM - 8:00 PM"
                            location="Engineering Block"
                            category="Technical"
                            attendees="200"
                            status="ongoing"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="recent" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <EventCard
                            title="Alumni Meetup"
                            date="April 28, 2025"
                            time="5:00 PM - 8:00 PM"
                            location="Main Hall"
                            category="Networking"
                            attendees="175"
                            status="completed"
                        />
                        <EventCard
                            title="Hackathon 2025"
                            date="April 25-26, 2025"
                            time="9:00 AM - 9:00 PM"
                            location="IT Center"
                            category="Technical"
                            attendees="120"
                            status="completed"
                        />
                        <EventCard
                            title="Guest Lecture: Future of AI"
                            date="April 22, 2025"
                            time="2:00 PM - 4:00 PM"
                            location="Auditorium"
                            category="Academic"
                            attendees="300"
                            status="completed"
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    )
}

interface EventCardProps {
    title: string
    date: string
    time: string
    location: string
    category: string
    attendees: string
    status?: "upcoming" | "ongoing" | "completed"
}

function EventCard({ title, date, time, location, category, attendees, status = "upcoming" }: EventCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <StatusBadge status={status} />
                </div>
                <CardDescription>{category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{time}</span>
                </div>
                <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{attendees} attendees</span>
                </div>
                <div className="pt-2">
                    <Button size="sm" variant="outline" className="w-full">
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

function StatusBadge({ status }: { status: "upcoming" | "ongoing" | "completed" }) {
    if (status === "ongoing") {
        return <Badge className="bg-green-500">Ongoing</Badge>
    } else if (status === "completed") {
        return (
            <Badge variant="outline" className="text-muted-foreground">
                Completed
            </Badge>
        )
    }
    return <Badge className="bg-primary">Upcoming</Badge>
}
