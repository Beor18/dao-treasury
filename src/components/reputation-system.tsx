'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mockUsers = [
  { id: 1, name: "Alice", avatar: "/placeholder.svg?height=40&width=40", reputation: 950, level: "Gold", recentActivity: "Proposed successful marketing campaign" },
  { id: 2, name: "Bob", avatar: "/placeholder.svg?height=40&width=40", reputation: 720, level: "Silver", recentActivity: "Voted on 5 proposals" },
  { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=40&width=40", reputation: 510, level: "Bronze", recentActivity: "Contributed to development" },
]

export function ReputationSystem() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Reputation</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Recent Activity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
            </TableCell>
            <TableCell>{user.reputation}</TableCell>
            <TableCell>
              <Badge variant={user.level === 'Gold' ? 'default' : user.level === 'Silver' ? 'secondary' : 'outline'}>
                {user.level}
              </Badge>
            </TableCell>
            <TableCell>{user.recentActivity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}