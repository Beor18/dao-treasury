'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const mockProposals = [
  { id: 1, title: "Increase development fund by 10%", forVotes: 7500, againstVotes: 2500, totalVotes: 10000, status: "active" },
  { id: 2, title: "Fund new marketing campaign", forVotes: 6000, againstVotes: 4000, totalVotes: 10000, status: "active" },
  { id: 3, title: "Implement new governance model", forVotes: 8000, againstVotes: 2000, totalVotes: 10000, status: "ended" },
]

export function VotingSystem() {
  const [userVotingPower] = useState(100) // Mocked user voting power

  const handleVote = (proposalId, voteType) => {
    console.log(`Voted ${voteType} on proposal ${proposalId}`)
    // Implement actual voting logic here
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Active Proposals</h2>
      {mockProposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader>
            <CardTitle>{proposal.title}</CardTitle>
            <CardDescription>
              Total Votes: {proposal.totalVotes}
              <Badge className="ml-2" variant={proposal.status === 'active' ? 'default' : 'secondary'}>
                {proposal.status}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>For: {proposal.forVotes}</span>
                <span>Against: {proposal.againstVotes}</span>
              </div>
              <Progress value={(proposal.forVotes / proposal.totalVotes) * 100} />
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div>Your voting power: {userVotingPower}</div>
            <div>
              <Button onClick={() => handleVote(proposal.id, 'for')} className="mr-2" disabled={proposal.status !== 'active'}>
                Vote For
              </Button>
              <Button onClick={() => handleVote(proposal.id, 'against')} variant="outline" disabled={proposal.status !== 'active'}>
                Vote Against
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}