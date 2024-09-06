/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockSigners = [
  {
    id: 1,
    name: "Alice",
    avatar: "/placeholder.svg?height=40&width=40",
    hasSigned: true,
  },
  {
    id: 2,
    name: "Bob",
    avatar: "/placeholder.svg?height=40&width=40",
    hasSigned: false,
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "/placeholder.svg?height=40&width=40",
    hasSigned: false,
  },
];

export function MultisigTransaction() {
  const [signers, setSigners] = useState(mockSigners);
  const requiredSignatures = 2;
  const currentSignatures = signers.filter((signer) => signer.hasSigned).length;

  const handleSign = (signerId: any) => {
    setSigners(
      signers.map((signer) =>
        signer.id === signerId ? { ...signer, hasSigned: true } : signer
      )
    );
  };

  const handleExecute = () => {
    console.log("Executing multisig transaction");
    // Implement actual transaction execution logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multisig Transaction</CardTitle>
        <CardDescription>
          High-value transaction requiring multiple signatures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Transaction Details</h3>
            <p>Amount: 100,000 tokens</p>
            <p>Recipient: 0x1234...5678</p>
            <p>Purpose: Major infrastructure upgrade</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Required Signatures</h3>
            <p>
              {currentSignatures} of {requiredSignatures}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Signers</h3>
            <div className="flex space-x-2">
              {signers.map((signer) => (
                <div key={signer.id} className="text-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={signer.avatar} alt={signer.name} />
                    <AvatarFallback>{signer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm mt-1">{signer.name}</p>
                  <Badge
                    variant={signer.hasSigned ? "default" : "outline"}
                    className="mt-1"
                  >
                    {signer.hasSigned ? "Signed" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button onClick={() => handleSign(2)} disabled={signers[1].hasSigned}>
          Sign as Bob
        </Button>
        <Button
          onClick={handleExecute}
          disabled={currentSignatures < requiredSignatures}
        >
          Execute Transaction
        </Button>
      </CardFooter>
    </Card>
  );
}
