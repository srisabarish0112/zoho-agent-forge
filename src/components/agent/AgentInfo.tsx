import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Eye, Bot, Calendar, Activity } from 'lucide-react';

interface AgentInfoProps {
  onDetailView: () => void;
}

export const AgentInfo: React.FC<AgentInfoProps> = ({ onDetailView }) => {
  const agentData = {
    name: "Sales Assistant Agent",
    description: "Specialized AI agent for lead qualification and customer engagement within Zoho CRM. Handles initial customer inquiries, qualifies leads, and schedules follow-up activities.",
    model: "GPT-4o Mini",
    role: "Lead Qualification Specialist",
    status: "Active",
    created: "2024-01-15",
    lastUpdated: "2024-01-28"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        {/* Agent Avatar & Basic Info */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
              <Bot className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-3 flex-1">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-foreground">{agentData.name}</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  <Activity className="h-3 w-3 mr-1" />
                  {agentData.status}
                </Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {agentData.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 bg-blue-100 text-blue-600 rounded">
                  <Bot className="h-3 w-3" />
                </div>
                <div>
                  <span className="text-muted-foreground">Model:</span>
                  <span className="font-medium ml-1">{agentData.model}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 bg-purple-100 text-purple-600 rounded">
                  <Activity className="h-3 w-3" />
                </div>
                <div>
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium ml-1">{agentData.role}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 bg-green-100 text-green-600 rounded">
                  <Calendar className="h-3 w-3" />
                </div>
                <div>
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="font-medium ml-1">{agentData.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail View Button */}
        <Button 
          variant="outline" 
          onClick={onDetailView}
          className="gap-2 shrink-0"
        >
          <Eye className="h-4 w-4" />
          Detail View
        </Button>
      </div>
    </div>
  );
};