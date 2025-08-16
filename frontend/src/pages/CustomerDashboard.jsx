import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { ArrowLeft, CreditCard, MessageCircle, Phone, Smartphone, Download, Calendar, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { mockCustomers } from "../data/mock";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [selectedCustomer] = useState(mockCustomers[0]); // Rajesh Kumar

  const channelIcons = {
    WhatsApp: MessageCircle,
    Voice: Phone,
    App: Smartphone,
    Portal: MessageCircle
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'Negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const loanProgress = (selectedCustomer.loans[0].amount - selectedCustomer.loans[0].outstanding) / selectedCustomer.loans[0].amount * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                <h1 className="text-xl font-bold text-slate-800">Customer Dashboard</h1>
                <p className="text-sm text-slate-600">Complete loan and interaction overview</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Active Customer
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Customer Header */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedCustomer.name}</h2>
                  <div className="space-y-1">
                    <p className="text-blue-100">📱 {selectedCustomer.phone}</p>
                    <p className="text-blue-100">🌍 {selectedCustomer.location} • {selectedCustomer.language}</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge className="bg-green-500 text-white border-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        KYC {selectedCustomer.kycStatus}
                      </Badge>
                      <Badge className="bg-blue-500 text-white border-blue-400">
                        Risk Score: {selectedCustomer.riskScore}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">₹{selectedCustomer.loans[0].outstanding.toLocaleString()}</div>
                  <p className="text-blue-100">Outstanding Amount</p>
                  <div className="mt-2">
                    <Progress value={loanProgress} className="w-32 h-2 bg-blue-400" />
                    <p className="text-xs text-blue-100 mt-1">{Math.round(loanProgress)}% Repaid</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="loans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border">
            <TabsTrigger value="loans" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Loan Details
            </TabsTrigger>
            <TabsTrigger value="interactions" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Interactions
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Quick Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="loans" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {selectedCustomer.loans.map((loan) => (
                <Card key={loan.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                        {loan.type}
                      </span>
                      <Badge className="bg-green-100 text-green-700">
                        {loan.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Loan Amount</p>
                        <p className="text-lg font-semibold">₹{loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Outstanding</p>
                        <p className="text-lg font-semibold text-orange-600">₹{loan.outstanding.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Monthly EMI</p>
                        <p className="text-lg font-semibold text-blue-600">₹{loan.emi.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Next Due</p>
                        <p className="text-lg font-semibold text-red-600">
                          {new Date(loan.nextDueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span>Repayment Progress</span>
                        <span>{Math.round(loanProgress)}%</span>
                      </div>
                      <Progress value={loanProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Interactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCustomer.interactions.map((interaction) => {
                  const IconComponent = channelIcons[interaction.type] || MessageCircle;
                  return (
                    <div key={interaction.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {interaction.type}
                            </Badge>
                            <p className="text-sm text-slate-600 mt-1">
                              {new Date(interaction.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge className={getSentimentColor(interaction.sentiment)}>
                          {interaction.sentiment}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-slate-800">Customer:</p>
                          <p className="text-sm text-slate-600">{interaction.message}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-blue-800">Credit Genie:</p>
                          <p className="text-sm text-blue-600">{interaction.response}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{selectedCustomer.riskScore}</div>
                    <p className="text-sm text-slate-600">Credit Score</p>
                    <Badge className="mt-2 bg-green-100 text-green-700">
                      Low Risk
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                    Churn Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {Math.round(selectedCustomer.churnProbability * 100)}%
                    </div>
                    <p className="text-sm text-slate-600">Churn Probability</p>
                    <Badge className="mt-2 bg-orange-100 text-orange-700">
                      Low Risk
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Upsell Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 mb-2">
                      {selectedCustomer.upsellOpportunity}
                    </div>
                    <p className="text-sm text-slate-600">Recommended Product</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-700">
                      Ready to Offer
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-700">Positive Engagement</h4>
                  <p className="text-sm text-slate-600">Customer shows high engagement with digital channels. Consider offering digital-first products.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-700">Cross-sell Opportunity</h4>
                  <p className="text-sm text-slate-600">Eligible for Personal Loan up to ₹3L at competitive rates. High approval probability.</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium text-orange-700">Payment Behavior</h4>
                  <p className="text-sm text-slate-600">Consistent payment history. Consider loyalty rewards or premium benefits.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Download Statement", desc: "Get latest loan statement", icon: Download, color: "blue" },
                { title: "Set Payment Reminder", desc: "EMI reminder notifications", icon: Calendar, color: "green" },
                { title: "Chat with Genie", desc: "Get instant assistance", icon: MessageCircle, color: "purple" },
                { title: "Make Payment", desc: "Pay EMI or part payment", icon: CreditCard, color: "orange" },
                { title: "Update KYC", desc: "Update personal details", icon: CheckCircle, color: "indigo" },
                { title: "Raise Complaint", desc: "Register service complaint", icon: AlertCircle, color: "red" }
              ].map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center mx-auto mb-4 bg-${action.color}-50 group-hover:bg-${action.color}-100 transition-colors`}>
                      <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{action.title}</h3>
                    <p className="text-sm text-slate-600">{action.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;