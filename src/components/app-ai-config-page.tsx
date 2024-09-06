/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialMetaPrompt = `You are an AI assistant responsible for managing a DAO treasury. Your primary goals are:
1. Evaluate fund requests based on their alignment with the DAO's objectives
2. Assess the risk and potential return of proposed investments
3. Ensure compliance with the DAO's governance rules
4. Provide data-driven insights to support decision-making

When analyzing a request or proposal, consider:
- The requester's reputation and past contributions to the DAO
- The potential impact on the DAO's long-term goals
- The current financial state of the treasury
- Recent community discussions and sentiment

Your recommendations should be clear, concise, and backed by data when possible. Always prioritize the long-term sustainability and growth of the DAO.`;

export function AppAiConfigPage() {
  const [metaPrompt, setMetaPrompt] = useState(initialMetaPrompt);
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [communityFocus, setCommunityFocus] = useState(true);
  const [dataWeight, setDataWeight] = useState(70);
  const [aiModel, setAiModel] = useState("gpt-4");

  const handleSave = () => {
    // Here you would typically send this configuration to your backend
    console.log({
      metaPrompt,
      riskTolerance,
      communityFocus,
      dataWeight,
      aiModel,
    });
    toast({
      title: "Configuration Saved",
      description: "The AI settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Configuration</h1>

      <Tabs defaultValue="meta-prompt">
        <TabsList>
          <TabsTrigger value="meta-prompt">Meta Prompt</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="model">Model Selection</TabsTrigger>
        </TabsList>

        <TabsContent value="meta-prompt">
          <Card>
            <CardHeader>
              <CardTitle>Meta Prompt Configuration</CardTitle>
              <CardDescription>
                Define the core behavior and goals of the AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="meta-prompt">Meta Prompt</Label>
                <Textarea
                  id="meta-prompt"
                  value={metaPrompt}
                  onChange={(e: any) => setMetaPrompt(e.target.value)}
                  rows={10}
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters">
          <Card>
            <CardHeader>
              <CardTitle>AI Parameters</CardTitle>
              <CardDescription>
                Adjust the AIs decision-making parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                <Slider
                  id="risk-tolerance"
                  min={0}
                  max={100}
                  step={1}
                  value={[riskTolerance]}
                  onValueChange={(value) => setRiskTolerance(value[0])}
                  className="bg-white"
                />
                <p className="text-sm text-muted-foreground">
                  Current: {riskTolerance}%
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="community-focus"
                  checked={communityFocus}
                  onCheckedChange={setCommunityFocus}
                />
                <Label htmlFor="community-focus">
                  Prioritize Community Sentiment
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-weight">
                  Weight of Data-Driven Decisions
                </Label>
                <Slider
                  id="data-weight"
                  min={0}
                  max={100}
                  step={1}
                  value={[dataWeight]}
                  onValueChange={(value) => setDataWeight(value[0])}
                  className="bg-white"
                />
                <p className="text-sm text-muted-foreground">
                  Current: {dataWeight}%
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Selection</CardTitle>
              <CardDescription>
                Choose the AI model to use for decision-making
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="ai-model">Select AI Model</Label>
                <select
                  id="ai-model"
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="gpt-4">GPT-4 (Most Capable)</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                  <option value="custom">Custom Model</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">
        Save Configuration
      </Button>
    </div>
  );
}
