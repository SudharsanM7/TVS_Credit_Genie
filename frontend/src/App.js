import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

// Pages
import LandingPage from "./pages/LandingPage";
import ChatbotDemo from "./pages/ChatbotDemo";
import CustomerDashboard from "./pages/CustomerDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ComplaintResolution from "./pages/ComplaintResolution";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chatbot" element={<ChatbotDemo />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/complaints/:id" element={<ComplaintResolution />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;