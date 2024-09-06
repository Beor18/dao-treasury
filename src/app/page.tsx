import { AppPage } from "@/components/app-page";

// Mocked data
const treasurySummary = {
  totalBalance: 1234567,
  balanceChange: 20.1,
  pendingRequests: 23,
  requestsChange: 180.1,
  activeProposals: 12,
  proposalsChange: 19,
  activeMembers: 573,
  membersChange: 201,
};

const mockRequests = [
  {
    id: 1,
    amount: 50000,
    recipient: "0x1234...5678",
    purpose: "Marketing Campaign",
    status: "pending",
    createdAt: "2023-06-01",
  },
  {
    id: 2,
    amount: 75000,
    recipient: "0x8765...4321",
    purpose: "Product Development",
    status: "approved",
    createdAt: "2023-05-28",
  },
  {
    id: 3,
    amount: 30000,
    recipient: "0x2468...1357",
    purpose: "Community Event",
    status: "denied",
    createdAt: "2023-05-25",
  },
  {
    id: 4,
    amount: 100000,
    recipient: "0x1357...2468",
    purpose: "Security Audit",
    status: "pending",
    createdAt: "2023-06-02",
  },
];

const mockProposals = [
  {
    id: 1,
    title: "Increase development fund by 10%",
    forVotes: 750000,
    againstVotes: 250000,
    totalVotes: 1000000,
    status: "active",
  },
  {
    id: 2,
    title: "Fund new marketing campaign",
    forVotes: 600000,
    againstVotes: 400000,
    totalVotes: 1000000,
    status: "active",
  },
  {
    id: 3,
    title: "Implement new governance model",
    forVotes: 800000,
    againstVotes: 200000,
    totalVotes: 1000000,
    status: "ended",
  },
];

const mockReputationData = [
  {
    id: 1,
    name: "Alice",
    avatar: "/placeholder.svg?height=40&width=40",
    reputation: 950,
    level: "Gold",
    recentActivity: "Proposed successful marketing campaign",
  },
  {
    id: 2,
    name: "Bob",
    avatar: "/placeholder.svg?height=40&width=40",
    reputation: 720,
    level: "Silver",
    recentActivity: "Voted on 5 proposals",
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "/placeholder.svg?height=40&width=40",
    reputation: 510,
    level: "Bronze",
    recentActivity: "Contributed to development",
  },
];

export default function Home() {
  return (
    <AppPage
      treasurySummary={treasurySummary}
      mockRequests={mockRequests}
      mockProposals={mockProposals}
      mockReputationData={mockReputationData}
    />
  );
}
