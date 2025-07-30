import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Bot, Settings, Zap, Edit3, Save } from 'lucide-react';

interface AgentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ open, onOpenChange }) => {
  const agentDetails = {
    name: "Sales Assistant Agent",
    description: `Specialized AI agent for lead qualification and customer engagement within Zoho CRM. 
    
This agent is designed to handle initial customer inquiries, qualify leads based on predefined criteria, and schedule appropriate follow-up activities. It integrates seamlessly with Zoho CRM modules and can access customer data to provide personalized responses.

Key capabilities include:
- Lead scoring and qualification
- Automated follow-up scheduling  
- Customer inquiry routing
- Basic customer support
- Integration with email and phone systems`,
    model: "GPT-4o Mini",
    role: "Lead Qualification Specialist",
    instructions: `You are a professional sales assistant working within Zoho CRM. Your primary responsibilities include:

1. Lead Qualification:
   - Ask qualifying questions to understand prospect needs
   - Score leads based on budget, authority, need, and timeline (BANT)
   - Update lead status and scores in CRM

2. Customer Engagement:
   - Respond to inquiries within 2 minutes during business hours
   - Provide helpful information about products/services
   - Schedule meetings with appropriate sales representatives

3. Guidelines:
   - Always maintain a professional and helpful tone
   - Ask for permission before updating customer records
   - Escalate complex issues to human agents
   - Follow data privacy and compliance requirements

4. Integration Rules:
   - Update CRM records after each interaction
   - Create tasks for follow-up activities
   - Send notifications to relevant team members`,
    conditions: `Activation Conditions:
- New lead enters the system
- Customer submits contact form
- Email inquiry received during business hours
- Phone call missed or requires follow-up
- Lead score changes significantly

Business Rules:
- Only activate during business hours (9 AM - 6 PM EST)
- Require human approval for deals over $10,000
- Automatically escalate after 3 unsuccessful contact attempts
- Respect do-not-contact preferences`
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            Agent Detail View
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Basic Information
                <Badge variant="secondary" className="ml-auto">Editable</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    <Bot className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input 
                      id="agent-name"
                      defaultValue={agentDetails.name}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="agent-description">Agent Description</Label>
                    <Textarea 
                      id="agent-description"
                      defaultValue={agentDetails.description}
                      rows={6}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model & Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Model Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="model-select">Model</Label>
                  <Select defaultValue={agentDetails.model}>
                    <SelectTrigger id="model-select" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GPT-4o Mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="GPT-4o">GPT-4o</SelectItem>
                      <SelectItem value="Claude-3 Sonnet">Claude-3 Sonnet</SelectItem>
                      <SelectItem value="Claude-3 Haiku">Claude-3 Haiku</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="agent-role">Agent Resource Role</Label>
                  <Input 
                    id="agent-role"
                    defaultValue={agentDetails.role}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bot className="h-4 w-4" />
                  Test Agent
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Export Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Zap className="h-4 w-4" />
                  Duplicate Agent
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-orange-600" />
                Agent Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="agent-instructions">Detailed Instructions</Label>
              <Textarea 
                id="agent-instructions"
                defaultValue={agentDetails.instructions}
                rows={12}
                className="mt-1 font-mono text-sm"
                placeholder="Enter detailed instructions for your agent..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                Define how your agent should behave, what it should do, and any specific guidelines it should follow.
              </p>
            </CardContent>
          </Card>

          {/* Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-red-600" />
                Activation Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="agent-conditions">Conditions & Business Rules</Label>
              <Textarea 
                id="agent-conditions"
                defaultValue={agentDetails.conditions}
                rows={8}
                className="mt-1 font-mono text-sm"
                placeholder="Define when and how your agent should be activated..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                Specify the conditions under which your agent should activate and any business rules it should follow.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};