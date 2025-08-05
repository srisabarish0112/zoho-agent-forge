import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Zap, Users, DollarSign, Mail, Phone, Calendar, ArrowRight, Building2, Target } from 'lucide-react';

interface SignalFlow {
  id: string;
  parentModule?: string;
  parentSignals: string[];
  nextModule?: string;
  nextSignals: string[];
}

export const AgentSignals = () => {
  const [signalFlows, setSignalFlows] = useState<SignalFlow[]>([{ id: '1', parentSignals: [], nextSignals: [] }]);

  const modules = [
    {
      name: 'Lead',
      value: 'lead',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      signals: [
        { id: 'lead_created', name: 'Lead Created' },
        { id: 'lead_updated', name: 'Lead Updated' },
        { id: 'lead_status_changed', name: 'Lead Status Changed' },
        { id: 'lead_assigned', name: 'Lead Assigned' },
        { id: 'lead_score_changed', name: 'Lead Score Changed' },
        { id: 'lead_custom_trigger', name: 'Custom Trigger' }
      ]
    },
    {
      name: 'Contact',
      value: 'contact',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      signals: [
        { id: 'contact_created', name: 'Contact Created' },
        { id: 'contact_updated', name: 'Contact Updated' },
        { id: 'contact_engagement', name: 'Contact Engagement' },
        { id: 'contact_assigned', name: 'Contact Assigned' },
        { id: 'contact_status_changed', name: 'Contact Status Changed' },
        { id: 'contact_custom_trigger', name: 'Custom Trigger' }
      ]
    },
    {
      name: 'Deal',
      value: 'deal',
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
      signals: [
        { id: 'deal_created', name: 'Deal Created' },
        { id: 'deal_updated', name: 'Deal Updated' },
        { id: 'deal_stage_changed', name: 'Deal Stage Changed' },
        { id: 'deal_won', name: 'Deal Won' },
        { id: 'deal_lost', name: 'Deal Lost' },
        { id: 'deal_custom_trigger', name: 'Custom Trigger' }
      ]
    },
    {
      name: 'Task',
      value: 'task',
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600',
      signals: [
        { id: 'task_created', name: 'Task Created' },
        { id: 'task_updated', name: 'Task Updated' },
        { id: 'task_completed', name: 'Task Completed' },
        { id: 'task_assigned', name: 'Task Assigned' },
        { id: 'task_overdue', name: 'Task Overdue' },
        { id: 'task_custom_trigger', name: 'Custom Trigger' }
      ]
    },
    {
      name: 'Account',
      value: 'account',
      icon: Building2,
      color: 'bg-red-100 text-red-600',
      signals: [
        { id: 'account_created', name: 'Account Created' },
        { id: 'account_updated', name: 'Account Updated' },
        { id: 'account_engagement', name: 'Account Engagement' },
        { id: 'account_status_changed', name: 'Account Status Changed' },
        { id: 'account_assigned', name: 'Account Assigned' },
        { id: 'account_custom_trigger', name: 'Custom Trigger' }
      ]
    },
    {
      name: 'Opportunity',
      value: 'opportunity',
      icon: Target,
      color: 'bg-teal-100 text-teal-600',
      signals: [
        { id: 'opportunity_created', name: 'Opportunity Created' },
        { id: 'opportunity_updated', name: 'Opportunity Updated' },
        { id: 'opportunity_stage_changed', name: 'Opportunity Stage Changed' },
        { id: 'opportunity_won', name: 'Opportunity Won' },
        { id: 'opportunity_lost', name: 'Opportunity Lost' },
        { id: 'opportunity_custom_trigger', name: 'Custom Trigger' }
      ]
    },
    {
      name: 'Email',
      value: 'email',
      icon: Mail,
      color: 'bg-indigo-100 text-indigo-600',
      signals: [
        { id: 'email_sent', name: 'Email Sent' },
        { id: 'email_opened', name: 'Email Opened' },
        { id: 'email_clicked', name: 'Email Clicked' },
        { id: 'email_replied', name: 'Email Replied' },
        { id: 'email_bounced', name: 'Email Bounced' },
        { id: 'email_custom_trigger', name: 'Custom Trigger' }
      ]
    },
    {
      name: 'Call',
      value: 'call',
      icon: Phone,
      color: 'bg-pink-100 text-pink-600',
      signals: [
        { id: 'call_incoming', name: 'Incoming Call' },
        { id: 'call_outgoing', name: 'Outgoing Call' },
        { id: 'call_missed', name: 'Missed Call' },
        { id: 'call_completed', name: 'Call Completed' },
        { id: 'call_logged', name: 'Call Logged' },
        { id: 'call_custom_trigger', name: 'Custom Trigger' }
      ]
    }
  ];

  const updateSignalFlow = (flowId: string, updates: Partial<SignalFlow>) => {
    setSignalFlows(prev => prev.map(flow => 
      flow.id === flowId ? { ...flow, ...updates } : flow
    ));
  };

  const handleParentModuleSelect = (flowId: string, moduleValue: string) => {
    updateSignalFlow(flowId, { parentModule: moduleValue, parentSignals: [] });
  };

  const handleNextModuleSelect = (flowId: string, moduleValue: string) => {
    updateSignalFlow(flowId, { nextModule: moduleValue, nextSignals: [] });
  };

  const handleParentSignalToggle = (flowId: string, signalId: string) => {
    const flow = signalFlows.find(f => f.id === flowId);
    if (!flow) return;
    
    const newSignals = flow.parentSignals.includes(signalId)
      ? flow.parentSignals.filter(id => id !== signalId)
      : [...flow.parentSignals, signalId];
    
    updateSignalFlow(flowId, { parentSignals: newSignals });
  };

  const handleNextSignalToggle = (flowId: string, signalId: string) => {
    const flow = signalFlows.find(f => f.id === flowId);
    if (!flow) return;
    
    const newSignals = flow.nextSignals.includes(signalId)
      ? flow.nextSignals.filter(id => id !== signalId)
      : [...flow.nextSignals, signalId];
    
    updateSignalFlow(flowId, { nextSignals: newSignals });
  };

  const addAnotherModuleWithSameSignal = () => {
    const lastFlow = signalFlows[signalFlows.length - 1];
    const newFlow: SignalFlow = {
      id: Date.now().toString(),
      parentModule: lastFlow.parentModule,
      parentSignals: [...lastFlow.parentSignals],
      nextModule: lastFlow.nextModule,
      nextSignals: [...lastFlow.nextSignals]
    };
    setSignalFlows(prev => [...prev, newFlow]);
  };

  const createNewSignal = () => {
    const newFlow: SignalFlow = {
      id: Date.now().toString(),
      parentSignals: [],
      nextSignals: []
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
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Agent Signals</h2>
        <p className="text-muted-foreground">
          Create signal flows by selecting modules and their triggers
        </p>
      </div>

      {/* Signal Flows */}
      {signalFlows.map((flow, index) => {
        const parentModule = getSelectedModule(flow.parentModule);
        const nextModule = getSelectedModule(flow.nextModule);
        
        return (
          <div key={flow.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Signal Flow {index + 1}</h3>
              {signalFlows.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFlow(flow.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              )}
            </div>

            {/* Tile Flow */}
            <div className="flex items-start gap-6 overflow-x-auto pb-4">
              {/* First Tile - Parent Module */}
              <Card className="min-w-80 flex-shrink-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Select Module</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select 
                    value={flow.parentModule || ""} 
                    onValueChange={(value) => handleParentModuleSelect(flow.id, value)}
                  >
                    <SelectTrigger>
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

                  {/* Parent Module Triggers */}
                  {flow.parentModule && parentModule && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Select Triggers:</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {parentModule.signals.map((signal) => (
                          <div key={signal.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${flow.id}-parent-${signal.id}`}
                              checked={flow.parentSignals.includes(signal.id)}
                              onCheckedChange={() => handleParentSignalToggle(flow.id, signal.id)}
                            />
                            <label
                              htmlFor={`${flow.id}-parent-${signal.id}`}
                              className="text-sm leading-none cursor-pointer"
                            >
                              {signal.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Arrow */}
              {flow.parentModule && flow.parentSignals.length > 0 && (
                <div className="flex items-center justify-center mt-16">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}

              {/* Second Tile - Next Module */}
              {flow.parentModule && flow.parentSignals.length > 0 && (
                <Card className="min-w-80 flex-shrink-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      Select Next Module for {parentModule?.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select 
                      value={flow.nextModule || ""} 
                      onValueChange={(value) => handleNextModuleSelect(flow.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose next module" />
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

                    {/* Next Module Triggers */}
                    {flow.nextModule && nextModule && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Select Triggers:</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {nextModule.signals.map((signal) => (
                            <div key={signal.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${flow.id}-next-${signal.id}`}
                                checked={flow.nextSignals.includes(signal.id)}
                                onCheckedChange={() => handleNextSignalToggle(flow.id, signal.id)}
                              />
                              <label
                                htmlFor={`${flow.id}-next-${signal.id}`}
                                className="text-sm leading-none cursor-pointer"
                              >
                                {signal.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Arrow and Plus */}
              {flow.nextModule && flow.nextSignals.length > 0 && (
                <>
                  <div className="flex items-center justify-center mt-16">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-center mt-16">
                    <Button variant="outline" size="icon" className="w-12 h-12">
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Flow Summary */}
            {flow.parentModule && flow.parentSignals.length > 0 && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong>Flow Summary:</strong> When <Badge variant="secondary">{parentModule?.name}</Badge> triggers{' '}
                    <Badge variant="outline">{flow.parentSignals.length} signal{flow.parentSignals.length !== 1 ? 's' : ''}</Badge>
                    {flow.nextModule && flow.nextSignals.length > 0 && (
                      <>
                        {' '}→ Then <Badge variant="secondary">{nextModule?.name}</Badge> triggers{' '}
                        <Badge variant="outline">{flow.nextSignals.length} signal{flow.nextSignals.length !== 1 ? 's' : ''}</Badge>
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );
      })}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button 
          variant="outline" 
          onClick={addAnotherModuleWithSameSignal}
          className="flex items-center gap-2"
          disabled={signalFlows.length === 0 || !signalFlows[signalFlows.length - 1].parentModule}
        >
          <Plus className="h-4 w-4" />
          Add another module with same signals
        </Button>
        <Button 
          variant="default" 
          onClick={createNewSignal}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Signal Flow
        </Button>
      </div>
    </div>
  );
};