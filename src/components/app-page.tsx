/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiggyBank, Users, FileText, TrendingUp } from "lucide-react";

export function AppPage({
  treasurySummary,
  mockRequests,
  mockProposals,
  mockReputationData,
}: any) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Treasury Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${treasurySummary.totalBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{treasurySummary.balanceChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treasurySummary.pendingRequests}
            </div>
            <p className="text-xs text-muted-foreground">
              +{treasurySummary.requestsChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Proposals
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treasurySummary.activeProposals}
            </div>
            <p className="text-xs text-muted-foreground">
              +{treasurySummary.proposalsChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treasurySummary.activeMembers}
            </div>
            <p className="text-xs text-muted-foreground">
              +{treasurySummary.membersChange} since last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Fund Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Fund Requests</CardTitle>
          <CardDescription>
            Latest requests for DAO treasury funds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRequests.map((request: any) => (
              <div key={request.id} className="flex items-center">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {request.purpose}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {request.amount.toLocaleString()} tokens •{" "}
                    {request.recipient}
                  </p>
                </div>
                <Badge
                  variant={
                    request.status === "approved"
                      ? "default"
                      : request.status === "denied"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Votings */}
      <Card>
        <CardHeader>
          <CardTitle>Active Votings</CardTitle>
          <CardDescription>
            Ongoing proposals and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProposals.map((proposal: any) => (
              <div key={proposal.id} className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{proposal.title}</p>
                  <Badge
                    variant={
                      proposal.status === "active" ? "secondary" : "outline"
                    }
                  >
                    {proposal.status}
                  </Badge>
                </div>
                <Progress
                  value={(proposal.forVotes / proposal.totalVotes) * 100}
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    For:{" "}
                    {((proposal.forVotes / proposal.totalVotes) * 100).toFixed(
                      1
                    )}
                    %
                  </span>
                  <span>
                    Against:{" "}
                    {(
                      (proposal.againstVotes / proposal.totalVotes) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
          <CardDescription>
            Members with the highest reputation scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReputationData.map((user: any) => (
              <div key={user.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Reputation: {user.reputation} • {user.level}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="outline">{user.level}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
