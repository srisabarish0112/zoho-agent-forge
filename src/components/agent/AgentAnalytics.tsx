import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Users, MessageSquare, Target, Clock, CheckCircle } from 'lucide-react';

interface AgentAnalyticsProps {
  onBack: () => void;
}

export const AgentAnalytics: React.FC<AgentAnalyticsProps> = ({ onBack }) => {
  const analyticsData = {
    totalInteractions: 1247,
    successfulConversions: 89,
    averageResponseTime: '2.3s',
    customerSatisfaction: 4.7,
    activeSignals: 23,
    weeklyGrowth: 12.5
  };

  const recentActivity = [
    { id: 1, action: 'Lead Qualified', time: '2 minutes ago', status: 'success' },
    { id: 2, action: 'Email Sent', time: '5 minutes ago', status: 'success' },
    { id: 3, action: 'Call Scheduled', time: '12 minutes ago', status: 'success' },
    { id: 4, action: 'Deal Created', time: '18 minutes ago', status: 'success' },
    { id: 5, action: 'Contact Updated', time: '25 minutes ago', status: 'success' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-professional/20">
      {/* Header */}
      <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Agent Analytics</h1>
              <p className="text-sm text-muted-foreground">Performance insights and metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalInteractions.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+{analyticsData.weeklyGrowth}%</span>
                <span>from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Conversions</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.successfulConversions}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Conversion rate:</span>
                <span className="text-green-600 font-medium">
                  {((analyticsData.successfulConversions / analyticsData.totalInteractions) * 100).toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.averageResponseTime}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Excellent</span>
                <span>response time</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.customerSatisfaction}/5.0</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Based on</span>
                <span className="font-medium">342 reviews</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Signals</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.activeSignals}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Across</span>
                <span className="font-medium">6 modules</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{analyticsData.weeklyGrowth}%</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Interactions</span>
                <span className="font-medium">trending up</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p className="text-lg font-medium">Performance Chart</p>
                <p className="text-sm">Detailed analytics visualization would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    Success
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};