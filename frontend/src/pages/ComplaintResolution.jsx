import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { ArrowLeft, Clock, User, AlertCircle, CheckCircle, Shield, ExternalLink, MessageCircle, Phone } from "lucide-react";
import { mockComplaints } from "../data/mock";

const ComplaintResolution = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const complaint = mockComplaints.find(c => c.id === id) || mockComplaints[0];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <AlertCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const progressPercentage = (complaint.timeline.length / 4) * 100; // Assuming 4 steps max

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/agent')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Complaint Resolution</h1>
                <p className="text-sm text-slate-600">Blockchain-backed transparent complaint tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getPriorityColor(complaint.priority)}>
                {complaint.priority} Priority
              </Badge>
              <Badge className={getStatusColor(complaint.status)}>
                {getStatusIcon(complaint.status)}
                <span className="ml-1">{complaint.status}</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Complaint Overview */}
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-slate-800 mb-2">
                  {complaint.type}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Complaint ID: {complaint.id}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {complaint.customerName}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600 mb-1">Resolution Progress</div>
                <div className="text-2xl font-bold text-orange-600 mb-2">{Math.round(progressPercentage)}%</div>
                <Progress value={progressPercentage} className="w-32" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Complaint Details</h3>
                <p className="text-slate-700 mb-4">{complaint.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Customer ID:</span>
                    <span className="font-medium">{complaint.customerId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Expected Resolution:</span>
                    <span className="font-medium text-orange-600">
                      {new Date(complaint.expectedResolution).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Blockchain Verification</h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center mb-3">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-700">Verified on Blockchain</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-600">Block Hash:</span>
                      <div className="font-mono text-xs text-slate-800 break-all">
                        {complaint.blockchainHash}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View on Explorer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-600" />
                  Resolution Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complaint.timeline.map((event, index) => (
                    <div key={index} className="relative">
                      {/* Timeline line */}
                      {index < complaint.timeline.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-slate-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center flex-shrink-0">
                          {getStatusIcon(event.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-800">{event.status}</h4>
                            <span className="text-sm text-slate-600">
                              {new Date(event.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{event.note}</p>
                          
                          {/* Blockchain verification for each step */}
                          <div className="mt-2 p-2 bg-green-50 rounded border border-green-100">
                            <div className="flex items-center text-xs text-green-700">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified on blockchain at {new Date(event.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Next steps (if not resolved) */}
                  {complaint.status !== 'Resolved' && (
                    <div className="relative opacity-60">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-600">Resolution</h4>
                          <p className="text-sm text-slate-500">Expected by {new Date(complaint.expectedResolution).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{complaint.customerName}</div>
                    <div className="text-sm text-slate-600">Customer ID: {complaint.customerId}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resolution Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {complaint.status === 'In Progress' ? (
                  <>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Resolved
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Clock className="h-4 w-4 mr-2" />
                      Update Timeline
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Escalate
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <p className="text-sm text-green-700 font-medium">Complaint Resolved</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Resolution recorded on blockchain
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Blockchain Trust */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-600" />
                  Trust & Transparency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Blockchain Verified</span>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Yes
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Immutable Record</span>
                  <Badge className="bg-green-100 text-green-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Secured
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Audit Trail</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-blue-600">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-xs text-blue-700">
                    Every action is recorded on blockchain for complete transparency and customer trust
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintResolution;