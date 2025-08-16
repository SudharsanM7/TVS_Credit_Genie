import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Bot, Users, BarChart3, UserCheck, MessageCircle, Eye, TrendingUp, Shield } from "lucide-react";

const InteractiveDemo = () => {
  const navigate = useNavigate();

  const demoOptions = [
    {
      id: "chatbot",
      title: "Chatbot Interface",
      description: "Experience our multilingual AI assistant with voice recognition and smart responses",
      icon: MessageCircle,
      path: "/chatbot",
      color: "from-green-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-green-50 to-blue-50",
      features: ["Multilingual Support", "Voice Recognition", "Quick Actions", "Smart Responses"]
    },
    {
      id: "customer",
      title: "Customer Dashboard", 
      description: "Complete loan overview, interaction history, and AI-powered insights",
      icon: Users,
      path: "/customer",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      features: ["Loan Details", "Payment History", "AI Insights", "Quick Actions"]
    },
    {
      id: "agent",
      title: "Agent Dashboard",
      description: "360-degree customer view with case management and AI recommendations",
      icon: UserCheck,
      path: "/agent", 
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      features: ["Customer 360 View", "Case Management", "AI Recommendations", "Priority Queue"]
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      description: "Real-time performance metrics, sentiment analysis, and business insights",
      icon: BarChart3,
      path: "/analytics",
      color: "from-orange-500 to-red-500", 
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      features: ["Real-time Metrics", "Sentiment Analysis", "Performance Trends", "Channel Analytics"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
                Back to Home
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Interactive Demo</h1>
                <p className="text-sm text-slate-600">Explore all features of TVS Credit Genie</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                Live Demo Environment
              </Badge>
              <div className="text-xs text-slate-600">
                Made by <span className="font-semibold text-indigo-600">Sudharsan M</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">TVS Credit Genie</h1>
              <p className="text-lg text-indigo-600 font-medium">Interactive Demo Experience</p>
            </div>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore the complete ecosystem of our AI-powered financial companion. Experience each component 
            to understand how we're revolutionizing customer service in financial services.
          </p>
        </div>

        {/* Demo Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {demoOptions.map((demo, index) => (
            <Card 
              key={demo.id} 
              className={`group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 ${demo.bgColor} transform hover:-translate-y-2`}
              onClick={() => navigate(demo.path)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${demo.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <demo.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-right">
                    <Badge className="bg-white/80 text-slate-700 border border-slate-200">
                      Demo {index + 1}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl text-slate-800 group-hover:text-indigo-700 transition-colors">
                  {demo.title}
                </CardTitle>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  {demo.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  {demo.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Button 
                    className={`bg-gradient-to-r ${demo.color} hover:shadow-lg transform group-hover:scale-105 transition-all duration-300 text-white border-0`}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Launch Demo
                  </Button>
                  <div className="text-xs text-slate-500">
                    Interactive Experience
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Overview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">What You'll Experience</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each demo showcases different aspects of our AI-powered financial ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow border-slate-200">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-3">AI-Powered Interactions</h3>
                <p className="text-sm text-slate-600">
                  Experience natural language processing, multilingual support, and intelligent response generation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-slate-200">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-3">Real-time Analytics</h3>
                <p className="text-sm text-slate-600">
                  Explore comprehensive dashboards with live metrics, sentiment analysis, and performance insights
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-slate-200">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-3">Blockchain Trust</h3>
                <p className="text-sm text-slate-600">
                  See how blockchain technology ensures transparency and trust in every customer interaction
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Explore?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Choose any demo above to experience the future of financial services. Each demo is fully interactive 
            with realistic data and workflows.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-green-100 text-green-700 px-4 py-2">
              ✓ Fully Interactive
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
              ✓ Real-time Responses  
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 px-4 py-2">
              ✓ Complete Workflows
            </Badge>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-slate-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">TVS Credit Genie</span>
          </div>
          <p className="text-slate-400 mb-2">
            Autonomous, Intelligent, and Trustworthy Financial Companion
          </p>
          <p className="text-sm text-slate-500">
            Prototype demonstration • Made with ❤️ by <span className="text-indigo-400 font-semibold">Sudharsan M</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InteractiveDemo;