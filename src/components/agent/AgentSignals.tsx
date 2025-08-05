import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Zap, Users, DollarSign, Mail, Phone, Calendar, ArrowRight } from 'lucide-react';

interface SignalFlow {
  id: string;
  selectedModule?: string;
  selectedSignals: string[];
  nextAction?: string;
}

export const AgentSignals = () => {
  const [signalFlows, setSignalFlows] = useState<SignalFlow[]>([{ id: '1', selectedSignals: [] }]);

  const modules = [
    {
      name: 'Leads',
      value: 'leads',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      signals: [
        { id: 'lead_created', name: 'Lead Created' },
        { id: 'lead_edited', name: 'Lead Edited' },
        { id: 'lead_qualified', name: 'Lead Qualified' },
        { id: 'lead_converted', name: 'Lead Converted' }
      ],
      nextActions: [
        { id: 'email', name: 'Email' },
        { id: 'call', name: 'Call' },
        { id: 'notes', name: 'Notes' },
        { id: 'task', name: 'Task' },
        { id: 'meeting', name: 'Meeting' }
      ]
    },
    {
      name: 'Contacts',
      value: 'contacts',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      signals: [
        { id: 'contact_created', name: 'Contact Created' },
        { id: 'contact_updated', name: 'Contact Updated' },
        { id: 'contact_engagement', name: 'Contact Engagement' }
      ],
      nextActions: [
        { id: 'email', name: 'Email' },
        { id: 'call', name: 'Call' },
        { id: 'sms', name: 'SMS' },
        { id: 'notes', name: 'Notes' }
      ]
    },
    {
      name: 'Deals',
      value: 'deals',
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
      signals: [
        { id: 'deal_created', name: 'Deal Created' },
        { id: 'deal_stage_change', name: 'Deal Stage Change' },
        { id: 'deal_won', name: 'Deal Won' },
        { id: 'deal_lost', name: 'Deal Lost' }
      ],
      nextActions: [
        { id: 'email', name: 'Email' },
        { id: 'proposal', name: 'Proposal' },
        { id: 'quote', name: 'Quote' },
        { id: 'contract', name: 'Contract' }
      ]
    },
    {
      name: 'Activities',
      value: 'activities',
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600',
      signals: [
        { id: 'task_created', name: 'Task Created' },
        { id: 'event_scheduled', name: 'Event Scheduled' },
        { id: 'call_logged', name: 'Call Logged' }
      ],
      nextActions: [
        { id: 'follow_up', name: 'Follow Up' },
        { id: 'reminder', name: 'Reminder' },
        { id: 'notification', name: 'Notification' }
      ]
    },
    {
      name: 'Emails',
      value: 'emails',
      icon: Mail,
      color: 'bg-red-100 text-red-600',
      signals: [
        { id: 'email_sent', name: 'Email Sent' },
        { id: 'email_opened', name: 'Email Opened' },
        { id: 'email_clicked', name: 'Email Clicked' }
      ],
      nextActions: [
        { id: 'follow_up_email', name: 'Follow Up Email' },
        { id: 'call', name: 'Call' },
        { id: 'task', name: 'Task' }
      ]
    },
    {
      name: 'Calls',
      value: 'calls',
      icon: Phone,
      color: 'bg-teal-100 text-teal-600',
      signals: [
        { id: 'call_incoming', name: 'Incoming Call' },
        { id: 'call_missed', name: 'Missed Call' },
        { id: 'call_completed', name: 'Call Completed' }
      ],
      nextActions: [
        { id: 'email', name: 'Email' },
        { id: 'notes', name: 'Notes' },
        { id: 'task', name: 'Task' },
        { id: 'callback', name: 'Callback' }
      ]
    }
  ];

  const updateSignalFlow = (flowId: string, updates: Partial<SignalFlow>) => {
    setSignalFlows(prev => prev.map(flow => 
      flow.id === flowId ? { ...flow, ...updates } : flow
    ));
  };

  const handleModuleSelect = (flowId: string, moduleValue: string) => {
    updateSignalFlow(flowId, { selectedModule: moduleValue, selectedSignals: [], nextAction: undefined });
  };

  const handleSignalToggle = (flowId: string, signalId: string) => {
    const flow = signalFlows.find(f => f.id === flowId);
    if (!flow) return;
    
    const newSignals = flow.selectedSignals.includes(signalId)
      ? flow.selectedSignals.filter(id => id !== signalId)
      : [...flow.selectedSignals, signalId];
    
    updateSignalFlow(flowId, { selectedSignals: newSignals });
  };

  const handleNextActionSelect = (flowId: string, actionId: string) => {
    updateSignalFlow(flowId, { nextAction: actionId });
  };

  const addAnotherModuleFlow = () => {
    const newFlow: SignalFlow = {
      id: Date.now().toString(),
      selectedSignals: []
    };
    setSignalFlows(prev => [...prev, newFlow]);
  };

  const addNewFlow = () => {
    const newFlow: SignalFlow = {
      id: Date.now().toString(),
      selectedSignals: []
    };
    setSignalFlows(prev => [...prev, newFlow]);
  };

  const getSelectedModule = (moduleValue?: string) => {
    return modules.find(m => m.value === moduleValue);
  };

  const removeFlow = (flowId: string) => {
    if (signalFlows.length > 1) {
      setSignalFlows(prev => prev.filter(flow => flow.id !== flowId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">
          Create signal flows by selecting modules and their triggers
        </span>
      </div>

      {/* Signal Flows */}
      {signalFlows.map((flow, index) => {
        const selectedModule = getSelectedModule(flow.selectedModule);
        
        return (
          <Card key={flow.id} className="border-2 border-border/50 hover:border-primary/30 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Signal Flow {index + 1}
                </CardTitle>
                {signalFlows.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFlow(flow.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                {/* Step 1: Select Module */}
                <div className="flex-shrink-0">
                  <label className="text-sm font-medium mb-2 block">Select Module</label>
                  <Select value={flow.selectedModule || ""} onValueChange={(value) => handleModuleSelect(flow.id, value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Choose module" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((module) => {
                        const Icon = module.icon;
                        return (
                          <SelectItem key={module.value} value={module.value}>
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded ${module.color}`}>
                                <Icon className="h-3 w-3" />
                              </div>
                              {module.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Arrow */}
                {flow.selectedModule && <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}

                {/* Step 2: Select Signals */}
                {flow.selectedModule && selectedModule && (
                  <div className="flex-shrink-0">
                    <label className="text-sm font-medium mb-2 block">Select Triggers</label>
                    <Card className="w-64 max-h-48 overflow-y-auto">
                      <CardContent className="p-3 space-y-2">
                        {selectedModule.signals.map((signal) => (
                          <div key={signal.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${flow.id}-${signal.id}`}
                              checked={flow.selectedSignals.includes(signal.id)}
                              onCheckedChange={() => handleSignalToggle(flow.id, signal.id)}
                            />
                            <label
                              htmlFor={`${flow.id}-${signal.id}`}
                              className="text-sm leading-none cursor-pointer"
                            >
                              {signal.name}
                            </label>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Arrow */}
                {flow.selectedSignals.length > 0 && <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}

                {/* Step 3: Select Next Action */}
                {flow.selectedSignals.length > 0 && selectedModule && (
                  <div className="flex-shrink-0">
                    <label className="text-sm font-medium mb-2 block">Select Next Action</label>
                    <Select value={flow.nextAction || ""} onValueChange={(value) => handleNextActionSelect(flow.id, value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Choose action" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedModule.nextActions.map((action) => (
                          <SelectItem key={action.id} value={action.id}>
                            {action.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Arrow */}
                {flow.nextAction && <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}

                {/* Step 4: Add Button */}
                {flow.nextAction && (
                  <div className="flex-shrink-0">
                    <Button variant="outline" size="icon" className="w-10 h-10">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Flow Summary */}
              {flow.selectedModule && flow.selectedSignals.length > 0 && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Flow Summary:</strong> When {selectedModule?.name} triggers{' '}
                    <Badge variant="secondary" className="mx-1">
                      {flow.selectedSignals.length} signal{flow.selectedSignals.length > 1 ? 's' : ''}
                    </Badge>
                    {flow.nextAction && (
                      <>
                        {' '}→ Execute{' '}
                        <Badge variant="default" className="mx-1">
                          {selectedModule?.nextActions.find(a => a.id === flow.nextAction)?.name}
                        </Badge>
                      </>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Add Flow Buttons */}
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={addAnotherModuleFlow}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Another Module with Same Flow
        </Button>
        <Button 
          variant="default" 
          onClick={addNewFlow}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Flow
        </Button>
      </div>
    </div>
  );
};