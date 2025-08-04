import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Zap, Users, DollarSign, Mail, Phone, Calendar, FileText, Settings, MapPin } from 'lucide-react';

export const AgentSignals = () => {
  const [customSignal, setCustomSignal] = useState('');
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);

  const modules = [
    {
      name: 'Leads',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      signals: [
        { id: 'record_created', name: 'Record Created', description: 'Trigger when a new record is added' },
        { id: 'record_updated', name: 'Record Updated', description: 'Trigger when record information is updated' },
        { id: 'status_changed', name: 'Status Changed', description: 'Trigger when record status changes' },
        { id: 'email_received', name: 'Email Received', description: 'Trigger when email is received' },
        { id: 'email_sent', name: 'Email Sent', description: 'Trigger when email is sent' }
      ]
    },
    {
      name: 'Contacts',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      signals: [
        { id: 'record_created', name: 'Record Created', description: 'Trigger when a new record is added' },
        { id: 'record_updated', name: 'Record Updated', description: 'Trigger when record details are modified' },
        { id: 'email_received', name: 'Email Received', description: 'Trigger when email is received' },
        { id: 'email_sent', name: 'Email Sent', description: 'Trigger when email is sent' },
        { id: 'engagement_activity', name: 'Engagement Activity', description: 'Trigger on contact interaction' }
      ]
    },
    {
      name: 'Accounts',
      icon: Users,
      color: 'bg-indigo-100 text-indigo-600',
      signals: [
        { id: 'record_created', name: 'Record Created', description: 'Trigger when a new record is added' },
        { id: 'record_updated', name: 'Record Updated', description: 'Trigger when record is updated' },
        { id: 'email_received', name: 'Email Received', description: 'Trigger when email is received' },
        { id: 'email_sent', name: 'Email Sent', description: 'Trigger when email is sent' },
        { id: 'revenue_milestone', name: 'Revenue Milestone', description: 'Trigger when revenue targets are met' }
      ]
    },
    {
      name: 'Deals',
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
      signals: [
        { id: 'record_created', name: 'Record Created', description: 'Trigger when a new deal is created' },
        { id: 'stage_changed', name: 'Stage Changed', description: 'Trigger when deal moves to next stage' },
        { id: 'deal_won', name: 'Deal Won', description: 'Trigger when deal is closed won' },
        { id: 'deal_lost', name: 'Deal Lost', description: 'Trigger when deal is closed lost' },
        { id: 'email_sent', name: 'Email Sent', description: 'Trigger when email is sent' }
      ]
    },
    {
      name: 'Activities',
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600',
      signals: [
        { id: 'task_created', name: 'Task Created', description: 'Trigger when a new task is created' },
        { id: 'event_scheduled', name: 'Event Scheduled', description: 'Trigger when an event is scheduled' },
        { id: 'call_logged', name: 'Call Logged', description: 'Trigger when a call activity is logged' },
        { id: 'email_sent', name: 'Email Sent', description: 'Trigger when email is sent' }
      ]
    },
    {
      name: 'Emails',
      icon: Mail,
      color: 'bg-red-100 text-red-600',
      signals: [
        { id: 'email_sent', name: 'Email Sent', description: 'Trigger when an email is sent' },
        { id: 'email_received', name: 'Email Received', description: 'Trigger when email is received' },
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

  // Unify signals across modules
  const unifiedSignals = () => {
    const signalMap = new Map();
    
    modules.forEach(module => {
      module.signals.forEach(signal => {
        if (signalMap.has(signal.id)) {
          signalMap.get(signal.id).modules.push({
            name: module.name,
            icon: module.icon,
            color: module.color
          });
        } else {
          signalMap.set(signal.id, {
            id: signal.id,
            name: signal.name,
            description: signal.description,
            modules: [{
              name: module.name,
              icon: module.icon,
              color: module.color
            }]
          });
        }
      });
    });
    
    return Array.from(signalMap.values());
  };

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
          Select unified signals that should trigger your agent across all modules
        </span>
      </div>

      {/* Unified Signals */}
      <div className="space-y-4">
        {unifiedSignals().map((signal) => (
          <Card key={signal.id} className="border-2 border-border/50 hover:border-primary/30 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3 flex-1">
                  <Checkbox
                    id={signal.id}
                    checked={selectedSignals.includes(signal.id)}
                    onCheckedChange={() => handleSignalToggle(signal.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor={signal.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {signal.name}
                      </Label>
                      <Badge variant="secondary" className="text-xs">
                        {signal.modules.length} module{signal.modules.length > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {signal.description}
                    </p>
                    {/* Show applicable modules */}
                    <div className="flex flex-wrap gap-1">
                      {signal.modules.map((module, index) => {
                        const Icon = module.icon;
                        return (
                          <div key={index} className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${module.color}`}>
                            <Icon className="h-3 w-3" />
                            {module.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Condition and Param Mapping buttons */}
                {selectedSignals.includes(signal.id) && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 px-3">
                      <Settings className="h-3 w-3 mr-1" />
                      Condition
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      Param Mapping
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
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