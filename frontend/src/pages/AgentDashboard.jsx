import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search, User, Phone, MessageCircle, AlertCircle, TrendingUp, Clock, CheckCircle, Eye } from "lucide-react";
import { mockCustomers, mockComplaints } from "../data/mock";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const pendingComplaints = mockComplaints.filter(c => c.status !== 'Resolved');
  const highPriorityComplaints = mockComplaints.filter(c => c.priority === 'High');

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'text-green-600 bg-green-50';
      case 'Negative': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-orange-100 text-orange-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
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
                <h1 className="text-xl font-bold text-slate-800">Agent Dashboard</h1>
                <p className="text-sm text-slate-600">360-degree customer view and case management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Agent: Meera Sharma
              </Badge>
              <Badge className="bg-green-100 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{pendingComplaints.length}</div>
              <p className="text-sm text-slate-600">Active Cases</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{highPriorityComplaints.length}</div>
              <p className="text-sm text-slate-600">High Priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">94.2%</div>
              <p className="text-sm text-slate-600">Resolution Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">2.3m</div>
              <p className="text-sm text-slate-600">Avg Response</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Search & List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Customer Search
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by name or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                      selectedCustomer.id === customer.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">{customer.name}</h4>
                        <p className="text-sm text-slate-600">{customer.phone}</p>
                        <p className="text-xs text-slate-500">{customer.location}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`text-xs ${customer.riskScore > 750 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {customer.riskScore}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Priority Complaints */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Priority Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {highPriorityComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-3 border border-red-100 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                      <span className="text-xs text-slate-600">
                        {complaint.id}
                      </span>
                    </div>
                    <h4 className="font-medium text-slate-800 text-sm">{complaint.type}</h4>
                    <p className="text-xs text-slate-600 mt-1">{complaint.customerName}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 text-xs"
                      onClick={() => navigate(`/complaints/${complaint.id}`)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Customer 360 View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Customer 360 View
                  </span>
                  <Badge className="bg-blue-100 text-blue-700">
                    ID: {selectedCustomer.id}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="interactions">Interactions</TabsTrigger>
                    <TabsTrigger value="insights">AI Insights</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Customer Profile */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800">Personal Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Name:</span>
                            <span className="text-sm font-medium">{selectedCustomer.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Phone:</span>
                            <span className="text-sm font-medium">{selectedCustomer.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Location:</span>
                            <span className="text-sm font-medium">{selectedCustomer.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Language:</span>
                            <span className="text-sm font-medium">{selectedCustomer.language}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">KYC Status:</span>
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {selectedCustomer.kycStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800">Risk Assessment</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Credit Score</span>
                            <span className="text-lg font-bold text-green-600">{selectedCustomer.riskScore}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Churn Risk</span>
                            <Badge className="bg-green-100 text-green-700">
                              Low ({Math.round(selectedCustomer.churnProbability * 100)}%)
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Upsell Ready</span>
                            <Badge className="bg-blue-100 text-blue-700">
                              {selectedCustomer.upsellOpportunity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active Loans */}
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-4">Active Loans</h3>
                      <div className="grid gap-4">
                        {selectedCustomer.loans.map((loan) => (
                          <div key={loan.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-medium">{loan.type}</h4>
                                <p className="text-sm text-slate-600">Loan ID: {loan.id}</p>
                              </div>
                              <Badge className="bg-green-100 text-green-700">
                                {loan.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-slate-600">Amount</p>
                                <p className="font-medium">₹{loan.amount.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-slate-600">Outstanding</p>
                                <p className="font-medium text-orange-600">₹{loan.outstanding.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-slate-600">EMI</p>
                                <p className="font-medium text-blue-600">₹{loan.emi.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-slate-600">Next Due</p>
                                <p className="font-medium text-red-600">
                                  {new Date(loan.nextDueDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="interactions" className="space-y-4">
                    {selectedCustomer.interactions.map((interaction) => (
                      <div key={interaction.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center">
                              <MessageCircle className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <Badge variant="outline" className="text-xs">
                                {interaction.type}
                              </Badge>
                              <p className="text-xs text-slate-600 mt-1">
                                {new Date(interaction.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Badge className={getSentimentColor(interaction.sentiment)}>
                            {interaction.sentiment}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-slate-50 rounded p-3">
                            <p className="text-sm">{interaction.message}</p>
                          </div>
                          <div className="bg-blue-50 rounded p-3">
                            <p className="text-sm text-blue-700">{interaction.response}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="insights" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                            Engagement Score
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600 mb-2">High</div>
                          <p className="text-sm text-slate-600">Regular app usage, timely responses</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-blue-600" />
                            Response Pattern
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600 mb-2">Fast</div>
                          <p className="text-sm text-slate-600">Avg response time: 1.2 minutes</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">AI Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium text-green-700 text-sm">Cross-sell Opportunity</h4>
                          <p className="text-xs text-slate-600">Eligible for {selectedCustomer.upsellOpportunity}. High conversion probability.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-medium text-blue-700 text-sm">Engagement Strategy</h4>
                          <p className="text-xs text-slate-600">Prefers digital channels. Send personalized offers via app notifications.</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-medium text-purple-700 text-sm">Retention Focus</h4>
                          <p className="text-xs text-slate-600">High-value customer. Offer premium support and exclusive benefits.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="actions" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { title: "Call Customer", desc: "Initiate voice call", icon: Phone, color: "green" },
                        { title: "Send Message", desc: "WhatsApp or SMS", icon: MessageCircle, color: "blue" },
                        { title: "Create Case", desc: "Register new complaint", icon: AlertCircle, color: "orange" },
                        { title: "Offer Product", desc: "Send personalized offer", icon: TrendingUp, color: "purple" }
                      ].map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 justify-start hover:shadow-md transition-all"
                        >
                          <div className={`h-8 w-8 rounded bg-${action.color}-50 flex items-center justify-center mr-3`}>
                            <action.icon className={`h-4 w-4 text-${action.color}-600`} />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-sm">{action.title}</div>
                            <div className="text-xs text-slate-600">{action.desc}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;