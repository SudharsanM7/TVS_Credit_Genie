// Mock data for TVS Credit Genie prototype

export const mockCustomers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    language: "Hindi",
    location: "Delhi",
    kycStatus: "Verified",
    loans: [
      {
        id: "L001",
        type: "Two Wheeler Loan",
        amount: 150000,
        outstanding: 75000,
        emi: 5500,
        nextDueDate: "2025-01-15",
        status: "Active"
      }
    ],
    interactions: [
      {
        id: "I001",
        type: "WhatsApp",
        message: "What is my EMI amount?",
        response: "Your EMI amount is ₹5,500. Next due date is 15th January 2025.",
        timestamp: "2025-01-10T10:30:00Z",
        sentiment: "Neutral"
      },
      {
        id: "I002",
        type: "Voice",
        message: "मुझे अपना statement चाहिए",
        response: "आपका statement email पर भेज दिया गया है।",
        timestamp: "2025-01-08T14:20:00Z",
        sentiment: "Positive"
      }
    ],
    riskScore: 720,
    churnProbability: 0.15,
    upsellOpportunity: "Personal Loan"
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    language: "English",
    location: "Mumbai",
    kycStatus: "Pending",
    loans: [
      {
        id: "L002",
        type: "Personal Loan",
        amount: 300000,
        outstanding: 180000,
        emi: 12000,
        nextDueDate: "2025-01-20",
        status: "Active"
      }
    ],
    interactions: [
      {
        id: "I003",
        type: "App",
        message: "I want to make early payment",
        response: "Great! You can save ₹15,000 in interest with early closure.",
        timestamp: "2025-01-09T16:45:00Z",
        sentiment: "Positive"
      }
    ],
    riskScore: 785,
    churnProbability: 0.08,
    upsellOpportunity: "Gold Loan"
  }
];

export const mockComplaints = [
  {
    id: "C001",
    customerId: "1",
    customerName: "Rajesh Kumar",
    type: "EMI Deduction Issue",
    description: "EMI was deducted twice from my account",
    status: "In Progress",
    priority: "High",
    createdAt: "2025-01-08T09:00:00Z",
    expectedResolution: "2025-01-11T18:00:00Z",
    blockchainHash: "0x1a2b3c4d5e6f...",
    timeline: [
      {
        status: "Created",
        timestamp: "2025-01-08T09:00:00Z",
        note: "Complaint registered via WhatsApp"
      },
      {
        status: "Assigned",
        timestamp: "2025-01-08T09:15:00Z",
        note: "Assigned to Agent Meera"
      },
      {
        status: "In Progress",
        timestamp: "2025-01-08T10:30:00Z",
        note: "Investigating with bank records"
      }
    ]
  },
  {
    id: "C002",
    customerId: "2",
    customerName: "Priya Sharma",
    type: "KYC Update",
    description: "Unable to upload Aadhaar document",
    status: "Resolved",
    priority: "Medium",
    createdAt: "2025-01-07T11:00:00Z",
    expectedResolution: "2025-01-09T18:00:00Z",
    blockchainHash: "0x2b3c4d5e6f7a...",
    timeline: [
      {
        status: "Created",
        timestamp: "2025-01-07T11:00:00Z",
        note: "Issue reported via mobile app"
      },
      {
        status: "Resolved",
        timestamp: "2025-01-07T15:30:00Z",
        note: "Technical issue fixed, KYC completed"
      }
    ]
  }
];

export const mockAnalytics = {
  totalCustomers: 125000,
  activeLoans: 98500,
  totalInteractions: 15420,
  resolutionRate: 94.2,
  avgResponseTime: "2.3 minutes",
  customerSatisfaction: 4.6,
  sentimentDistribution: {
    positive: 68,
    neutral: 24,
    negative: 8
  },
  channelUsage: {
    whatsapp: 45,
    mobileApp: 30,
    voice: 15,
    portal: 10
  },
  topQueries: [
    { query: "EMI amount inquiry", count: 3240 },
    { query: "Statement request", count: 2890 },
    { query: "Loan status check", count: 2150 },
    { query: "Payment options", count: 1980 },
    { query: "KYC update", count: 1560 }
  ]
};

export const mockChatMessages = [
  {
    id: "1",
    type: "bot",
    message: "Hello! I'm your TVS Credit Genie. How can I help you today?",
    timestamp: "2025-01-10T10:00:00Z",
    quickReplies: ["Check EMI", "Get Statement", "Raise Complaint", "Apply New Loan"]
  },
  {
    id: "2",
    type: "user", 
    message: "What is my current EMI amount?",
    timestamp: "2025-01-10T10:01:00Z"
  },
  {
    id: "3",
    type: "bot",
    message: "Your current EMI amount is ₹5,500 for your Two Wheeler Loan. Your next due date is 15th January 2025. Would you like me to send you a payment reminder?",
    timestamp: "2025-01-10T10:01:30Z",
    quickReplies: ["Yes, remind me", "Show payment options", "Download statement"]
  }
];

export const mockFeatures = [
  {
    icon: "MessageCircle",
    title: "Conversational AI",
    description: "24x7 multilingual support across WhatsApp, voice, SMS and mobile app"
  },
  {
    icon: "Zap",
    title: "Autonomous Workflows",
    description: "Self-service automation for EMI queries, payments, and loan applications"
  },
  {
    icon: "BarChart3",
    title: "Predictive Intelligence",
    description: "AI-driven insights for personalized financial recommendations"
  },
  {
    icon: "Shield",
    title: "Blockchain Trust",
    description: "Transparent, immutable records for all transactions and complaints"
  },
  {
    icon: "Globe",
    title: "Open API Ecosystem",
    description: "Seamless integrations with banks, fintechs, and third-party services"
  },
  {
    icon: "TrendingUp",
    title: "Real-time Analytics",
    description: "Continuous learning from customer feedback and interactions"
  }
];