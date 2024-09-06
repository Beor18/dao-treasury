/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

// Mocked data
const treasuryBalance = 1234567;
const tokenPrice = 2.5;

const mockRequests = [
  {
    id: 1,
    amount: 50000,
    recipient: "0x1234...5678",
    purpose: "Marketing Campaign",
    status: "pending",
    createdAt: "2023-06-01",
    risk: "low",
  },
  {
    id: 2,
    amount: 75000,
    recipient: "0x8765...4321",
    purpose: "Product Development",
    status: "approved",
    createdAt: "2023-05-28",
    risk: "medium",
  },
  {
    id: 3,
    amount: 30000,
    recipient: "0x2468...1357",
    purpose: "Community Event",
    status: "denied",
    createdAt: "2023-05-25",
    risk: "high",
  },
  {
    id: 4,
    amount: 100000,
    recipient: "0x1357...2468",
    purpose: "Security Audit",
    status: "pending",
    createdAt: "2023-06-02",
    risk: "low",
  },
];

const mockTransactions = [
  {
    id: 1,
    type: "Deposit",
    amount: 100000,
    from: "0xabcd...ef12",
    to: "Treasury",
    date: "2023-06-01",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: 50000,
    from: "Treasury",
    to: "0x1234...5678",
    date: "2023-05-30",
  },
  {
    id: 3,
    type: "Deposit",
    amount: 75000,
    from: "0x9876...54321",
    to: "Treasury",
    date: "2023-05-29",
  },
  {
    id: 4,
    type: "Withdrawal",
    amount: 25000,
    from: "Treasury",
    to: "0x2468...1357",
    date: "2023-05-28",
  },
];

const mockBalanceHistory = [
  { date: "2023-01", balance: 500000 },
  { date: "2023-02", balance: 750000 },
  { date: "2023-03", balance: 900000 },
  { date: "2023-04", balance: 1100000 },
  { date: "2023-05", balance: 1300000 },
  { date: "2023-06", balance: treasuryBalance },
];

export function AppTreasuryPage() {
  const [activeRequest, setActiveRequest] = useState<any>(null);

  const handleApprove = (id: any) => {
    console.log(`Approving request ${id}`);
    // Implement actual approval logic here
  };

  const handleDeny = (id: any) => {
    console.log(`Denying request ${id}`);
    // Implement actual denial logic here
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Treasury Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Treasury Overview</CardTitle>
          <CardDescription>
            Current balance and token information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Current Balance</p>
              <p className="text-3xl font-bold">
                {treasuryBalance.toLocaleString()} tokens
              </p>
              <p className="text-sm text-muted-foreground">
                ≈ ${(treasuryBalance * tokenPrice).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Token Price</p>
              <p className="text-3xl font-bold">${tokenPrice.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Balance History</CardTitle>
          <CardDescription>Treasury balance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockBalanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="balance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">Fund Requests</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Fund Requests</CardTitle>
              <CardDescription>Manage and review fund requests</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {mockRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-medium">{request.purpose}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.amount.toLocaleString()} tokens •{" "}
                        {request.recipient}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveRequest(request)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest treasury transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {mockTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.amount.toLocaleString()} tokens
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        {transaction.from} → {transaction.to}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {activeRequest && (
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Review and make a decision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Purpose</Label>
                <p>{activeRequest.purpose}</p>
              </div>
              <div>
                <Label>Amount</Label>
                <p>{activeRequest.amount.toLocaleString()} tokens</p>
              </div>
              <div>
                <Label>Recipient</Label>
                <p>{activeRequest.recipient}</p>
              </div>
              <div>
                <Label>Created At</Label>
                <p>{activeRequest.createdAt}</p>
              </div>
              <div>
                <Label>Risk Assessment</Label>
                <div className="flex items-center space-x-2">
                  {activeRequest.risk === "low" && (
                    <CheckCircle2 className="text-green-500" />
                  )}
                  {activeRequest.risk === "medium" && (
                    <AlertTriangle className="text-yellow-500" />
                  )}
                  {activeRequest.risk === "high" && (
                    <XCircle className="text-red-500" />
                  )}
                  <span className="capitalize">{activeRequest.risk} risk</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button
              variant="destructive"
              onClick={() => handleDeny(activeRequest.id)}
            >
              Deny Request
            </Button>
            <Button onClick={() => handleApprove(activeRequest.id)}>
              Approve Request
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
