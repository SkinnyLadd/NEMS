"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Mail, Users } from "lucide-react"

interface Member {
    id: number
    name: string
    email: string
    societies: string[]
    role: "member" | "executive" | "president"
    joinDate: string
    status: "active" | "inactive"
}

function RoleBadge({ role }: { role: Member["role"] }) {
    const variants = {
        president: "bg-purple-500",
        executive: "bg-blue-500",
        member: "bg-green-500"
    }

    return (
        <Badge className={`${variants[role]} text-white`}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
    )
}

function StatusBadge({ status }: { status: Member["status"] }) {
    const variants = {
        active: "bg-green-500",
        inactive: "bg-gray-500"
    }

    return (
        <Badge className={`${variants[status]} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    )
}

export default function Members() {
    const [members, setMembers] = useState<Member[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [societyFilter, setSocietyFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/members")
                setMembers(res.data)
            } catch (err) {
                console.error("Failed to fetch members", err)
            }
        }
        fetchMembers()
    }, [])

    const societies = Array.from(new Set(members.flatMap(member => member.societies)))

    const filteredMembers = members.filter(member => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.societies.some(society =>
                society.toLowerCase().includes(searchTerm.toLowerCase())
            )

        const matchesSociety = societyFilter === "all" ||
            member.societies.includes(societyFilter)

        const matchesRole = roleFilter === "all" ||
            member.role === roleFilter

        return matchesSearch && matchesSociety && matchesRole
    })

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Society Members</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and view all society members
                    </p>
                </div>

                <div className="flex gap-4 ml-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search members..."
                            className="pl-10 w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={societyFilter} onValueChange={setSocietyFilter}>
                        <SelectTrigger className="w-[200px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter by Society" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Societies</SelectItem>
                            {societies.map(society => (
                                <SelectItem key={society} value={society}>
                                    {society}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[150px]">
                            <Users className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter by Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="president">President</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Member List
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Societies</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMembers.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        {member.email}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {member.societies.map(society => (
                                                <Badge key={society} variant="outline">
                                                    {society}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <RoleBadge role={member.role} />
                                    </TableCell>
                                    <TableCell>{member.joinDate}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={member.status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredMembers.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No members found matching your criteria.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
