import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Zap, Users, DollarSign, Mail, Phone, Calendar, ArrowRight } from 'lucide-react';

interface SignalStep {
  id: string;
  selectedModule?: string;
  selectedSignals: string[];
  selectedNextSignal?: string;
  selectedNextSignals: string[];
  nextAction?: string;
}

interface SignalFlow {
  id: string;
  parentStep: SignalStep;
  childSteps: SignalStep[];
}

export const AgentSignals = () => {
  const [signalFlows, setSignalFlows] = useState<SignalFlow[]>([{ 
    id: '1', 
    parentStep: { id: 'parent-1', selectedSignals: [], selectedNextSignals: [] },
    childSteps: []
  }]);

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
        { id: 'lead_converted', name: 'Lead Converted' },
        { id: 'lead_status_changed', name: 'Lead Status Changed' },
        { id: 'lead_assigned', name: 'Lead Assigned' }
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
        { id: 'contact_engagement', name: 'Contact Engagement' },
        { id: 'contact_email_opened', name: 'Contact Email Opened' },
        { id: 'contact_called', name: 'Contact Called' },
        { id: 'contact_meeting_scheduled', name: 'Contact Meeting Scheduled' }
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
        { id: 'deal_lost', name: 'Deal Lost' },
        { id: 'deal_amount_updated', name: 'Deal Amount Updated' },
        { id: 'deal_probability_changed', name: 'Deal Probability Changed' }
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
        { id: 'call_logged', name: 'Call Logged' },
        { id: 'meeting_completed', name: 'Meeting Completed' },
        { id: 'task_completed', name: 'Task Completed' },
        { id: 'activity_overdue', name: 'Activity Overdue' }
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
        { id: 'email_clicked', name: 'Email Clicked' },
        { id: 'email_replied', name: 'Email Replied' },
        { id: 'email_bounced', name: 'Email Bounced' },
        { id: 'email_unsubscribed', name: 'Email Unsubscribed' }
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
        { id: 'call_completed', name: 'Call Completed' },
        { id: 'call_scheduled', name: 'Call Scheduled' },
        { id: 'call_rescheduled', name: 'Call Rescheduled' },
        { id: 'call_cancelled', name: 'Call Cancelled' }
      ],
      nextActions: [
        { id: 'email', name: 'Email' },
        { id: 'notes', name: 'Notes' },
        { id: 'task', name: 'Task' },
        { id: 'callback', name: 'Callback' }
      ]
    }
  ];

  const updateParentStep = (flowId: string, updates: Partial<SignalStep>) => {
    setSignalFlows(prev => prev.map(flow => 
      flow.id === flowId ? { ...flow, parentStep: { ...flow.parentStep, ...updates } } : flow
    ));
  };

  const updateChildStep = (flowId: string, stepId: string, updates: Partial<SignalStep>) => {
    setSignalFlows(prev => prev.map(flow => 
      flow.id === flowId 
        ? { 
            ...flow, 
            childSteps: flow.childSteps.map(step => 
              step.id === stepId ? { ...step, ...updates } : step
            )
          } 
        : flow
    ));
  };

  const handleParentModuleSelect = (flowId: string, moduleValue: string) => {
    updateParentStep(flowId, { selectedModule: moduleValue, selectedSignals: [], nextAction: undefined });
  };

  const handleParentSignalToggle = (flowId: string, signalId: string) => {
    const flow = signalFlows.find(f => f.id === flowId);
    if (!flow) return;
    
    const newSignals = flow.parentStep.selectedSignals.includes(signalId)
      ? flow.parentStep.selectedSignals.filter(id => id !== signalId)
      : [...flow.parentStep.selectedSignals, signalId];
    
    updateParentStep(flowId, { selectedSignals: newSignals });
  };

  const handleChildModuleSelect = (flowId: string, stepId: string, moduleValue: string) => {
    updateChildStep(flowId, stepId, { selectedModule: moduleValue, selectedSignals: [], nextAction: undefined });
  };

  const handleChildSignalToggle = (flowId: string, stepId: string, signalId: string) => {
    const flow = signalFlows.find(f => f.id === flowId);
    const step = flow?.childSteps.find(s => s.id === stepId);
    if (!flow || !step) return;
    
    const newSignals = step.selectedSignals.includes(signalId)
      ? step.selectedSignals.filter(id => id !== signalId)
      : [...step.selectedSignals, signalId];
    
    updateChildStep(flowId, stepId, { selectedSignals: newSignals });
  };

  const addChildStep = (flowId: string) => {
    const newStepId = `child-${Date.now()}`;
    setSignalFlows(prev => prev.map(flow => 
      flow.id === flowId 
        ? { 
            ...flow, 
            childSteps: [...flow.childSteps, { 
              id: newStepId, 
              selectedSignals: [], 
              selectedNextSignals: [] 
            }]
          } 
        : flow
    ));
  };

  const addAnotherModuleFlow = () => {
    const currentFlow = signalFlows[0];
    if (!currentFlow) return;

    const newFlow: SignalFlow = {
      id: Date.now().toString(),
      parentStep: { 
        id: `parent-${Date.now()}`, 
        selectedSignals: [...currentFlow.parentStep.selectedSignals], 
        selectedNextSignals: [...currentFlow.parentStep.selectedNextSignals] 
      },
      childSteps: [...currentFlow.childSteps.map(step => ({
        ...step,
        id: `child-${Date.now()}-${step.id}`
      }))]
    };
    setSignalFlows(prev => [...prev, newFlow]);
  };

  const addNewFlow = () => {
    const newFlow: SignalFlow = {
      id: Date.now().toString(),
      parentStep: { id: `parent-${Date.now()}`, selectedSignals: [], selectedNextSignals: [] },
      childSteps: []
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
          Create signal flows by selecting parent module and child signals
        </span>
      </div>

      {/* Signal Flows */}
      {signalFlows.map((flow, index) => {
        const selectedParentModule = getSelectedModule(flow.parentStep.selectedModule);
        
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
            <CardContent className="space-y-6">
              {/* Parent Module Step */}
              <Card className="bg-blue-50/50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-700">Parent Module</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Module Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Module</label>
                    <Select 
                      value={flow.parentStep.selectedModule || ""} 
                      onValueChange={(value) => handleParentModuleSelect(flow.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose parent module" />
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

                  {/* Parent Module Signals */}
                  {flow.parentStep.selectedModule && selectedParentModule && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Parent Signals</label>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border rounded">
                        {selectedParentModule.signals.map((signal) => (
                          <div key={signal.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`parent-${flow.id}-${signal.id}`}
                              checked={flow.parentStep.selectedSignals.includes(signal.id)}
                              onCheckedChange={() => handleParentSignalToggle(flow.id, signal.id)}
                            />
                            <label
                              htmlFor={`parent-${flow.id}-${signal.id}`}
                              className="text-xs leading-none cursor-pointer"
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

              {/* Child Steps */}
              {flow.childSteps.map((step) => {
                const selectedChildModule = getSelectedModule(step.selectedModule);
                return (
                  <Card key={step.id} className="bg-green-50/50 border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-green-700">Child Signal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Child Module Selection */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Next Signal Module</label>
                        <Select 
                          value={step.selectedModule || ""} 
                          onValueChange={(value) => handleChildModuleSelect(flow.id, step.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose next signal module" />
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

                      {/* Child Module Signals */}
                      {step.selectedModule && selectedChildModule && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">Select Child Signals</label>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border rounded">
                            {selectedChildModule.signals.map((signal) => (
                              <div key={signal.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`child-${step.id}-${signal.id}`}
                                  checked={step.selectedSignals.includes(signal.id)}
                                  onCheckedChange={() => handleChildSignalToggle(flow.id, step.id, signal.id)}
                                />
                                <label
                                  htmlFor={`child-${step.id}-${signal.id}`}
                                  className="text-xs leading-none cursor-pointer"
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
                );
              })}

              {/* Add Child Step Button */}
              {flow.parentStep.selectedSignals.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => addChildStep(flow.id)}
                  className="w-full flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Next Signal
                </Button>
              )}

              {/* Flow Summary */}
              {flow.parentStep.selectedModule && flow.parentStep.selectedSignals.length > 0 && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Flow Summary:</strong> Parent {selectedParentModule?.name} triggers{' '}
                    <Badge variant="secondary" className="mx-1">
                      {flow.parentStep.selectedSignals.length} signal{flow.parentStep.selectedSignals.length > 1 ? 's' : ''}
                    </Badge>
                    {flow.childSteps.length > 0 && (
                      <>
                        {' '}→ {flow.childSteps.length} child signal{flow.childSteps.length > 1 ? 's' : ''}
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