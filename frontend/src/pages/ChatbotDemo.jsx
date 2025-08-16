import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ArrowLeft, Send, Mic, Paperclip, Bot, User, Globe, MessageCircle } from "lucide-react";
import { mockChatMessages } from "../data/mock";

const ChatbotDemo = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(mockChatMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const messagesEndRef = useRef(null);

  const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: String(messages.length + 1),
      type: "user",
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: String(messages.length + 2),
        type: "bot",
        message: getBotResponse(inputMessage),
        timestamp: new Date().toISOString(),
        quickReplies: getQuickReplies(inputMessage)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    if (message.includes("emi") || message.includes("payment")) {
      return "Your current EMI is ₹5,500. Next due date is 15th January 2025. You can pay via UPI, net banking, or visit our nearest branch.";
    } else if (message.includes("statement") || message.includes("download")) {
      return "I've sent your loan statement to your registered email address. You can also download it from the mobile app.";
    } else if (message.includes("complaint") || message.includes("issue")) {
      return "I understand your concern. Let me create a complaint ticket for you. Your complaint ID is C003. Expected resolution time is 24 hours.";
    } else if (message.includes("loan") || message.includes("apply")) {
      return "Great! Based on your profile, you're eligible for a Personal Loan up to ₹5 lakhs at 10.5% interest rate. Shall I start the application process?";
    } else {
      return "I'm here to help! I can assist you with EMI inquiries, statement downloads, complaint registration, or new loan applications. What would you like to know?";
    }
  };

  const getQuickReplies = (userMessage) => {
    const message = userMessage.toLowerCase();
    if (message.includes("emi")) {
      return ["Pay Now", "Set Reminder", "Payment History"];
    } else if (message.includes("statement")) {
      return ["Download PDF", "Email Statement", "View Online"];
    } else if (message.includes("complaint")) {
      return ["Track Complaint", "Call Support", "Chat with Agent"];
    } else if (message.includes("loan")) {
      return ["Check Eligibility", "Apply Now", "Compare Rates"];
    } else {
      return ["Check EMI", "Get Statement", "Raise Complaint", "Apply New Loan"];
    }
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputMessage("What is my EMI amount?");
      }, 2000);
    }
  };

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
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-slate-800">Credit Genie</h1>
                  <p className="text-xs text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Online
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-slate-600" />
              <select 
                value={currentLanguage} 
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="text-sm border-none bg-transparent focus:outline-none text-slate-700"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Chat with Credit Genie
                  </span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    AI Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                      }`}>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-sm' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick Replies */}
                {messages.length > 0 && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].quickReplies && (
                  <div className="flex flex-wrap gap-2 ml-10">
                    {messages[messages.length - 1].quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs hover:bg-blue-50 hover:border-blue-200"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleVoice}
                    className={isListening ? 'bg-red-50 border-red-200 text-red-600' : ''}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {isListening && (
                  <p className="text-xs text-red-600 mt-2 animate-pulse">
                    🎤 Listening... Speak now
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Multilingual Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Voice Recognition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">File Upload</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Quick Actions</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Try Asking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "What is my EMI amount?",
                  "Send me my statement",
                  "I want to raise a complaint",
                  "Check loan eligibility",
                  "मेरी EMI कितनी है?", 
                  "Set payment reminder"
                ].map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => setInputMessage(suggestion)}
                    className="w-full justify-start text-left h-auto p-2 text-xs hover:bg-blue-50"
                  >
                    {suggestion}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDemo;