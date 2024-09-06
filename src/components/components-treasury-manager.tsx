"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, XCircle } from "lucide-react";

interface Request {
  id: number;
  amount: number;
  recipient: string;
  purpose: string;
  status: "pending" | "approved" | "denied";
  createdAt: string;
}

interface TreasuryManagerProps {
  requests: Request[];
}

export function TreasuryManager({ requests }: TreasuryManagerProps) {
  const [activeRequest, setActiveRequest] = React.useState<Request | null>(
    null
  );

  const handleApprove = (id: number) => {
    console.log(`Approving request ${id}`);
    // Implement actual approval logic here
  };

  const handleDeny = (id: number) => {
    console.log(`Denying request ${id}`);
    // Implement actual denial logic here
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Fund Requests</CardTitle>
          <CardDescription>Review and manage incoming requests</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {requests.map((request) => (
              <Button
                key={request.id}
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => setActiveRequest(request)}
              >
                <div className="flex justify-between items-center w-full">
                  <span>
                    Request #{request.id} - {request.amount.toLocaleString()}{" "}
                    tokens
                  </span>
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
              </Button>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>
            Review and make decisions on fund requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeRequest ? (
            <div className="space-y-4">
              <div>
                <strong>ID:</strong> {activeRequest.id}
              </div>
              <div>
                <strong>Amount:</strong> {activeRequest.amount.toLocaleString()}{" "}
                tokens
              </div>
              <div>
                <strong>Recipient:</strong> {activeRequest.recipient}
              </div>
              <div>
                <strong>Purpose:</strong> {activeRequest.purpose}
              </div>
              <div>
                <strong>Status:</strong> {activeRequest.status}
              </div>
              <div>
                <strong>Created At:</strong> {activeRequest.createdAt}
              </div>
            </div>
          ) : (
            <p>Select a request to view details</p>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <Button
            onClick={() => activeRequest && handleApprove(activeRequest.id)}
            disabled={!activeRequest || activeRequest.status !== "pending"}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
          </Button>
          <Button
            onClick={() => activeRequest && handleDeny(activeRequest.id)}
            variant="destructive"
            disabled={!activeRequest || activeRequest.status !== "pending"}
          >
            <XCircle className="mr-2 h-4 w-4" /> Deny
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
