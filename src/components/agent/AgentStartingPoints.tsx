import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Rocket, Bot, Search, Zap, MessageSquare, FileText, Users, Settings } from 'lucide-react';

export const AgentStartingPoints = () => {
  const [startingPoint, setStartingPoint] = useState<string>('');
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);
  const [selectedAskziaOptions, setSelectedAskziaOptions] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');

  const digitalEmployeePlacements = [
    { id: 'chat_widget', name: 'Chat Widget', description: 'Embedded chat on website/portal' },
    { id: 'email_signature', name: 'Email Signature', description: 'Auto-responses in email threads' },
    { id: 'landing_pages', name: 'Landing Pages', description: 'Lead capture forms and pages' },
    { id: 'help_desk', name: 'Help Desk', description: 'Customer support ticket system' },
    { id: 'mobile_app', name: 'Mobile App', description: 'In-app assistant functionality' }
  ];

  const askziaOptions = [
    { id: 'co_create', name: 'Co-Create', description: 'Collaborative content creation' },
    { id: 'data_enrichment', name: 'Data Enrichment', description: 'Enhance existing records' },
    { id: 'lead_scoring', name: 'Lead Scoring', description: 'Automatic lead qualification' },
    { id: 'pipeline_insights', name: 'Pipeline Insights', description: 'Sales forecast analysis' },
    { id: 'workflow_automation', name: 'Workflow Automation', description: 'Process automation triggers' }
  ];

  const handlePlacementToggle = (placementId: string) => {
    setSelectedPlacements(prev =>
      prev.includes(placementId)
        ? prev.filter(id => id !== placementId)
        : [...prev, placementId]
    );
  };

  const handleAskziaToggle = (optionId: string) => {
    setSelectedAskziaOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords(prev => [...prev, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">
          Configure how and when your agent should be triggered
        </span>
      </div>

      {/* Starting Point Selection */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Agent Trigger Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="starting-point">Select Starting Point</Label>
            <Select value={startingPoint} onValueChange={setStartingPoint}>
              <SelectTrigger id="starting-point">
                <SelectValue placeholder="Choose how to trigger your agent..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="digital_employee">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    Digital Employee
                  </div>
                </SelectItem>
                <SelectItem value="askzia">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Askzia Integration
                  </div>
                </SelectItem>
                <SelectItem value="keyword_based">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Keyword Based
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Digital Employee Configuration */}
      {startingPoint === 'digital_employee' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                Digital Employee Placements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {digitalEmployeePlacements.map((placement) => (
                  <div key={placement.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={placement.id}
                      checked={selectedPlacements.includes(placement.id)}
                      onCheckedChange={() => handlePlacementToggle(placement.id)}
                      className="mt-0.5"
                    />
                    <div className="grid gap-1.5 leading-none flex-1">
                      <Label
                        htmlFor={placement.id}
                        className="text-sm font-medium leading-none"
                      >
                        {placement.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {placement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conditions & Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="trigger-conditions">Trigger Conditions</Label>
                  <Textarea
                    id="trigger-conditions"
                    placeholder="Define when the digital employee should activate (e.g., user inactivity for 30 seconds, specific page visits, etc.)"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="business-hours">Business Hours</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24_7">24/7 Available</SelectItem>
                      <SelectItem value="business_hours">Business Hours Only</SelectItem>
                      <SelectItem value="custom">Custom Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Askzia Configuration */}
      {startingPoint === 'askzia' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              Askzia Integration Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {askziaOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={option.id}
                    checked={selectedAskziaOptions.includes(option.id)}
                    onCheckedChange={() => handleAskziaToggle(option.id)}
                    className="mt-0.5"
                  />
                  <div className="grid gap-1.5 leading-none flex-1">
                    <Label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none"
                    >
                      {option.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Label htmlFor="askzia-conditions">Integration Conditions</Label>
              <Textarea
                id="askzia-conditions"
                placeholder="Specify when and how the agent should integrate with Askzia features..."
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keyword Based Configuration */}
      {startingPoint === 'keyword_based' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-green-600" />
              Keyword Based Triggers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="add-keyword">Add Keywords</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="add-keyword"
                  placeholder="Enter trigger keyword..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                />
                <button
                  onClick={addKeyword}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {keywords.length > 0 && (
              <div>
                <Label>Active Keywords</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="bg-green-100 text-green-700 border-green-200 cursor-pointer"
                      onClick={() => removeKeyword(keyword)}
                    >
                      {keyword} ×
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click on a keyword to remove it
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="keyword-conditions">Keyword Matching Rules</Label>
              <Textarea
                id="keyword-conditions"
                placeholder="Define how keywords should be matched (exact match, partial, synonyms, etc.)"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration Summary */}
      {startingPoint && (
        <Card className="bg-muted/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              Configuration Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Trigger Type:</span>
                <Badge variant="secondary">
                  {startingPoint.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              </div>
              
              {startingPoint === 'digital_employee' && selectedPlacements.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Placements:</span>
                  <span className="text-muted-foreground">{selectedPlacements.length} selected</span>
                </div>
              )}
              
              {startingPoint === 'askzia' && selectedAskziaOptions.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Askzia Options:</span>
                  <span className="text-muted-foreground">{selectedAskziaOptions.length} selected</span>
                </div>
              )}
              
              {startingPoint === 'keyword_based' && keywords.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Keywords:</span>
                  <span className="text-muted-foreground">{keywords.length} configured</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};