import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowRight, Bot, Users, BarChart3, Shield, Globe, Zap } from "lucide-react";
import { mockFeatures, mockAnalytics } from "../data/mock";

const LandingPage = () => {
  const navigate = useNavigate();

  const demoSections = [
    {
      title: "Chatbot Interface",
      description: "Experience our multilingual AI assistant",
      path: "/chatbot",
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Customer Dashboard", 
      description: "Complete loan and interaction overview",
      path: "/customer",
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      title: "Agent Dashboard",
      description: "360-degree customer view for agents",
      path: "/agent", 
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time insights and performance metrics",
      path: "/analytics",
      color: "bg-orange-50 text-orange-700 border-orange-200"
    }
  ];

  const getIcon = (iconName) => {
    const icons = {
      MessageCircle: Bot,
      Zap: Zap,
      BarChart3: BarChart3,
      Shield: Shield,
      Globe: Globe,
      TrendingUp: BarChart3
    };
    const IconComponent = icons[iconName] || Bot;
    return <IconComponent className="h-8 w-8" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">TVS Credit Genie</h1>
                <p className="text-sm text-slate-600">AI Financial Companion</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Prototype Demo
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200">
            Autonomous • Intelligent • Trustworthy
          </Badge>
          <h1 className="text-5xl font-bold text-slate-800 mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Financial Services</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience TVS Credit Genie - an AI-powered financial companion that provides 24x7 multilingual support, 
            autonomous workflows, and blockchain-backed transparency for seamless customer service.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{mockAnalytics.totalCustomers.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Active Customers</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-green-600">{mockAnalytics.resolutionRate}%</div>
              <div className="text-sm text-slate-600">Resolution Rate</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-purple-600">{mockAnalytics.avgResponseTime}</div>
              <div className="text-sm text-slate-600">Avg Response</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">{mockAnalytics.customerSatisfaction}/5</div>
              <div className="text-sm text-slate-600">Satisfaction</div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg"
            onClick={() => navigate('/chatbot')}
          >
            Try the Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Core Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive AI-driven solutions for modern financial services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-slate-200">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-blue-600">
                      {getIcon(feature.icon)}
                    </div>
                  </div>
                  <CardTitle className="text-slate-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Interactive Demo</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore different aspects of the TVS Credit Genie platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {demoSections.map((section, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 group border-slate-200"
                onClick={() => navigate(section.path)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-800 group-hover:text-blue-600 transition-colors">
                        {section.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 mt-2">
                        {section.description}
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className={section.color}>
                    Live Demo
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">TVS Credit Genie</span>
          </div>
          <p className="text-slate-400 mb-4">
            Autonomous, Intelligent, and Trustworthy Financial Companion
          </p>
          <p className="text-sm text-slate-500">
            This is a prototype demonstration. All data shown is mock data for demo purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;