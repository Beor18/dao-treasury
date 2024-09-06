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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock } from "lucide-react";

// Mocked data
const mockProposals = [
  {
    id: 1,
    title: "Increase development fund by 10%",
    description:
      "Allocate an additional 10% of treasury funds to the development team for the next quarter.",
    forVotes: 750000,
    againstVotes: 250000,
    totalVotes: 1000000,
    status: "active",
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "0x1234...5678",
  },
  {
    id: 2,
    title: "Fund new marketing campaign",
    description:
      "Approve 50,000 tokens for a new marketing initiative targeting DeFi users.",
    forVotes: 600000,
    againstVotes: 400000,
    totalVotes: 1000000,
    status: "active",
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "0x8765...4321",
  },
  {
    id: 3,
    title: "Implement new governance model",
    description:
      "Transition to a delegated voting system to improve participation and decision-making efficiency.",
    forVotes: 800000,
    againstVotes: 200000,
    totalVotes: 1000000,
    status: "ended",
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "0xabcd...ef01",
  },
  {
    id: 4,
    title: "Reduce token emission rate",
    description:
      "Decrease the current token emission rate by 15% to control inflation.",
    forVotes: 550000,
    againstVotes: 450000,
    totalVotes: 1000000,
    status: "active",
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "0x2468...1357",
  },
  {
    id: 5,
    title: "Expand to new blockchain",
    description:
      "Propose expansion of the DAO to a new blockchain ecosystem for increased interoperability.",
    forVotes: 700000,
    againstVotes: 300000,
    totalVotes: 1000000,
    status: "active",
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "0x1357...2468",
  },
  {
    id: 6,
    title: "Increase staking rewards",
    description:
      "Propose a 5% increase in staking rewards to incentivize long-term token holding.",
    forVotes: 600000,
    againstVotes: 400000,
    totalVotes: 1000000,
    status: "ended",
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creator: "0x2468...1357",
  },
];

const userVotingPower = 10000; // Mocked user voting power

export function AppVotingPage() {
  const [, setActiveProposal] = useState(null);
  const [voteAmount, setVoteAmount] = useState(0);
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
  });
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);

  const handleVote = (proposalId: number, support: boolean) => {
    console.log(
      `Voting ${
        support ? "for" : "against"
      } proposal ${proposalId} with ${voteAmount} tokens`
    );
    toast({
      title: "Vote Submitted",
      description: `You have voted ${
        support ? "for" : "against"
      } the proposal with ${voteAmount} tokens.`,
    });
    setVoteAmount(0);
    setActiveProposal(null);
    setIsVoteModalOpen(false);
  };

  const handleCreateProposal = () => {
    console.log("Creating new proposal:", newProposal);
    toast({
      title: "Proposal Created",
      description: "Your new proposal has been submitted for voting.",
    });
    setNewProposal({ title: "", description: "" });
  };

  const ProposalCard = ({ proposal, showVoteButton = false }: any) => (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{proposal.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {proposal.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">
            For: {((proposal.forVotes / proposal.totalVotes) * 100).toFixed(1)}%
          </span>
          <span className="text-sm">
            Against:{" "}
            {((proposal.againstVotes / proposal.totalVotes) * 100).toFixed(1)}%
          </span>
        </div>
        <Progress
          value={(proposal.forVotes / proposal.totalVotes) * 100}
          className="h-2"
        />
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Total Votes: {proposal.totalVotes.toLocaleString()}
          </span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span className="text-xs text-muted-foreground">
              {proposal.status === "active" ? "Ends" : "Ended"}:{" "}
              {new Date(proposal.endTime).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      {showVoteButton && (
        <CardFooter>
          <Dialog open={isVoteModalOpen} onOpenChange={setIsVoteModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full"
                onClick={() => setActiveProposal(proposal)}
              >
                Vote
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Vote on Proposal</DialogTitle>
                <DialogDescription>{proposal.title}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="mb-4">{proposal.description}</p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="vote-amount">Voting Power</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="vote-amount"
                        max={userVotingPower}
                        step={1}
                        value={[voteAmount]}
                        onValueChange={(value) => setVoteAmount(value[0])}
                      />
                      <span>
                        {voteAmount} / {userVotingPower}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleVote(proposal.id, false)}
                >
                  Vote Against
                </Button>
                <Button onClick={() => handleVote(proposal.id, true)}>
                  Vote For
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Voting</h1>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Proposals</TabsTrigger>
          <TabsTrigger value="ended">Ended Proposals</TabsTrigger>
          <TabsTrigger value="create">Create Proposal</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProposals
              .filter((p) => p.status === "active")
              .map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  showVoteButton={true}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ended">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProposals
              .filter((p) => p.status === "ended")
              .map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Proposal</CardTitle>
              <CardDescription>
                Submit a new proposal for the community to vote on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateProposal();
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="proposal-title">Proposal Title</Label>
                  <Input
                    id="proposal-title"
                    value={newProposal.title}
                    onChange={(e) =>
                      setNewProposal({ ...newProposal, title: e.target.value })
                    }
                    placeholder="Enter the title of your proposal"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal-description">
                    Proposal Description
                  </Label>
                  <textarea
                    id="proposal-description"
                    value={newProposal.description}
                    onChange={(e) =>
                      setNewProposal({
                        ...newProposal,
                        description: e.target.value,
                      })
                    }
                    placeholder="Provide a detailed description of your proposal"
                    className="w-full h-32 p-2 border rounded"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Proposal
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
