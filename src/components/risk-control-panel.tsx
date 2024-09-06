'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RiskControlPanel() {
  const [maxAutomaticApproval, setMaxAutomaticApproval] = useState(1000)
  const [riskThreshold, setRiskThreshold] = useState(50)
  const [automaticApprovalEnabled, setAutomaticApprovalEnabled] = useState(true)

  const handleSave = () => {
    console.log("Saving risk control settings:", { maxAutomaticApproval, riskThreshold, automaticApprovalEnabled })
    // Implement actual saving logic here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Control Settings</CardTitle>
        <CardDescription>Adjust parameters for automatic request approval</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium">Maximum Automatic Approval Amount</label>
          <Slider
            value={[maxAutomaticApproval]}
            onValueChange={(value) => setMaxAutomaticApproval(value[0])}
            max={5000}
            step={100}
          />
          <span className="text-sm text-gray-500">{maxAutomaticApproval} tokens</span>
        </div>
        <div>
          <label className="text-sm font-medium">Risk Threshold</label>
          <Slider
            value={[riskThreshold]}
            onValueChange={(value) => setRiskThreshold(value[0])}
            max={100}
            step={1}
          />
          <span className="text-sm text-gray-500">{riskThreshold}%</span>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Enable Automatic Approval</label>
          <Switch
            checked={automaticApprovalEnabled}
            onCheckedChange={setAutomaticApprovalEnabled}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardFooter>
    </Card>
  )
}