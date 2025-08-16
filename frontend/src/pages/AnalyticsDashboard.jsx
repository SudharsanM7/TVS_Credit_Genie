import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { ArrowLeft, BarChart3, TrendingUp, Users, MessageCircle, Clock, Star, AlertCircle, Eye, Filter } from "lucide-react";
import { mockAnalytics } from "../data/mock";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7d");

  const timeRanges = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" }
  ];

  const sentimentColors = {
    positive: "bg-green-500",
    neutral: "bg-blue-500", 
    negative: "bg-red-500"
  };

  const channelColors = {
    whatsapp: "bg-green-600",
    mobileApp: "bg-blue-600",
    voice: "bg-purple-600",
    portal: "bg-orange-600"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Analytics Dashboard</h1>
                <p className="text-sm text-slate-600">Real-time insights and performance metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-600" />
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border rounded px-3 py-1 bg-white"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {mockAnalytics.totalCustomers.toLocaleString()}
              </div>
              <p className="text-sm text-slate-600">Total Customers</p>
              <Badge className="mt-2 bg-blue-100 text-blue-700 text-xs">
                +5.2% this week
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {mockAnalytics.activeLoans.toLocaleString()}
              </div>
              <p className="text-sm text-slate-600">Active Loans</p>
              <Badge className="mt-2 bg-green-100 text-green-700 text-xs">
                +2.8% this week
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {mockAnalytics.totalInteractions.toLocaleString()}
              </div>
              <p className="text-sm text-slate-600">Interactions</p>
              <Badge className="mt-2 bg-purple-100 text-purple-700 text-xs">
                +12.4% this week
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {mockAnalytics.resolutionRate}%
              </div>
              <p className="text-sm text-slate-600">Resolution Rate</p>
              <Badge className="mt-2 bg-orange-100 text-orange-700 text-xs">
                +1.2% this week
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {mockAnalytics.avgResponseTime}
              </div>
              <p className="text-sm text-slate-600">Avg Response</p>
              <Badge className="mt-2 bg-indigo-100 text-indigo-700 text-xs">
                -15s this week
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {mockAnalytics.customerSatisfaction}/5
              </div>
              <p className="text-sm text-slate-600">Satisfaction</p>
              <Badge className="mt-2 bg-yellow-100 text-yellow-700 text-xs">
                +0.1 this week
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              Channels
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              Sentiment
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Queries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Top Customer Queries
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalytics.topQueries.map((query, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-800">{query.query}</span>
                        <span className="text-sm text-slate-600">{query.count.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(query.count / mockAnalytics.topQueries[0].count) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Real-time Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-green-600" />
                      Real-time Activity
                    </span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-green-600">Live</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { time: "2 min ago", action: "New loan application", user: "Arjun K.", type: "success" },
                    { time: "5 min ago", action: "EMI payment completed", user: "Priya S.", type: "success" },
                    { time: "8 min ago", action: "Complaint raised", user: "Rajesh M.", type: "warning" },
                    { time: "12 min ago", action: "KYC document uploaded", user: "Meera R.", type: "info" },
                    { time: "15 min ago", action: "Statement downloaded", user: "Vikram T.", type: "info" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                        <p className="text-xs text-slate-600">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Performance Trends (Last {timeRanges.find(r => r.value === timeRange)?.label})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">+18%</div>
                    <p className="text-sm text-slate-600">Query Resolution</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">+12%</div>
                    <p className="text-sm text-slate-600">Customer Engagement</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">-8%</div>
                    <p className="text-sm text-slate-600">Response Time</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">+5%</div>
                    <p className="text-sm text-slate-600">Satisfaction Score</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="channels" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Channel Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Usage Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(mockAnalytics.channelUsage).map(([channel, percentage]) => (
                    <div key={channel} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${channelColors[channel]}`}></div>
                          <span className="text-sm font-medium capitalize">{channel.replace(/([A-Z])/g, ' $1')}</span>
                        </div>
                        <span className="text-sm text-slate-600">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Channel Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { channel: "WhatsApp", satisfaction: 4.8, resolution: 96, avgTime: "1.8m" },
                      { channel: "Mobile App", satisfaction: 4.6, resolution: 94, avgTime: "2.1m" },
                      { channel: "Voice", satisfaction: 4.4, resolution: 91, avgTime: "3.2m" },
                      { channel: "Portal", satisfaction: 4.2, resolution: 88, avgTime: "4.1m" }
                    ].map((perf, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{perf.channel}</h4>
                          <Badge className="bg-blue-100 text-blue-700">
                            {perf.satisfaction}/5 ⭐
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Resolution Rate</p>
                            <p className="font-medium text-green-600">{perf.resolution}%</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Avg Response</p>
                            <p className="font-medium text-blue-600">{perf.avgTime}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sentiment Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(mockAnalytics.sentimentDistribution).map(([sentiment, percentage]) => (
                    <div key={sentiment} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${sentimentColors[sentiment]}`}></div>
                          <span className="text-sm font-medium capitalize">{sentiment}</span>
                        </div>
                        <span className="text-sm text-slate-600">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Sentiment Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-700">Positive Feedback</h4>
                    <p className="text-sm text-slate-600">Quick response times and helpful AI assistant are most appreciated</p>
                    <Badge className="mt-2 bg-green-100 text-green-700 text-xs">
                      +5% from last week
                    </Badge>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-blue-700">Neutral Interactions</h4>
                    <p className="text-sm text-slate-600">Mostly routine queries about EMI and statements</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-700 text-xs">
                      Stable trend
                    </Badge>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium text-red-700">Areas for Improvement</h4>
                    <p className="text-sm text-slate-600">Complex loan queries need better handling</p>
                    <Badge className="mt-2 bg-red-100 text-red-700 text-xs">
                      -2% from last week
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* SLA Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">SLA Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <Badge className="bg-green-100 text-green-700">
                      98.5%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resolution Time</span>
                    <Badge className="bg-green-100 text-green-700">
                      94.2%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Escalation Rate</span>
                    <Badge className="bg-orange-100 text-orange-700">
                      5.8%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* AI Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Assistant Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auto-Resolution</span>
                    <Badge className="bg-blue-100 text-blue-700">
                      87.3%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accuracy Rate</span>
                    <Badge className="bg-green-100 text-green-700">
                      95.1%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Learning Rate</span>
                    <Badge className="bg-purple-100 text-purple-700">
                      +12%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Operational Efficiency */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Efficiency Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cost per Query</span>
                    <Badge className="bg-green-100 text-green-700">
                      -18%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Agent Productivity</span>
                    <Badge className="bg-blue-100 text-blue-700">
                      +25%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ROI Improvement</span>
                    <Badge className="bg-green-100 text-green-700">
                      +34%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Top Performers</h4>
                    {[
                      { metric: "Fastest Resolution", value: "WhatsApp Channel", improvement: "+15%" },
                      { metric: "Highest Satisfaction", value: "AI Voice Assistant", improvement: "+22%" },
                      { metric: "Best Accuracy", value: "Loan Query Handling", improvement: "+8%" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.metric}</p>
                          <p className="text-xs text-slate-600">{item.value}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          {item.improvement}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Improvement Areas</h4>
                    {[
                      { metric: "Complex Query Handling", target: "85%", current: "78%" },
                      { metric: "Multi-language Support", target: "95%", current: "89%" },
                      { metric: "Integration Response", target: "2s", current: "3.2s" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-slate-800">{item.metric}</p>
                          <span className="text-xs text-slate-600">{item.current} / {item.target}</span>
                        </div>
                        <Progress 
                          value={(parseFloat(item.current) / parseFloat(item.target)) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;