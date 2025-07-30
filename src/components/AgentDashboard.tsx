import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { AgentInfo } from './agent/AgentInfo';
import { AgentSignals } from './agent/AgentSignals';
import { AgentStartingPoints } from './agent/AgentStartingPoints';
import { AgentAnalytics } from './agent/AgentAnalytics';
import { AgentDetailModal } from './agent/AgentDetailModal';

const AgentDashboard = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    info: true,
    signals: true,
    startingPoints: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving changes...');
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Cancelling changes...');
  };

  if (showAnalytics) {
    return <AgentAnalytics onBack={() => setShowAnalytics(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-professional/20">
      {/* Header */}
      <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Agent Customisation Dashboard</h1>
                <p className="text-sm text-muted-foreground">Configure and optimize your AI agent</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAnalytics(true)}
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Agent Info Section */}
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                01
              </Badge>
              <CardTitle className="text-xl">Agent Information</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('info')}
              className="h-8 w-8 p-0"
            >
              {expandedSections.info ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedSections.info && (
            <CardContent>
              <AgentInfo onDetailView={() => setShowDetailModal(true)} />
            </CardContent>
          )}
        </Card>

        {/* Agent Signals Section */}
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                02
              </Badge>
              <CardTitle className="text-xl">Agent Signals</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('signals')}
              className="h-8 w-8 p-0"
            >
              {expandedSections.signals ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedSections.signals && (
            <CardContent>
              <AgentSignals />
            </CardContent>
          )}
        </Card>

        {/* Agent Starting Points Section */}
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                03
              </Badge>
              <CardTitle className="text-xl">Agent Starting Points</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('startingPoints')}
              className="h-8 w-8 p-0"
            >
              {expandedSections.startingPoints ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedSections.startingPoints && (
            <CardContent>
              <AgentStartingPoints />
            </CardContent>
          )}
        </Card>
      </div>

      {/* Agent Detail Modal */}
      <AgentDetailModal 
        open={showDetailModal} 
        onOpenChange={setShowDetailModal}
      />
    </div>
  );
};

export default AgentDashboard;