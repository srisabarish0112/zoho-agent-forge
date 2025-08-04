import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Zap, Users, DollarSign, Mail, Phone, Calendar, FileText } from 'lucide-react';

export const AgentSignals = () => {
  const [customSignal, setCustomSignal] = useState('');
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);

  const modules = [
    {
      name: 'Leads',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      signals: [
        { id: 'lead_created', name: 'Lead Created', description: 'Trigger when a new lead is added' },
        { id: 'lead_edited', name: 'Lead Edited', description: 'Trigger when lead information is updated' },
        { id: 'lead_qualified', name: 'Lead Qualified', description: 'Trigger when lead status changes to qualified' },
        { id: 'lead_converted', name: 'Lead Converted', description: 'Trigger when lead is converted to deal' }
      ]
    },
    {
      name: 'Contacts',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      signals: [
        { id: 'contact_created', name: 'Contact Created', description: 'Trigger when a new contact is added' },
        { id: 'contact_updated', name: 'Contact Updated', description: 'Trigger when contact details are modified' },
        { id: 'contact_engagement', name: 'Contact Engagement', description: 'Trigger on contact interaction' }
      ]
    },
    {
      name: 'Deals',
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
      signals: [
        { id: 'deal_created', name: 'Deal Created', description: 'Trigger when a new deal is created' },
        { id: 'deal_stage_change', name: 'Deal Stage Change', description: 'Trigger when deal moves to next stage' },
        { id: 'deal_won', name: 'Deal Won', description: 'Trigger when deal is closed won' },
        { id: 'deal_lost', name: 'Deal Lost', description: 'Trigger when deal is closed lost' }
      ]
    },
    {
      name: 'Activities',
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600',
      signals: [
        { id: 'task_created', name: 'Task Created', description: 'Trigger when a new task is created' },
        { id: 'event_scheduled', name: 'Event Scheduled', description: 'Trigger when an event is scheduled' },
        { id: 'call_logged', name: 'Call Logged', description: 'Trigger when a call activity is logged' }
      ]
    },
    {
      name: 'Emails',
      icon: Mail,
      color: 'bg-red-100 text-red-600',
      signals: [
        { id: 'email_sent', name: 'Email Sent', description: 'Trigger when an email is sent' },
        { id: 'email_opened', name: 'Email Opened', description: 'Trigger when email is opened by recipient' },
        { id: 'email_clicked', name: 'Email Clicked', description: 'Trigger when email link is clicked' }
      ]
    },
    {
      name: 'Calls',
      icon: Phone,
      color: 'bg-teal-100 text-teal-600',
      signals: [
        { id: 'call_incoming', name: 'Incoming Call', description: 'Trigger on incoming call' },
        { id: 'call_missed', name: 'Missed Call', description: 'Trigger when a call is missed' },
        { id: 'call_completed', name: 'Call Completed', description: 'Trigger when call is completed' }
      ]
    }
  ];

  const handleSignalToggle = (signalId: string) => {
    setSelectedSignals(prev => 
      prev.includes(signalId) 
        ? prev.filter(id => id !== signalId)
        : [...prev, signalId]
    );
  };

  const addCustomSignal = () => {
    if (customSignal.trim()) {
      setSelectedSignals(prev => [...prev, `custom_${Date.now()}`]);
      setCustomSignal('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">
          Select the CRM modules and signals that should trigger your agent
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.name} className="border-2 border-border/50 hover:border-primary/30 transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className={`p-2 rounded-lg ${module.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {module.name}
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {module.signals.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {module.signals.map((signal) => (
                  <div key={signal.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={signal.id}
                      checked={selectedSignals.includes(signal.id)}
                      onCheckedChange={() => handleSignalToggle(signal.id)}
                      className="mt-0.5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor={signal.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {signal.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {signal.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Custom Signals */}
      <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5 text-primary" />
            Custom Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter custom signal name..."
              value={customSignal}
              onChange={(e) => setCustomSignal(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addCustomSignal} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Create custom triggers based on your specific business needs
          </p>
        </CardContent>
      </Card>

      {/* Selected Signals Summary */}
      {selectedSignals.length > 0 && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Selected Signals
              <Badge variant="secondary">{selectedSignals.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedSignals.slice(0, 10).map((signalId) => (
                <Badge key={signalId} variant="secondary" className="bg-primary/10 text-primary">
                  {signalId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
              {selectedSignals.length > 10 && (
                <Badge variant="secondary">
                  +{selectedSignals.length - 10} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};